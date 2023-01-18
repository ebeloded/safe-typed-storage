import adapter from "@sveltejs/adapter-auto";
import mm from "micromatch";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
  },
  package: {
    files: mm.matcher("!**/*.test.ts"),
  },
};

export default config;
