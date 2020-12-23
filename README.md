# svg-sprite-loader-issue

- Node.js version: v12.14.0
- webpack version: ^5.11.0
- svg-sprite-loader version: ^5.2.1
- OS type & version: Mac OS Mojave (10.14.6)

# How to reproduce

```sh
npm install
npm run build
```

# Current output

```
dist/manifest.json
dist/img/sprite.[hash].js
dist/img/sprite.svg
```

# Expected output

```
dist/manifest.json
dist/img/icons.[hash].svg
```
