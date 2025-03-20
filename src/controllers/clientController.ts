import { getClientPhoneByConversation } from '../model/clientRepository';

export class ClientController {
  /**
   * Devuelve el teléfono del cliente a partir del id de la conversación.
   * @param conversationId - ID de la conversación.
   * @returns El número de teléfono del cliente.
   */
  static async getPhoneByConversation(conversationId: number): Promise<string> {
    try {
      const phone = await getClientPhoneByConversation(conversationId);
      return phone;
    } catch (error) {
      console.error("ClientController - getPhoneByConversation error:", error);
      throw error;
    }
  }
}
