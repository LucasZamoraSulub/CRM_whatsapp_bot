import { Router, Request, Response, NextFunction } from 'express';
import { sendMessage, getTextMessageInput } from '../services/messageHelper';
import { MessageController } from '../controllers/messageController';

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { number, message } = req.body;

  if (!number || !message) {
    res.status(400).json({ error: 'Se requiere number y message' });
    return;
  }

  try {
    // Obtener los detalles del ticket, que incluyen id_conversacion, id_cliente, id_usuario, etc.
    const ticketData = await TicketController.getTicketDetails(ticketId);
    console.log("el data es ", ticketData)

    for(let i=0; i < ticketData.length; i++){

    

    // Extraemos los datos necesarios
    const conversationId = ticketData[i].id_conversacion; // ID de la conversación asociada
    const recipient = ticketData[i].client_phone;          // Teléfono del cliente, obtenido desde clientes_potenciales
    const idUsuario = ticketData[i].id_usuario;             // Usuario que está atendiendo (del ticket)

    console.log(`Datos obtenidos del ticket ${ticketId}:`);
    console.log(`- id_conversacion: ${conversationId}`);
    console.log(`- Número del cliente: ${recipient}`);
    console.log(`- id_usuario: ${idUsuario}`);

    // Construir el payload para la API de WhatsApp usando el número obtenido
    const payload = getTextMessageInput(recipient, message);
    const responseData = await sendMessage(payload);
    

    // Registrar el mensaje en la base de datos usando los datos obtenidos del ticket
    await MessageController.recordMessage(conversationId, message, JSON.stringify(responseData), idUsuario);

    res.json({ success: true, ticketId, conversationId, recipient, response: responseData });
    }
  } catch (error) {
    next(error);
  }
});

export default router;


// import { Router, Request, Response, NextFunction } from 'express';
// import { sendMessage, getTextMessageInput } from '../services/messageHelper';
// import { TicketController } from '../controllers/ticketController';
// import { MessageController } from '../controllers/messageController';

// const router = Router();

// router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   const { ticketId, message } = req.body;

//   if (!ticketId || !message) {
//     res.status(400).json({ error: 'Se requiere ticketId y message' });
//     return;
//   }

//   try {
//     // Obtener los detalles del ticket, que incluyen id_conversacion, id_cliente, id_usuario, etc.
//     const ticketData = await TicketController.getTicketDetails(ticketId);
    
//     // Extraemos los datos necesarios
//     const conversationId = ticketData.id_conversacion; // ID de la conversación asociada
//     const phone = ticketData.client_phone;          // Teléfono del cliente, obtenido desde clientes_potenciales
//     const idUsuario = ticketData.id_usuario;             // Usuario que está atendiendo (del ticket)

//     console.log(`Datos obtenidos del ticket ${ticketId}:`);
//     console.log(`- id_conversacion: ${conversationId}`);
//     console.log(`- Número del cliente: ${phone}`);
//     console.log(`- id_usuario: ${idUsuario}`);

//     // Construir el payload para la API de WhatsApp usando el número obtenido
//     const payload = getTextMessageInput(phone, message);
//     const responseData = await sendMessage(payload);

//     // Registrar el mensaje en la base de datos usando los datos obtenidos del ticket
//     await MessageController.recordMessage(conversationId, message, JSON.stringify(responseData), idUsuario);

//     res.json({ success: true, ticketId, conversationId, phone, response: responseData });
//   } catch (error) {
//     next(error);
//   }
// });

// export default router;
