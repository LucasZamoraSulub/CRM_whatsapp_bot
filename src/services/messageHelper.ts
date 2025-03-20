import axios from 'axios';
import { config } from '../config/config';

export const sendMessage = async (data: any): Promise<any> => {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/${config.version}/${config.phoneNumberId}/messages`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${config.accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error al enviar mensaje:', error);
    throw error;
  }
};

export const getTextMessageInput = (recipient: string, text: string): any => {
  return {
    messaging_product: "whatsapp",
    preview_url: false,
    recipient_type: "individual",
    to: recipient,
    type: "text",
    text: { body: text },
  };
};
