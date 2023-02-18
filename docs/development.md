# Contributing to `shannon-fano-encoding`

this project aims to be an efficient self-contained implementation of shannon encoding.

this project is written for esm because most likely, that is what you are using at work,
and more popular/powerful people than me have already made cjs unworkable.

typescript types should be added in the future, ideally without a build step.

formatting (like [prettier](https://prettier.io)) should be added in the future also.

## Testing

[Jasmine](https://jasmine.github.io/tutorials/your_first_suite)
was chosen as the test suite because of its minimal depencies (944K in `./node_modules` as of this writing).

Tests should aim to demonstrate correct usage of the library.
They should also have correct expected values where applicable.

## IDE Setup

To work on this project in Sublime, installing the following `.sublime-build`s is recommended:

`jasmine.sublime-build`:

```json
{
	"shell_cmd": "\\$(npm bin)/jasmine $file"
}
```

`node.sublime-build`:

```json
{
	"shell_cmd": "node $file"
}
```

in Sublime Text 4, they go in the `~/.config/sublime-text/Packages/User/` folder.

To run individual files, use `Ctrl+Shift+B` to [select a build system][select-bs] -
`jasmine` for test files, `node` for non-jasmine files.

[select-bs]: https://www.sublimetext.com/docs/build_systems.html#selecting-a-build-system
