const functions = require('firebase-functions');
const fetch = require('node-fetch');

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const MASTER_CODE = 'lowlow8777';

exports.sendCode = functions.https.onRequest(async (req, res) => {
  // CORS Headers
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  // Handle OPTIONS
  if (req.method === 'OPTIONS') {
    res.status(200).send('OK');
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { email } = req.body;

  // Validierung
  if (!email || !email.includes('@')) {
    res.status(400).json({ error: 'Invalid email' });
    return;
  }

  if (!RESEND_API_KEY) {
    console.error('RESEND_API_KEY not configured');
    res.status(500).json({ error: 'API key not configured' });
    return;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'lowlow@hello.lowlow.de',
        to: email,
        subject: '🍵 lowlow Access Code',
        html: `
          <div style="font-family: 'Poppins', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <h2 style="color: #0A0E27; margin-bottom: 20px;">Willkommen bei lowlow! 🌿</h2>

            <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
              Du hast Zugang zur exklusiven lowlow Kombucha Pitch-Präsentation angefordert. Hier ist dein persönlicher Access Code:
            </p>

            <div style="background: linear-gradient(135deg, #00D9FF 0%, #FF6B35 100%); padding: 40px; border-radius: 8px; text-align: center; margin: 30px 0;">
              <p style="color: white; font-size: 12px; margin: 0 0 10px 0; opacity: 0.9;">DEIN CODE</p>
              <h1 style="color: white; font-size: 48px; letter-spacing: 3px; margin: 0; font-weight: 900;">${MASTER_CODE}</h1>
            </div>

            <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Gib diesen Code auf der Website ein, um zur vollständigen Präsentation zu gelangen. Der Code ist exklusiv für dich.
            </p>

            <p style="color: #999; font-size: 14px; margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px;">
              lowlow Kombucha GmbH<br>
              <a href="https://raise.wine/lowlow" style="color: #00D9FF; text-decoration: none;">raise.wine/lowlow</a>
            </p>
          </div>
        `
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Resend error:', error);
      res.status(500).json({ error: 'Failed to send email' });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Code sent successfully'
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});
