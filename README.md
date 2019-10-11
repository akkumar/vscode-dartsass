[![VSCode Marketplace Badge](https://img.shields.io/vscode-marketplace/v/malvahq.dartsass.svg?label=VSCode%20Marketplace&style=flat-square)](https://marketplace.visualstudio.com/items?itemName=malvahq.dartsass) [![Total Install](https://img.shields.io/vscode-marketplace/d/malvahq.dartsass.svg?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=malvahq.dartsass) [![Avarage Rating Badge](https://img.shields.io/vscode-marketplace/r/malvahq.dartsass.svg?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=malvahq.dartsass) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/malvahq/vscode-plugin-dartsass/)


Compiles .scss files using [Dart SASS Compiler](https://sass-lang.com/dart-sass) to css and minified css.

## Usage

The plugin gets activated when .scss files are opened and saved.

It uses the Dart/JS Sass Compiler to generate the .css and .min.css files automatically for the given .scss file in the editor.

By default, the Dart/JS compiler gets activated with every save of the current editor file.
If that is too aggressive, see `dartsass.pauseInterval` below.


## Extension Settings

This extension contributes the following settings:

* `dartsass.includePath`: Default: [ ]. Set of directories to be specified as includePath for sass compilation.
* `dartsass.sassWorkingDirectory`: Default: Project Root. The working directory from which to run the sass compiler to be used by `node-sass-package-importer`. This can be an absolute directory or a directory, relative to project root.
* `dartsass.disableMinifiedFileGeneration`: Default: False. Flag to disable minified file generation. Minified files are generated by default.
* `dartsass.disableCompileOnSave`: Default: False. This disables a compilation with every save.
* `dartsass.pauseInterval`: Default: 10. Pause Interval (in seconds) before kicking off another scss compilation to not compile frequently and hog resources.
* `dartsass.enableStartWithUnderscores`: Default: false. Enables compilation of files that start with underscores.
* `dartsass.disableAutoPrefixer`: Default: false. Disables postcss processing using autoprefixer library.
* `dartsass.autoPrefixBrowsersList`: Default: ["last 2 version"]. List of browsers to be specified for autoprefixer. See https://github.com/browserslist/browserslist#readme for more details.
* `dartsass.targetDirectory`: Default: Empty. The target directory to write the generated css files. This can be an absolute directory or a directory, relative to project root.
* `dartsass.targetMinifiedDirectory`: Default: Empty. The target directory to write the generated minified css files. This can be an absolute directory or a directory, relative to project root.
* `dartsass.debug`: Default: false. Best applicable for developers of this extension only.

## Extension Commands

### QuikSass: Compile Current File

( Shortcut: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>L</kbd> )

Compiles the current scss file in the active editor to .css and .min.css file as appropriate.

### QuikSass: Sass Compiler Version

( Shortcut: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Q</kbd> )

Prints out the current sass compiler version being used.

## Features

### Pure Javascript SASS

This VSCode plugin directly depends on the native pure-javascript `sass` implementation.

Check [Dart implementation of SASS](https://sass-lang.com/dart-sass) for more details.

It does not depend on `node-sass` (or indirectly the platform-specific `libcss` either !).

### Smart Imports

It automatically imports [node-sass-package-importer](https://github.com/maoberlehner/node-sass-magic-importer/tree/master/packages/node-sass-package-importer) as well.


So it is possible to use the following the import notation in the scss files.


Eg:

Assume, we define a dependency in package.json as below (say, sass-mq).

`package.json`
```json
"dependencies": {
    "sass-mq": "~5.2.1",
}
```

We should pull the npm modules in the `node_modules` directory as below.

```
$ npm i
```
The above command will pull the node modules from npm to `node_modules` directory at the same level as package.json.

Then, we can import the package, `sass-mq` in our scss file using a shorthand notation starting with `~` as below.

`app.scss`
```scss
@import '~sass-mq/mq';
```

The plugin will include the modules defined in `package.json` (and hence, the generated modules present in the `node_modules` directory) when transpiling the .scss files inline.

#### Customize Directory

By default, it looks for packages in `package.json` in the root directory of the current project. ( and hence, the packages in `node_modules`)

To customize the same, check `dartsass.sassWorkingDirectory`. More details below in extension settings.

## Install

You can install [malvahq.dartsass](https://marketplace.visualstudio.com/items?itemName=malvahq.dartsass) from the VSCode Marketplace as appropriate.

## License

This VSCode extension is released under [MIT license](LICENSE).



## Requirements



## Release Notes

See [CHANGELOG](CHANGELOG.md) for more details.
