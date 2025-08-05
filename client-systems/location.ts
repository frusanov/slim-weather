declare module "@/types/client" {
  interface Systems {
    location?: {
      test: () => void;
    };
  }
}

window.systems.location = {
  test: () => {
    console.log("Test function called! 123");
  },
};
