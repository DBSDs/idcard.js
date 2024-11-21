const replace = require("@rollup/plugin-replace");
const commonjs = require("@rollup/plugin-commonjs");
const { babel } = require("@rollup/plugin-babel");
const filesize = require("rollup-plugin-filesize");
const typescript = require("rollup-plugin-typescript2");
const copy = require("rollup-plugin-copy");
const cleanup = require("rollup-plugin-cleanup");
const terser = require("@rollup/plugin-terser");

const plugins = [
  copy({ targets: [{ src: "src/tesseract", dest: "dist" }] }),
  commonjs(),
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
  external: ["tesseract.js"],
};

const output = {
  exports: "named",
};

const makeOutput = (config) => Object.assign({}, output, config);

const withBase = (config) => Object.assign({}, base, config);

module.exports = [
  {
    output: [
      {
        name: "idcard.js",
        dir: "dist",
        format: "umd",
        globals: {},
      },
    ].map(makeOutput),
    plugins: prodPlugins,
  },
].map(withBase);
