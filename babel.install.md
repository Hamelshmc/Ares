## Babel

```bash
npm i @babel/cli @babel/node @babel/core @babel/preset-env nodemon --save-dev
```
## .babelrc NEW file
```json
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "node": true
                }
            }
        ]
    ]
}
```

## .package.json ADD file
```json
{
 "scripts": {
        "build": "babel src --out-dir build",
        "start": "nodemon --exec babel-node src/index.js",
    },
}
```
