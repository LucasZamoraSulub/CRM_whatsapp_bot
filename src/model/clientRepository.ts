import poolPromise from '../config/db';

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
