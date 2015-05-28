## Adding an API source

```
npm install data.blankon.id-<api>
cd sources
ln -s ../node_modules/data.blankon.id-<api> <api>
```

You can put prefix to mount the api to a certain path by creating a `<api>.settings.json` with contents something like this:
`
```
{
    "prefix": "/a/custom/path"
}
```
