const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
    // Enable CORS for your React app
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Twilio credentials from environment variables for security
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

const client = new twilio(accountSid, authToken);

// SOS endpoint
app.post('/send-sos', (req, res) => {
    const { contact, latitude, longitude } = req.body;

    if (!contact || !latitude || !longitude) {
        return res.status(400).json({ success: false, message: 'Missing required data.' });
    }

    const mapUrl = `http://maps.google.com/maps?q=${latitude},${longitude}`;
    const messageBody = `🚨 EMERGENCY! I need help. My current location is: ${mapUrl}`;

    client.messages
        .create({
            body: messageBody,
            to: contact,
            from: twilioNumber,
        })
        .then(message => {
            console.log(`Message sent with SID: ${message.sid}`);
            res.status(200).json({ success: true, message: 'SMS sent successfully.' });
        })
        .catch(error => {
            console.error('Twilio Error:', error);
            res.status(500).json({ success: false, message: 'Failed to send SMS.' });
        });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});