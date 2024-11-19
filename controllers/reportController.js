const nodemailer = require('nodemailer');

exports.makeReport = async (req, res) => {
  try {
    const { name, email, phoneNumber, description, category, latitude, longtitude } = req.body;

    if (!req.file) {
      return res.status(400).json('No file uploaded');
    }

    const { buffer: fileBuffer, originalname: fileName, mimetype } = req.file;

    //EMAIL MESSAGE
    const message = `Category: ${category},\n
    Description${description}\n
    lat:${latitude}\n
    long:${longtitude}\n

    Sender details:\n
    Name: ${name},\n
    Email: ${email},\n
    Phone Number:${phoneNumber}
    `;

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_NAME,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // Email options
    const mailOptions = {
      from: 'CITIZEN FEEDBACK SYSTEM',
      to: 'nightfierce@gmail.com',
      subject: 'Report from Citizen',
      text: message,
      attachments: [
        {
          filename: fileName, // Original file name
          content: fileBuffer, // File Buffer
          contentType: mimetype, // MIME type from multer
        },
      ],
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);

    res.status(200).json('Report Sent');
  } catch (error) {
    console.log(error);
    res.status(500).json('Error');
  }
};
