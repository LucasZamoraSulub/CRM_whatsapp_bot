import { Router, Request, Response, NextFunction } from 'express';
import { sendMessage, getTextMessageInput } from '../services/messageHelper';
import { ClientController } from '../controllers/clientController';
import { MessageController } from '../controllers/messageController';

const router = Router();

// Para pruebas, usamos conversationId = 43
const conversationId = 44;

router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { message } = req.body;

  if (!message) {
    res.status(400).json({ error: 'Se requiere el campo message' });
    return;
  }

  try {
    // Obtener el número del cliente a partir del id de conversación (43 en este caso)
    const recipient = await ClientController.getPhoneByConversation(conversationId);
    console.log(`Número obtenido para enviar el mensaje: ${recipient}`);

    // Construir el payload para la API de WhatsApp usando el número obtenido
    const payload = getTextMessageInput(recipient, message);
    const responseData = await sendMessage(payload);

    // Registrar el mensaje en la base de datos usando el id de conversación 43 y un id_usuario de prueba (por ejemplo, 7)
    await MessageController.recordMessage(conversationId, message, JSON.stringify(responseData), 7);

    res.json({ success: true, conversationId, recipient, response: responseData });
  } catch (error) {
    next(error);
  }
});

export default router;
