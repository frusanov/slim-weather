import { html } from "hono/html";

declare module "@/types/client" {
  interface Systems {
    loading: {
      setState: (state: boolean) => void;
      withLoading: <T extends Promise<unknown> = Promise<unknown>>(cb: T) => T;
    };
  }
}

export const FetchAndAppend = () => html`
  <script type="text/javascript">
    {
      let d = [];

      if (!window.systems) window.systems = {};

      window.systems.loading = {
        setState(value) {
          const $weatherWidget = document.querySelector(
            '[data-slot="weather-widget"]',
          );

          console.log({ $weatherWidget });

          if (!$weatherWidget) {
            console.error("Weather widget not found");
            return;
          }

          if (value) {
            $weatherWidget.classList.add("disabled");
          } else {
            $weatherWidget.classList.remove("disabled");
          }
        },
        withLoading: async (promise) => {
          try {
            let timeout = null;

            timeout = setTimeout(() => {
              window.systems.loading.setState(true);
            }, 50);

            return await promise.then((r) => {
              clearTimeout(timeout);
              return r;
            });
          } finally {
            window.systems.loading.setState(false);
          }
        },
      };

      window.loadSystem = async (path) => {
        if (d.includes(path)) return;

        d.push(path);

        const s = document.createElement("script");
        s.type = "module";
        s.src = "/systems/" + path + ".js";
        document.head.appendChild(s);

        await window.systems.loading.withLoading(
          new Promise((resolve) => {
            s.onload = resolve;
          }).catch((error) => {
            console.error(error);
            d = d.filter((item) => item !== path);
            throw error;
          }),
        );
      };
    }
  </script>
`;
