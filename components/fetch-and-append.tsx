import { html } from "hono/html";

export const FetchAndAppend = () => html`
  <script type="text/javascript">
    {
      let d = [];

      if (!window.systems) window.systems = {};

      window.loadSystem = async (path) => {
        if (d.includes(path)) return;

        d.push(path);

        const s = document.createElement("script");

        s.src = "/systems/" + path + ".js";
        document.head.appendChild(s);

        await new Promise((resolve) => {
          s.onload = resolve;
        }).catch((error) => {
          console.error(error);
          d = d.filter((item) => item !== path);
          throw error;
        });
      };
    }
  </script>
`;
