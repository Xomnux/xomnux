# XomnuxWebsite

SPA CSR para los monitores multiplataforma de Docker y Kubernetes de Xomnux.

## Desarrollo y despliegue Node

1. Copia `.env.example` a `.env` y configura las claves de Stripe y la dirección BTC verificada de Proton Wallet.
2. Ejecuta `npm install`.
3. Compila con `npm run build` (Webpack usa `devtool: false`, por lo que no genera source maps).
4. Despliega con `npm start`.

Stripe usa Payment Element con PaymentIntents creados en el servidor; la clave secreta nunca llega al navegador. Proton Wallet se abre mediante un enlace `bitcoin:` a la dirección configurada. La activación de licencias BTC requiere verificar la transacción en cadena.
