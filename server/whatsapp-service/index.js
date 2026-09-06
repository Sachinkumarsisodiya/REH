const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const QRCode = require('qrcode');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

// ─────────────────────────────────────────────
//  Clean up stale Chromium Singleton locks (Fixes Railway/Docker restart crash)
// ─────────────────────────────────────────────
function cleanupSingletonLocks(dirPath) {
    try {
        if (!fs.existsSync(dirPath)) return;
        const entries = fs.readdirSync(dirPath, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.join(dirPath, entry.name);
            if (entry.isDirectory()) {
                cleanupSingletonLocks(fullPath);
            } else if (
                entry.name.startsWith('Singleton') ||
                entry.name === 'SingletonLock' ||
                entry.name === 'SingletonCookie' ||
                entry.name === 'SingletonSocket'
            ) {
                try {
                    console.log(`[CLEANUP] Removing stale lock file: ${fullPath}`);
                    fs.unlinkSync(fullPath);
                } catch (e) {
                    console.warn(`[CLEANUP] Could not remove lock file ${fullPath}:`, e.message);
                }
            }
        }
    } catch (err) {
        console.warn('[CLEANUP] Lock cleanup warning:', err.message);
    }
}

const authDataPath = path.join(__dirname, '.wwebjs_auth');
cleanupSingletonLocks(authDataPath);

// Current QR string (refreshes automatically)
let currentQR = null;
let isReady = false;

// ─────────────────────────────────────────────
//  WhatsApp Client with Container-Safe Puppeteer Configuration
// ─────────────────────────────────────────────
const puppeteerExecutablePath = process.env.PUPPETEER_EXECUTABLE_PATH || (process.platform === 'linux' ? '/usr/bin/chromium' : undefined);

const client = new Client({
    authStrategy: new LocalAuth({ dataPath: authDataPath }),
    puppeteer: {
        headless: true,
        executablePath: puppeteerExecutablePath,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu',
            '--headless=new',
            '--disable-software-rasterizer',
            '--disable-extensions'
        ]
    }
});

client.on('qr', (qr) => {
    currentQR = qr;
    isReady = false;
    console.log('\n[QR] Naya QR generate hua!');
    console.log('[QR] Browser mein kholo: /qr');
    console.log('[QR] Wahan se apne phone se scan karo.\n');
    qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
    currentQR = null;
    console.log('\n✅ WhatsApp AUTHENTICATED! Session save ho gayi.\n');
});

client.on('auth_failure', () => {
    isReady = false;
    console.log('\n❌ Auth fail — session folder delete karo aur restart karo.\n');
});

client.on('ready', () => {
    isReady = true;
    currentQR = null;
    console.log('\n╔══════════════════════════════════════════════╗');
    console.log('║  ✅ WhatsApp READY — Auto-send active!        ║');
    console.log('║  Port pe API ready hai.                       ║');
    console.log('╚══════════════════════════════════════════════╝\n');
});

client.on('disconnected', (reason) => {
    isReady = false;
    console.log('\n⚠️  WhatsApp disconnected:', reason, '\n');
});

console.log('\n🚀 WhatsApp Service start ho rahi hai...\n');
client.initialize().catch(err => {
    console.error('❌ Failed to initialize WhatsApp client:', err);
});

// ─────────────────────────────────────────────
//  QR Code Webpage — Browser se scan karo
// ─────────────────────────────────────────────
app.get('/qr', async (req, res) => {
    if (isReady) {
        return res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>REH WhatsApp — Connected</title>
                <style>
                    body { font-family: sans-serif; background: #0f172a; color: #fff;
                           display: flex; align-items: center; justify-content: center;
                           height: 100vh; margin: 0; flex-direction: column; gap: 16px; }
                    .badge { background: #22c55e; padding: 16px 32px; border-radius: 16px;
                             font-size: 22px; font-weight: 900; }
                    p { color: #94a3b8; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="badge">✅ WhatsApp Connected & Ready!</div>
                <p>Auto-send active hai. Is page ko band kar sakte ho.</p>
            </body>
            </html>
        `);
    }

    if (!currentQR) {
        return res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8" http-equiv="refresh" content="3">
                <title>REH WhatsApp — Loading</title>
                <style>
                    body { font-family: sans-serif; background: #0f172a; color: #fff;
                           display: flex; align-items: center; justify-content: center;
                           height: 100vh; margin: 0; flex-direction: column; gap: 16px; }
                    .spin { font-size: 48px; animation: spin 1s linear infinite; }
                    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                    p { color: #94a3b8; }
                </style>
            </head>
            <body>
                <div class="spin">⏳</div>
                <p>WhatsApp client initialize ho raha hai... 10-20 seconds wait karo.</p>
                <p style="font-size:12px">Ye page auto-refresh hoga.</p>
                <script>setTimeout(() => location.reload(), 3000);</script>
            </body>
            </html>
        `);
    }

    // Generate QR as PNG data URL
    const qrDataUrl = await QRCode.toDataURL(currentQR, {
        width: 320,
        margin: 2,
        color: { dark: '#000000', light: '#ffffff' }
    });

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>REH WhatsApp — Scan QR</title>
            <style>
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body { font-family: 'Segoe UI', sans-serif; background: #0f172a; color: #fff;
                       display: flex; align-items: center; justify-content: center;
                       min-height: 100vh; padding: 24px; }
                .card { background: #1e293b; border: 1px solid #334155; border-radius: 24px;
                        padding: 40px; text-align: center; max-width: 420px; width: 100%;
                        box-shadow: 0 25px 50px rgba(0,0,0,0.5); }
                .logo { font-size: 28px; font-weight: 900; color: #0ea5e9; margin-bottom: 8px; }
                .subtitle { color: #94a3b8; font-size: 13px; margin-bottom: 28px; }
                .qr-wrap { background: #fff; border-radius: 16px; padding: 16px;
                           display: inline-block; margin-bottom: 24px;
                           box-shadow: 0 4px 20px rgba(14,165,233,0.3); }
                .qr-wrap img { display: block; border-radius: 8px; }
                .steps { text-align: left; background: #0f172a; border-radius: 12px;
                         padding: 16px 20px; margin-bottom: 20px; }
                .steps p { color: #94a3b8; font-size: 12px; line-height: 2; }
                .steps strong { color: #38bdf8; }
                .refresh-bar { background: #0ea5e9; height: 4px; border-radius: 2px;
                               animation: shrink 30s linear forwards; }
                @keyframes shrink { from { width: 100%; } to { width: 0%; } }
                .timer { color: #64748b; font-size: 11px; margin-top: 8px; }
                .badge { background: #16a34a20; border: 1px solid #16a34a50;
                         color: #4ade80; padding: 6px 14px; border-radius: 20px;
                         font-size: 12px; font-weight: 700; display: inline-block;
                         margin-bottom: 20px; }
            </style>
        </head>
        <body>
            <div class="card">
                <div class="logo">🏥 REH WhatsApp</div>
                <div class="subtitle">Rekha Eye Hospital — Auto Message Service</div>

                <div class="badge">📱 Phone se scan karo</div>

                <div class="qr-wrap">
                    <img src="${qrDataUrl}" width="288" height="288" alt="WhatsApp QR Code">
                </div>

                <div class="steps">
                    <p><strong>Step 1:</strong> Phone pe WhatsApp kholo</p>
                    <p><strong>Step 2:</strong> 3 dots (⋮) → <strong>Linked Devices</strong></p>
                    <p><strong>Step 3:</strong> <strong>Link a Device</strong> tap karo</p>
                    <p><strong>Step 4:</strong> Upar wala QR camera se scan karo</p>
                </div>

                <div class="refresh-bar"></div>
                <div class="timer">QR 30 sec mein expire hoga — page auto-refresh hoga</div>
            </div>
            <script>
                setTimeout(() => location.reload(), 30000);
            </script>
        </body>
        </html>
    `);
});

// ─────────────────────────────────────────────
//  Health Check
// ─────────────────────────────────────────────
app.get('/health', (req, res) => {
    res.json({
        status: isReady ? 'ready' : 'not_ready',
        qr_pending: !!currentQR
    });
});

// ─────────────────────────────────────────────
//  Send Message Endpoint (Flask calls this)
// ─────────────────────────────────────────────
app.post('/send-message', async (req, res) => {
    const { phone, message } = req.body;

    if (!phone || !message) {
        return res.status(400).json({ success: false, error: 'phone aur message required hain' });
    }

    if (!isReady) {
        return res.status(503).json({
            success: false,
            error: 'WhatsApp ready nahi hai. /qr pe QR scan karo.'
        });
    }

    try {
        let cleanPhone = phone.replace(/\D/g, '');
        if (cleanPhone.length === 10) cleanPhone = '91' + cleanPhone;

        const sentMsg = await client.sendMessage(`${cleanPhone}@c.us`, message);

        const msgId = sentMsg?.id?.id || sentMsg?.id?._serialized || 'sent';
        console.log(`\n[AUTO-SENT] ✅ WhatsApp → +${cleanPhone}`);
        console.log(`   "${message.substring(0, 80)}..."\n`);

        res.json({ success: true, message_id: msgId });
    } catch (err) {
        console.error('[SEND ERROR]', err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// ─────────────────────────────────────────────
//  Start Server
// ─────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`\n📡 API server listening on port ${PORT}`);
    console.log(`📱 QR Scanner: /qr\n`);
});
