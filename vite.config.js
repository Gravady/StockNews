import { defineConfig} from "vite";
import { resolve } from "path";

export default defineConfig({
    base: "index.html",
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html")
            },
        },
    },
});