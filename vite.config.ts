import react from '@vitejs/plugin-react'

import path from 'node:path';
import {createRequire} from 'node:module';

import {defineConfig, normalizePath} from 'vite';
import {viteStaticCopy} from 'vite-plugin-static-copy';

const require = createRequire(import.meta.url);

const pdfjsDistPath = path.dirname(require.resolve('pdfjs-dist/package.json'));
const cMapsDir = normalizePath(path.join(pdfjsDistPath, 'cmaps'));

export default defineConfig({
    build: {
        outDir: '/Users/wurengui/Code/code-self/caj2pdf/front'
    },
    plugins: [react(),
        viteStaticCopy({
            targets: [
                {
                    src: cMapsDir,
                    dest: '',
                },
            ],
        }),
    ]
});
