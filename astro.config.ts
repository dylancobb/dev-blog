import { defineConfig } from "astro/config";

import expressiveCode from "astro-expressive-code";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import spectre from "./package/src";

const config = defineConfig({
    site: "http://dylancobb.dev",
    output: "static",
    integrations: [
        expressiveCode({
            themes: ["catppuccin-macchiato"],
        }),
        mdx(),
        sitemap(),
        spectre({
            name: "Dylan Cobb",
            openGraph: {
                home: {
                    title: "Dylan Cobb",
                    description: "London-based software developer and musician",
                },
                blog: {
                    title: "Blog",
                    description: "Thinking out loud about code and music.",
                },
                projects: {
                    title: "Projects",
                },
            },
        }),
    ],
});

export default config;
