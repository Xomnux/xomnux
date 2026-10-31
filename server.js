const express = require('express');
const path = require('path');
const Stripe = require('stripe');
const app = express();
const catalog = { docker: { amount: 2900, name: 'Xomnux Docker Monitor' }, kubernetes: { amount: 4900, name: 'Xomnux K8 Monitor' } };
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

app.use(express.json());
app.get('/api/config', (_req, res) => res.json({ stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '', bitcoinAddress: process.env.BTC_ADDRESS || '' }));
app.post('/api/create-payment-intent', async (req, res) => {
  const product = catalog[req.body?.productId];
  const quantity = Number(req.body?.quantity);
  if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 5) return res.status(400).json({ error: 'Invalid product or quantity.' });
  if (!stripe || !process.env.STRIPE_PUBLISHABLE_KEY) return res.status(503).json({ error: 'Card payments are not configured yet.' });
  try {
    const paymentIntent = await stripe.paymentIntents.create({ amount: product.amount * quantity, currency: 'usd', automatic_payment_methods: { enabled: true }, metadata: { productId: req.body.productId, quantity: String(quantity) } });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) { console.error(error.message); res.status(502).json({ error: 'Unable to start payment.' }); }
});
const dist = path.join(__dirname, 'dist');
app.use(express.static(dist));
app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
app.listen(process.env.PORT || 3000, () => console.log('Xomnux running'));
