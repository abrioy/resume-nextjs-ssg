import remarkGfm from "remark-gfm";
import mdx from '@next/mdx';
import path from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const withMDX = mdx({
    extension: /\.mdx?$/,
    options: {
        // If you use remark-gfm, you'll need to use next.config.mjs
        // as the package is ESM only
        // https://github.com/remarkjs/remark-gfm#install
        remarkPlugins: [remarkGfm],
        rehypePlugins: [],
        providerImportSource: '@mdx-js/react',
    },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',

    pageExtensions: ['tsx', 'mdx'],

    reactStrictMode: true,

    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },

    basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',

    images: {
        unoptimized: true,
    },

    webpack: (config) => {
        config.resolve.fallback = {
            fs: false,
            child_process: false,
        };

        return config;
    },
};

export default withMDX(nextConfig);
