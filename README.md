## Getting Started

First, install the dependency :

```bash
yarn install
```

Then, your can run the development server:

```bash
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Other command

Eslint

```
yarn lint
```

Run test cases

```
yarn test
```

## Libray I have used

### dependencies

- bip39: for mnemonic generation
- stream-browserify, process, buffer: for polyfill the bip39 and make it workable in browser.
- hdKey: for calculate the root private and public key from the seed
- assert, crypto-browserify: for polyfill the hdkey and make it workable in browser.
- bitcoinjs-lib: for calculate the bitconin address from derivation public key
- prop-types, react, react-dom: for react framework

### Dev dependencies

- webpack
- webpack-cli: for webpack cli command
- webpack-dev-server: web server for local development
- html-webpack-plugin: bundle script will place to html automatically
- sass
- sass-loader
- style-loader: style & css & sass loaded for webpack
- @babel/core
- @babel/preset-env: Transform ES6+ into valid ES5 code
- @babel/preset-react: extends Babel support to JSX.
- babel-loader: hooks Babel into webpack.
- babel-jest
- @testing-library/react
- @testing-library/jest-dom
- @testing-library/user-event: testing libray for react
- jest-environment-jsdom: for fixing ArrayBuffer issue when testing HDKey
- eslint
- eslint-loader
- eslint-config-react
- eslint-plugin-react
- eslint-plugin-jest
- eslint-config-standard
- eslint-plugin-node
- eslint-plugin-promise: for eslint
- prettier: for auto save with format
