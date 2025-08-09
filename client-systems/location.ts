import { registerSystem } from "./_shared";

declare module "@/types/client" {
  interface Systems {
    location?: {
      test: () => void;
    };
  }
}

registerSystem("location", {
  test: () => {
    console.log("Test function called! 123");
  },
});
