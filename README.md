# XomnuxWebsite

## GitHub Pages (single-file upload)

Run `npm run build:pages` to generate `github-pages/index.html` from the Xomnux sources. This command only needs Node.js; no dependency installation is required. CSS and JavaScript are embedded in the HTML, so there are no local asset paths to break under a repository URL. Google Fonts still loads online.

Upload **`github-pages/index.html` as `index.html` at the root of your publishing branch** (replace the old Nimbus `index.html` there). In GitHub, open **Settings → Pages → Deploy from a branch**, choose that branch and **/ (root)**, then save. Upload the file itself, not the enclosing `github-pages` folder.

This is a static storefront: language switching, product information, and checkout dialogs work. Stripe payments and the Bitcoin address remain unconfigured because GitHub Pages cannot run `server.js` or its API. The existing localized unavailable messages appear when selecting a payment method. Use separate backend hosting to enable payments; never put secret keys into the HTML.

GitHub instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

SPA CSR para los monitores multiplataforma de Docker y Kubernetes de Xomnux.

## Desarrollo y despliegue Node

1. Copia `.env.example` a `.env` y configura las claves de Stripe y la dirección BTC verificada de Proton Wallet.
2. Ejecuta `npm install`.
3. Compila con `npm run build` (Webpack usa `devtool: false`, por lo que no genera source maps).
4. Despliega con `npm start`.

Stripe usa Payment Element con PaymentIntents creados en el servidor; la clave secreta nunca llega al navegador. Proton Wallet se abre mediante un enlace `bitcoin:` a la dirección configurada. La activación de licencias BTC requiere verificar la transacción en cadena.
