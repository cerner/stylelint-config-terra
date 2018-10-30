# custom-property-namespace-version

Requires custom properties defined within var functions to be prefixed with a namespace and version.

## Options

`boolean`: `true`

By default the rule will find the nearest package.json and extract the package name and version.

Versions must only include the major version in the following format: `v2`.

The following patterns are considered violations:

Example of the nearest package.json
```json
{
  "name": "terra-example",
  "version": "3.2.1"
}
```
```css
/* Does not contain a version. */
a { color: var(--terra-example-color); }
```
```css
/* Is not prefixed with the namespace. */
a {  color: var(--terra-v3-color); }
```

The following patterns are *not* considered violations:

```css
/*          namespace ↓         ↓ version */
a { color: var(--terra-example-v3-color); }
```

## Optional secondary options

### `namespace`

`string`

A custom namespace. If not specified the name in the nearest package.json will be used.

Example:
```json
[
  true,
  {
    "namespace": "terra-component",
    "version": 1
  }
]
```

```css
a { color: var(--terra-component-v1-color); }
```


### `version`

`string`

A custom version. If not specified the version in the nearest package.json will be used.

Example:
```json
[
  true,
  {
    "namespace": "terra-component",
    "version": 1
  }
]
```

```css
a { color: var(--terra-component-v1-color); }
```
