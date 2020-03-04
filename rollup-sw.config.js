import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import {terser} from 'rollup-plugin-terser';

const DEBUG = false;

export default {
    input: 'build/sw.js',
    output: {
        format: 'iife',
        name: 'sw',
        file: 'public/sw.js'
    },
    plugins: [
        resolve({
            browser: true
        }),
        commonjs(),
        replace({
            __buildEnv__: DEBUG ? "dev" : "production"
        }),
        terser(),
    ]
};