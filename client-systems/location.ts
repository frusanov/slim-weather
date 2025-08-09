import { registerSystem } from "./_shared";

declare module "@/types/client" {
  interface Systems {
    location?: {
      $el: HTMLElement | null;
      test: () => void;
      open: () => Promise<void>;
      init: () => Promise<void>;
    };
  }
}

registerSystem("location", {
  $el: null,
  test: () => {
    console.log("Test function called! 123");

    window.systems.location!.init();
  },
  handleInput: ($input: HTMLInputElement) => {
    console.log("ctx", $input.value);
  },
  open: async () => {
    await window.systems.location!.init();
    document.body.appendChild(window.systems.location!.$el!);
  },
  close: async () => {
    if (!window.systems.location!.$el) return;
    document.body.removeChild(window.systems.location!.$el!);
  },
  init: async () => {
    if (window.systems.location!.$el) return;

    const locationHTML = await fetch(`/_html/location`).then((r) => r.text());

    const $container = document.createElement("div");

    $container.innerHTML = locationHTML;

    const $style = $container.querySelector("style");
    const $el = $container.querySelector("div");

    if ($style) {
      document.body.appendChild($style);
    }

    window.systems.location!.$el = $el;
  },
});
