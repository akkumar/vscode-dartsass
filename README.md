# quiksass vscode plugin

VSCode plugin to compile .scss files. The plugin gets activated by opening .scss files.

It uses the Dart/JS Sass Compiler to generate the .css and .min.css files for the given .scss file.

By default, the compiler gets activated with every save of the current editor file. See `quiksass.pauseInterval` below if that is too agressive.


## Install

You can install [altoscode.quiksass](https://marketplace.visualstudio.com/items?itemName=altoscode.quiksass) from the VSCode Marketplace as appropriate.

## License

This VSCode extension is released under [MIT license](LICENSE).


## Extension Commands

### QuikSass: Compile Current File

( Uses: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>L</kbd> )

Compiles the current scss file in the active editor to .css and .min.css file as appropriate.

### QuikSass: Sass Compiler Version

( Uses: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Q</kbd> )

Prints out the current sass compiler version being used.

## Extension Keyboard Shortcuts

### <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>L</kbd>

See [QuikSass: Compile Current File](#quiksass:-compile-current-file) above.

### <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Q</kbd>

See [QuikSass: Sass Compiler Version](#quiksass:-sass-compiler-version) above.

## Extension Settings

This extension contributes the following settings:

* `quiksass.includePath`: Default: [ ]. Set of directories to be specified as includePath for sass compilation.
* `quiksass.sassWorkingDirectory`: Default: Project Root. The working directory from which to run the sass compiler to be used by `node-sass-package-importer`. This can be an absolute directory or a directory, relative to project root.
* `quiksass.disableMinifiedFileGeneration`: Default: False. Flag to disable minified file generation. Minified files are generated by default.
* `quiksass.disableCompileOnSave`: Default: False. This disables a compilation with every save.
* `quiksass.pauseInterval`: Default: 10. Pause Interval before kicking off another scss compilation to not compile frequently and hog resources.
* `quiksass.debug`: Default: false. Sets the debug flag for debugging the extension. Best applicable for developers of this extension only.


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

To customize the same, check `quiksass.sassWorkingDirectory`. More details below in extension settings.


## Requirements



## Release Notes

See [CHANGELOG](CHANGELOG.md) for more details.
