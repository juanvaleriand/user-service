import client, {Channel, Connection} from 'amqplib'
import { rabbitmqConfig } from '../../../config/rabbitmqConfig';

export const publishToQueue = async (email: string, verificationCode: string) => {
    let connection: Connection;
    try {
      connection = await client.connect(`amqp://${rabbitmqConfig.username}:${rabbitmqConfig.password}@${rabbitmqConfig.host}:${rabbitmqConfig.port}`)
  
      // Create a channel
      const channel: Channel = await connection.createChannel()
      const queue = 'verification_queue';
  
      await channel.assertQueue(queue, { durable: false });
  
      const message = { email, verificationCode };
  
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
   
      console.log(`Email verification sent to ${email} with code ${verificationCode}`);
    } catch (error) {
      console.error('Error sending verification email to RabbitMQ:', error);
    } finally {
        
    }
};