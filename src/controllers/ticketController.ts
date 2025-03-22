import { getTicketData } from '../model/ticketRepository';

export class TicketController {
  /**
   * Devuelve los datos completos del ticket a partir del id_ticket.
   * @param ticketId - El id del ticket.
   * @returns Un objeto con los datos del ticket.
   */
  static async getTicketDetails(ticketId: number): Promise<any> {
    try {
      const ticketData = await getTicketData(ticketId);
      return ticketData;
    } catch (error) {
      console.error("TicketController - getTicketDetails error:", error);
      throw error;
    }
  }
}
