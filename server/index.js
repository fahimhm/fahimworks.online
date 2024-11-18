const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');

const app = express();

// connect mongodb
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB is not connected', err));

// middleware
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));

app.use(cors({
  credentials: true,
  origin: process.env.ORIGIN
}));
// nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

// endpoint for sending email
app.post('/send-email', (req, res) => {
  const { name, email, budget, message } = req.body;
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nBudget: ${budget}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.json({ error: error.message });
    } else {
      res.json({ success: 'Your message has been sent successfully!' });
    }
  });
});

app.use('/', require('./routes/authRoutes'));

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));