import { Router, Request, Response, NextFunction } from 'express';
import { TicketController } from '../controllers/ticketController';

const router = Router();

router.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { ticketId } = req.body;
    if (!ticketId) {
      res.status(400).json({ error: 'Se requiere ticketId' });
      return;
    }
    try {
      const ticketData = await TicketController.getTicketDetails(ticketId);
      console.log(`Ticket recibido: ${ticketId}`, ticketData);
      
      // Simulación de notificación personalizada:
      const notificationMessage = `Nuevo ticket generado con el id ${ticketId} para el cliente con teléfono ${ticketData.client_phone}`;
      // Aquí podrías integrar alguna lógica adicional (por ejemplo, enviar un correo o notificar en una interfaz)
      console.log(notificationMessage);
      
      res.json({ success: true, message: notificationMessage, ticket: ticketData });
    } catch (error) {
      next(error);
    }
  });  

export default router;
