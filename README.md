# Progressive Web App Example

This example uses [`next-pwa`](https://github.com/shadowwalker/next-pwa) to create a progressive web app (PWA) powered by [Workbox](https://developers.google.com/web/tools/workbox/).

## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/next.js/tree/canary/examples/progressive-web-app&project-name=progressive-web-app&repository-name=progressive-web-app)

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app --example progressive-web-app progressive-web-app
# or
yarn create next-app --example progressive-web-app progressive-web-app
# or
pnpm create next-app --example progressive-web-app progressive-web-app
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).


## Comando para rodar via WSL e acessar via Device mobile
netsh interface portproxy add v4tov4 listenport=<port-to-listen> listenaddress=0.0.0.0 connectport=<port-to-forward> connectaddress=<forward-to-this-IP-address>

netsh interface portproxy add v4tov4 listenport=3000 listenaddress=0.0.0.0 connectport=3000 connectaddress=172.28.184.189
