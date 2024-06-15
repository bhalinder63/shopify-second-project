# Shopify Learning Project

## System Requirements

- [Node](https://nodejs.org/en/) (v16+). If you have nvm use `nvm use` to get to the right node version.
- [NPM 5+](https://docs.npmjs.com/try-the-latest-stable-version-of-npm)
- [Yarn 1.22](https://classic.yarnpkg.com/lang/en/docs/install/#alternatives-stable)
- [Shopify Cli](https://shopify.dev/themes/tools/cli/installation) - Preferred method on mac is homebrew
- [Shopify Theme Check](https://github.com/Shopify/theme-check#installation) - Preferred method is homebrew

## Getting Started

1. Clone this repo ( git clone git@github.com:anattadesign/shopify-starter.git ), rename the directory to your project.
2. Open in terminal and and run `npm install` or `yarn` to install all dependencies.

### First deployment

1. Run `npm build` or `yarn build` to create your first Webpack build.
2. Compress **dist** folder from your local directory.
3. In Shopify, upload the compressed **dist** folder in Shopify admin through Add Theme option in online store.
4. Add files to be ignored **.shopifyignore** while deployment.
5. In Shopify, copy the theme ID for the new theme, then update the `THEME_ID`, and `STORE_URL` in **.env** file.
6. Run `npm start` or `yarn start` to run your Webpack build and start watching for file changes to be uploaded to Shopify.

### Consequent deployment

1. Add files to be ignored **.shopifyignore** while deployment.
2. In Shopify, copy the theme ID for the new theme, then update the `THEME_ID`, and `STORE_URL` in **.env** file.
3. Run `npm start` or `yarn start` to run your Webpack build and start watching for file changes to be uploaded to Shopify.

## Configuration

### NPM/YARN

We prefer yarn over npm, because it's faster.

#### Commands

`npm start` or `yarn start`

- Completes a Webpack build in **development** mode
- Choose the partner account your store can be accessed in
- deloy the initial build to the shopify
- Webpack begins watching for file changes
- Shopify CLI begins watching for file changes in `dist/`
- Shopify CLI provides you Localhost and store URL

`npm run build` or `yarn build`

- Completes a Webpack build in **production** mode

`npm run deploy` or `yarn deploy`

- Completes a Webpack build in **production** mode
- Deploys and overwrites all theme files via Shopify CLI

`npm run eslint` or `yarn eslint`

- Lint all JavaScript files in `src/js`

### Webpack

#### Entry Points

All JavaScript files in the `js/bundles/layouts` and `js/bundles/templates` directory & subdirectories are used as entry points. All other JavaScript modules should added to additional subdirectories of `js/`. An entry point file must be created for each liquid template file, including alternate templates. A CSS file for each template and layout should also be added to `styles/layout` and `styles/templates`. These CSS files should be imported at the top of each JavaScript entry file.

#### Output Files

Webpack will generate a JavaScript file for each template and layout file in the `bundles` directory. The CSS files imported in each bundle entry file will also generate CSS files. Webpack will add all output files to `dist/assets`.

### Shopify CLI

Install Shopify CLI 3.0 with homebrew

```
brew tap shopify/shopify
brew install shopify-cli
```

#### Config

The Shopify CLI configuration file uses `dist` as the root directory for watching files to upload.

#### File Uploads

When running `npm run start` or `yarn start`, Webpack will use a plugin that runs `shopify login` to login to the partner account for the store and `shopify theme serve` after a successful build. Webpack will then be set to watch and recompile file changes, and Theme Kit will watch for file changes in the `dist` directory.

## Required Files

- The layout and template entry files in `src/js/bundles/` are necessary for Webpack to generate the CSS and JavaScript assets for each layout and template. Additional entry files will be required when creating new liquid templates or alternate templates, ie. `page.about.js`.
- The `style-bundle.liquid` and `script-bundle.liquid` snippets output dynamic asset URLs based on current layout and template. These have been added to sample `theme.liquid`. The `layout` variable is required.

#### Shopify Plus Stores

If your store is on Shopify Plus, you'll need to do the following:

- Create `checkout.scss` and add to `src/styles/layout/`.
- Create `checkout.js` and add to `src/js/bundles/layout/`.
- Add `import "Styles/layout/checkout.scss";` to `checkout.js`.
- Render these snippets in `checkout.liquid` by changing the snippet's layout variable to `checkout`. ie. `{% render 'style-bundle', layout: 'checkout' %}` and `{% render 'script-bundle', layout: 'checkout' %}`.

### Extensions to install

To lint and prettify your files please install the following VS Code extensions

1. ESLint
2. Prettier
3. Shopify by Shopify
4. Shopify Liquid Template Snippets by Franky Lau

## Notes

- Subdirectories are allowed in `assets/`, `js/`, `styles/`, `snippets/`.
- A `Styles` module alias for the styles directory is ready to use. ie. `import "Styles/layout/theme.scss"`.
- To reference an asset url in an SCSS file such as a background image, just use `./filename.ext`, since all final CSS and images live in the `dist/assets/` directory.
- If you add a new JavaScript entry file to `js/bundles/` while Webpack and Theme Kit are watching for changes, you'll need to end the process and run `npm start` again so that Webpack is aware of the new entry file.
- A git pre-commit hook is installed that will run `webpack build` prior to the commit. This is useful if using a code deployment tool so that you never push and deploy an unbuilt theme.
- `clean-webpack-plugin` was intentionally not included to make incremental deployments faster using [Buddy](https://buddy.works/). If you remove a bundle entry file, you'll also need to delete the bundle files from `dist/assets`.
- If you update or switch node versions using `nvm`, you may need to run `npm rebuild node-sass` to refresh node-sass for your current environment.
- When merging 2 git feature branches, you only need to resolve the conlficts inside `src/`. Any conflicts inside `dist/` can be resolved with `npm run build`. Always run `npm run build` after resolving merge conflicts.

#### Basic folders structure

```
├── assets
│   ├── favicon
│   ├── fonts
│   ├── images
│   └── svg
├── config
├── design-tokens
├── js / bundles
│   ├── components
│   ├── layout
│   └── templates
│       └── customers
├── liquid
│   ├── layout
│   ├── sections
│   ├── snippets
│   └── templates
│       └── customers
├── locales
└── styles
    ├── components
    │   ├── global
    │   └── shared
    ├── layout
    └── templates
        └── customers
```

#### ESlint (JavaScript Guidelines)

The `"extends": "eslint:recommended"` property in a configuration file enables rules that report common problems, which have a check mark below.
https://eslint.org/docs/rules/

#### Stylelint (Sass Guidelines)

https://github.com/stylelint/stylelint-config-standard
