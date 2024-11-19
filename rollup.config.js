import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import filesize from "rollup-plugin-filesize";
import typescript from "rollup-plugin-typescript2";
import copy from "rollup-plugin-copy";
import cleanup from "rollup-plugin-cleanup";
import terser from "@rollup/plugin-terser";

const plugins = [
  copy({ targets: [{ src: "src/tesseract", dest: "dist" }] }),
  commonjs({
    include: "node_modules/**",
  }),
  babel({
    babelHelpers: "runtime",
    babelrc: false,
    presets: [
      [
        "@babel/preset-env",
        {
          modules: false,
          loose: true,
        },
      ],
    ],
    plugins: ["@babel/plugin-transform-runtime"].filter(Boolean),
  }),
];

const devPlugins = plugins.concat([
  replace({
    "process.env.NODE_ENV": JSON.stringify("development"),
    preventAssignment: true,
  }),
]);

const prodPlugins = plugins.concat([
  replace({
    "process.env.NODE_ENV": JSON.stringify("production"),
    preventAssignment: true,
  }),
  terser(),
  filesize(),
  typescript({
    // rollupCommonJSResolveHack: false,
    outDir: "./types",
    clean: true,
  }),
  cleanup(),
]);

const base = {
  input: "src/index.ts",
};

const output = {
  exports: "named",
};

const makeOutput = (config) => Object.assign({}, output, config);

const withBase = (config) => Object.assign({}, base, config);

export default [
  {
    output: [
      {
        name: "idcard.js",
        dir: "dist",
        format: "es",
      },
    ].map(makeOutput),
    plugins: prodPlugins,
  },
  // {
  //   output: [{
  //       name: "WaterMark",
  //       file: "dist/watermark.js",
  //       format: "umd",
  //     },
  //     {
  //       file: "dist/watermark.es.js",
  //       format: "es",
  //     },
  //     {
  //       file: "dist/watermark.cjs.js",
  //       format: "cjs",
  //     },
  //   ].map(makeOutput),
  //   plugins: devPlugins,
  // },
].map(withBase);
