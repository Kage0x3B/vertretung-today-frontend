import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import {terser} from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';

import autoPreprocess from 'svelte-preprocess';
import postcss from 'rollup-plugin-postcss';
import {injectManifest} from 'rollup-plugin-workbox';

import workboxConfig from "./workbox-config";

const warnFilter = /has been rewritten/;

const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'src/main.js',
    output: {
        sourcemap: true,
        format: 'iife',
        name: 'app',
        file: 'public/build/bundle.js'
    },
    plugins: [
        json(),
        svelte({
            // enable run-time checks when not in production
            dev: !production,
            // we'll extract any component CSS out into
            // a separate file — better for performance
            css: css => {
                css.write('public/build/bundle.css');
            },
            emitCss: true,
            preprocess: autoPreprocess({
                postcss: {
                    plugins: [require('autoprefixer')()],
                },
            })
        }),

        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration —
        // consult the documentation for details:
        // https://github.com/rollup/rollup-plugin-commonjs
        resolve({
            browser: true,
            dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
        }),
        commonjs(),
        postcss({
            extract: true,
            minimize: true,
            use: [
                ['sass', {
                    includePaths: [
                        './theme',
                        './node_modules'
                    ]
                }]
            ]
        }),
        production && injectManifest(workboxConfig),

        // In dev mode, call `npm run start` once
        // the bundle has been generated
        !production && serve(),

        // Watch the `public` directory and refresh the
        // browser on changes when not in production
        !production && livereload('public'),

        // If we're building for production (npm run build
        // instead of npm run dev), minify
        production && terser()
    ],
    watch: {
        clearScreen: false
    },
    onwarn: warning => {
        const str = warning.toString();

        if (warnFilter.test(str)) return;

        console.warn(warning);
    }
};

function serve() {
    let started = false;

    return {
        writeBundle() {
            if (!started) {
                started = true;

                require('child_process').spawn('npm', ['run', 'start', '--', '--dev', '-s'], {
                    stdio: ['ignore', 'inherit', 'inherit'],
                    shell: true
                });
            }
        }
    };
}