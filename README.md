# Remix + Hono Starter for Node.js

Node.js 上で Hono と Remix を利用するためのスターターテンプレートです。

以下の要素を含みます。

- [x] [Remix](https://remix.run/docs)
- [x] [Hono](https://hono.dev/docs)
- [x] TypeScript
- [ ] Tailwind CSS
- [ ] ESLint
- [ ] Prettier
- [ ] Vitest
- [ ] Dockerfile

## Development

Run the dev server:

```sh
# public/ にあるファイルを利用するためには一度ビルドする必要がある
npm run build
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

## 参考

- https://github.com/JfrAziz/remix
- https://github.com/sergiodxa/remix-hono