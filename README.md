# Thunder Eletric

Landing page de alta conversão para a Thunder Eletric, loja de motos elétricas (Bizz, Urban, X13, i5 Joy, entre outras).

## Stack

- [TanStack Start](https://tanstack.com/start) (React + SSR)
- Vite
- Tailwind CSS

## Desenvolvimento

Requer Node.js.

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

O build usa [Nitro](https://nitro.build/) para gerar o servidor de produção. O preset de deploy é configurado em `vite.config.ts` (atualmente `cloudflare-module` — troque para o preset do seu host, ex. `node-server`, `vercel` ou `netlify`).
