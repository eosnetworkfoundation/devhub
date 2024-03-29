# Frontend
EOS Network Foundation DevHub portal website frontend for [learn.eosnetwork.com](https://learn.eosnetwork.com).

## Publishing

In order to publish the frontend through CI you need to:
- Push up your changes and make sure the CI dry run passes
- Bump the version in `package.json`
- Create a tag with `v*.*.*` that matches the version in `package.json`

Note: If you've installed new dependencies you need to commit the `yarn.lock` file, and it 
must be built with the same version of yarn as the CI server (v16.*).

## Development
Once you have the [prerequisites](../README.md#prerequisites) installed, start here.

For detailed explanation on how things work, check out the [nuxtJS documentation](https://nuxtjs.org).

### Initialization
Automatically switch to the correct version of nodeJS.
```bash
nvm use
```
Install dependencies.
```bash
yarn
```
Set `DEVHUB_BACKEND_API` in your shell environment, if not using localhost:3001.
```bash
export DEVHUB_BACKEND_API='https://example.com'
```

### Static Hosting
Build the frontend for static hosting. Routes are generated at build-time, then the site is rendered client-side at runtime.
```bash
yarn generate
```
You can view the results by opening `./dist/index.html` in your web browser.

### Dynamic Hosting
Build the frontend for dynamic hosting, where a nodeJS server sends clients rendered HTML at runtime.
```bash
yarn build
```
Start a local server with hot reload to view your work.
```bash
yarn start
```
The site will be available at [localhost:3000](http://localhost:3000) in your web browser.

## Special Directories
You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`
The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`
The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`
Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).

### `pages`
This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`
The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`
This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`
This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
