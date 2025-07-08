import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import path, { resolve } from 'node:path';
import { defineConfig, mergeConfig } from 'vite';
import collectModuleAssetsPaths from './vite-module-loader.js';



async function getConfig() {
    const aliases = {
        '@authentication': resolve(__dirname, 'modules/Authentication/resources/js'),
        '@account': resolve(__dirname, 'modules/Account/resources/js'),
    };

    const paths = [
        'resources/css/app.css', 'resources/js/app.tsx'
    ];

    const allPaths = await collectModuleAssetsPaths(paths, 'modules');


    const rootConfig = defineConfig({
        plugins: [
            laravel({
                input: allPaths,
                ssr: 'resources/js/ssr.tsx',
                refresh: true,
            }),
            react(),
            tailwindcss(),
        ],
        esbuild: {
            jsx: 'automatic',
        },
        resolve: {
            alias: {
                'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
                ...aliases,
            },
        },
    })

    return rootConfig;
}

export default getConfig();
