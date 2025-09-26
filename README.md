This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Set up do projeto

Primeiramente, veja se você tem o Node instalado, se não tiver, instale.

Depois de clonar ou baixar o projeto no seu computador, navegue até a pasta raiz do projeto no terminal (a pasta onde contém o README.md) e instale as dependências do projeto com o comando:

```bash
npm install
```

Em segue crie uma build de produção através do comando:

```bash
npm run build
```

Para rodar a build de produção execute o comando:

```bash
npm run start
```

No terminal, você verá o ip e a porta onde a aplicação estará rodando, você pode acessar ela pelo `http://localhost:3000` ou através da rede pelo ip e porta descritos no terminal.

Para acessar o Painel de Desenho pelos tables, os tablets e o computador rodando o projeto devem estar na mesma rede. Em seguida, acessa o ip e porta da seção `Network:` através do chrome nos tables.

Quando o usuário do tablet clicar em `Salvar`, o desenho será salvo no computador rodando o projeto na pasta `zan-drawing-canvas/public/uploads`.

\*\*\* Você pode também rodar o projeto no modo desenvolvedor usando o comando:

```bash
npm run dev
```

#### This are the nextjs instructions

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
