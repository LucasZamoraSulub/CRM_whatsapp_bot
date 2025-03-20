import poolPromise from '../config/db';

/**
 * Almacena un mensaje en la tabla "mensajes".
 * @param conversationId - ID de la conversación.
 * @param mensajeUsuario - El mensaje enviado por el usuario.
 * @param respuesta - La respuesta recibida (por ejemplo, la respuesta de la API de WhatsApp).
 * @param idUsuario - ID del usuario (en este ejemplo, usaremos el valor 7 para pruebas).
 * @returns El ID insertado en la tabla.
 */
export async function addMessage(
  conversationId: number,
  mensajeUsuario: string,
  respuesta: string,
  idUsuario: number
): Promise<number> {
  try {
    const [result]: any = await poolPromise.query(
      `INSERT INTO mensajes 
      (id_conversacion, mensaje_usuario, respuesta, id_usuario, fecha_envio, fecha_respuesta)
      VALUES (?, ?, ?, ?, NOW(), NOW())`,
      [conversationId, mensajeUsuario, respuesta, idUsuario]
    );
    // result.insertId contiene el ID de la fila insertada
    return result.insertId;
  } catch (error) {
    console.error("Error inserting message:", error);
    throw error;
  }
}

/**
 * Obtiene los mensajes de una conversación.
 * @param conversationId - ID de la conversación.
 * @param limit - Número máximo de mensajes a obtener.
 * @returns Lista de mensajes.
 */
export async function getMessagesByConversation(conversationId: number, limit: number = 10): Promise<any[]> {
  try {
    const [rows]: any = await poolPromise.query(
      `SELECT * FROM mensajes WHERE id_conversacion = ? ORDER BY fecha_envio DESC LIMIT ?`,
      [conversationId, limit]
    );
    return rows;
  } catch (error) {
    console.error("Error retrieving messages:", error);
    throw error;
  }
}

/**
 * Obtiene el teléfono del cliente a partir del id de la conversación.
 * Se asume que la tabla "conversacion" tiene la columna id_cliente que referencia a la tabla "clientes_potenciales".
 * @param conversationId - ID de la conversación.
 * @returns El número de teléfono del cliente.
 */
export async function getClientPhoneByConversation(conversationId: number): Promise<string> {
  try {
    const [rows]: any = await poolPromise.query(
      `SELECT cp.telefono 
       FROM conversacion c 
       INNER JOIN clientes_potenciales cp ON c.id_cliente = cp.id_cliente 
       WHERE c.id_conversacion = ?`,
      [conversationId]
    );
    if (rows.length === 0) {
      throw new Error("No se encontró el teléfono para la conversación especificada.");
    }
    return rows[0].telefono;
  } catch (error) {
    console.error("Error obteniendo teléfono por conversación:", error);
    throw error;
  }
}