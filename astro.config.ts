// import { loadEnv } from "vite";
import { defineConfig } from "astro/config";

import expressiveCode from "astro-expressive-code";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import spectre from "./package/src";

import node from "@astrojs/node";

// const {
//     GISCUS_REPO,
//     GISCUS_REPO_ID,
//     GISCUS_CATEGORY,
//     GISCUS_CATEGORY_ID,
//     GISCUS_MAPPING,
//     GISCUS_STRICT,
//     GISCUS_REACTIONS_ENABLED,
//     GISCUS_EMIT_METADATA,
//     GISCUS_LANG,
// } = loadEnv(process.env.NODE_ENV!, process.cwd(), "");

// https://astro.build/config
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
            // giscus: {
            //     repository: GISCUS_REPO,
            //     repositoryId: GISCUS_REPO_ID,
            //     category: GISCUS_CATEGORY,
            //     categoryId: GISCUS_CATEGORY_ID,
            //     mapping: GISCUS_MAPPING as any,
            //     strict: GISCUS_STRICT === "true",
            //     reactionsEnabled: GISCUS_REACTIONS_ENABLED === "true",
            //     emitMetadata: GISCUS_EMIT_METADATA === "true",
            //     lang: GISCUS_LANG,
            // },
        }),
    ],
    // adapter: node({
    //     mode: "standalone",
    // }),
});

export default config;
