import { error } from 'console';
import poolPromise from '../config/db';

/**
 * Obtiene el teléfono del cliente a partir del id del ticket.
 * Se asume que la tabla "tickets" tiene la columna id_cliente que referencia a la tabla "clientes_potenciales".
 * @param ticketId - ID del ticket.
 * @returns El número de teléfono del cliente o null si no se encuentra.
 */
export async function getClientPhoneByTicket(ticketId: number): Promise<string | null> {
  try {
    const [rows]: any = await poolPromise.query(
      `SELECT cp.telefono 
       FROM tickets t
       INNER JOIN clientes_potenciales cp ON t.id_cliente = cp.id_cliente 
       WHERE t.id_ticket = ?`,
      [ticketId]
    );
    if (rows.length === 0) {
      return null; // Retorna null en lugar de lanzar un error
    }
    return rows[0].telefono;
  } catch (error) {
    console.error("Error obteniendo teléfono por ticket:", error);
    throw error;
  }
}
export function getAllClients(data:any, result:any){
  poolPromise.getConnection(function (err:any, connection:any){
    if(err){
      console.log("error obteniendo una conexión", err);
      result(err);
    }else{
      connection.query("SELECT * FROM clientes_potenciales",[], function(error:any, res:any){
       if(error){
        console.log("error en la consulta ", error);
        result(error);
       }else{
        connection.release();
        result(null, res);
       }
      })
    }
  })
}
