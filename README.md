



// ============================
// FILE: README.md (Quick Steps)
// ============================
# Telegram Tracker Bot (Telegraf + Vercel)


Consent-based device/network info collection via a unique link sent from a Telegram bot. Suitable for security testing and lawful investigations only.


## 1) Install & Configure
```bash
npm i
cp .env.example .env # then fill variables (or set via Vercel env)
```


Set Vercel env:
```bash
vercel env add BOT_TOKEN
vercel env add TRACK_SECRET
vercel env add APP_BASE_URL
vercel env add BOT_USERNAME
vercel env add COPYRIGHT_TAG
```


## 2) Local Dev
```bash
npx vercel dev
```
Then set local webhook (optional) pointing to your tunnel URL (e.g. ngrok) if testing Telegram updates locally.


## 3) Deploy
```bash
npm run deploy
```


Set Telegram webhook **after deployment** (replace variables):
```
https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=<APP_BASE_URL>/api/bot
```


## 4) Use
In Telegram chat with your bot:
```
/track
```
Bot replies with a unique link. Open it on a phone browser, tap **Share details** (and optionally **Take photo**). The bot will receive a formatted report.


## Notes
- Mobile number cannot be retrieved by browsers. Any such claim is likely using illegal methods. This project collects only consented, browser-exposed data.
- If geolocation permission is denied, backend will still attempt IP-based geolocation for city-level approximation.
- Links expire in 24h by default (JWT expiry). Adjust in `signToken()` if needed.
- No server memory/state required—chat id is encoded in the signed token.
- Ensure you comply with all applicable laws and get explicit consent.
