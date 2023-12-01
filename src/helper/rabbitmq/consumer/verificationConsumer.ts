import dotenv from 'dotenv';
dotenv.config();

import client from 'amqplib'
import nodemailer from 'nodemailer';
import { rabbitmqConfig } from '../../../config/rabbitmqConfig';

const startVerificationConsumer = async () => {
  const connection = await client.connect(`amqp://${rabbitmqConfig.username}:${rabbitmqConfig.password}@${rabbitmqConfig.host}:${rabbitmqConfig.port}`)
  const channel = await connection.createChannel();
  const queue = 'verification_queue';

  await channel.assertQueue(queue, { durable: false });

  console.log('Verification Consumer is waiting for messages. To exit press CTRL+C');

  channel.consume(queue, async (msg) => {
    if (msg !== null) {
      const message = JSON.parse(msg.content.toString());
      
      await sendVerificationEmail(message.email, message.verificationCode);

      console.log(`Email verification sent to ${message.email} with code ${message.verificationCode}`);

      channel.ack(msg);
    }
  });
};

const sendVerificationEmail = async (email: string, verificationCode: string) => {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "091f1b7148aa29",
      pass: "8d247066007d11"
    }
  });

  const mailOptions = {
    from: 'juanvaleriand96@gmail.com',
    to: email,
    subject: 'Email Verification',
    text: `Your verification code is: ${verificationCode}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

startVerificationConsumer();
