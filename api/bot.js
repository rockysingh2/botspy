// ============================
// FILE: api/bot.js
// ============================
const { Telegraf } = require('telegraf');
const express = require('express');
const jwt = require('jsonwebtoken');


const app = express();
app.use(express.json({ limit: '4mb' }));


const bot = new Telegraf(process.env.BOT_TOKEN);


// Helpers
function newRequestId() {
return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}


function signToken(payload) {
return jwt.sign(payload, process.env.TRACK_SECRET, { expiresIn: '24h' });
}


function appBaseUrl() {
const url = process.env.APP_BASE_URL;
if (!url) throw new Error('APP_BASE_URL not set');
return url.replace(/\/$/, '');
}


// Basic commands
bot.start((ctx) => ctx.reply('👋 Welcome! Use /track to generate a unique tracking link.'));
bot.help((ctx) => ctx.reply('Commands:\n/track - generate a unique consent-based tracking link'));


// /track command — generate signed link (no server memory needed)
bot.command('track', async (ctx) => {
try {
const requestId = newRequestId();
const token = signToken({ chatId: ctx.chat.id, requestId });
const link = `${appBaseUrl()}/track?token=${encodeURIComponent(token)}`;


await ctx.reply(
[
'🎉 𝗬𝗼𝘂𝗿 𝗨𝗻𝗶𝗾𝘂𝗲 𝗧𝗿𝗮𝗰𝗸𝗶𝗻𝗴 𝗟𝗶𝗻𝗸 𝗶𝘀 𝗥𝗲𝗮𝗱𝘆! 🎉',
'',
`🔗 Link: ${link}`,
'',
'ℹ️ Open in Chrome/Edge/Firefox on phone for best results.',
'⚠️ The page clearly asks for consent before collecting device/location info.'
].join('\n')
);
} catch (err) {
console.error('track error', err);
ctx.reply('❌ Failed to create link. Please set APP_BASE_URL and TRACK_SECRET.');
}
});


// Webhook receiver (Vercel -> /api/bot)
app.post('/api/bot', async (req, res) => {
try {
await bot.handleUpdate(req.body, res);
} catch (error) {
console.error('Error handling update:', error);
res.status(500).send('Error processing update');
}
});


app.get('/api/bot', (req, res) => {
res.send('Bot is running');
});


module.exports = app;
