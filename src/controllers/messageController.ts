import * as messageRepo from '../model/messageRepository';

export class MessageController {
  /**
   * Registra un mensaje en la base de datos.
   * @param conversationId - ID de la conversación.
   * @param mensajeUsuario - Mensaje enviado por el usuario.
   * @param respuesta - Respuesta que se quiere almacenar.
   * @param idUsuario - ID del usuario (para este ejemplo, se usará el 7).
   * @returns El ID del mensaje insertado.
   */
  static async recordMessage(
    conversationId: number = 43,
    mensajeUsuario: string,
    respuesta: string,
    idUsuario: number = 7
  ): Promise<number> {
    try {
      const insertId = await messageRepo.addMessage(conversationId, mensajeUsuario, respuesta, idUsuario);
      return insertId;
    } catch (error) {
      console.error("MessageController - recordMessage error:", error);
      throw error;
    }
  }

  /**
   * Obtiene los mensajes de una conversación.
   * @param conversationId - ID de la conversación.
   * @param limit - Cantidad máxima de mensajes a obtener.
   * @returns Lista de mensajes.
   */
  static async getMessages(conversationId: number, limit: number = 10): Promise<any[]> {
    try {
      const messages = await messageRepo.getMessagesByConversation(conversationId, limit);
      return messages;
    } catch (error) {
      console.error("MessageController - getMessages error:", error);
      throw error;
    }
  }
}
