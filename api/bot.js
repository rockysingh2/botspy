bot.start((ctx) => {
  ctx.reply(`👋 Welcome ${ctx.from.first_name}!
  
📌 Your Telegram ID is: ${ctx.from.id}`);
});
