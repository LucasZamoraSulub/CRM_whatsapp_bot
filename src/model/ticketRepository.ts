import poolPromise from '../config/db';

/**
 * Obtiene los datos del ticket a partir del id_ticket.
 * Se espera que la tabla tickets tenga las columnas necesarias: id_ticket, id_conversacion, id_cliente, id_usuario, id_apartamento, etc.
 * @param ticketId - El id del ticket.
 * @returns Un objeto con los datos del ticket.
 */
export async function getTicketData(ticketId: number): Promise<any> {

  return new Promise(async (resolve,reject)=>{
   poolPromise.getConnection(function (err:any, connection:any){
       if(err){
         console.log("error obteniendo una conexión", err);
         reject(err);
       }else{
         connection.query("SELECT t.id_ticket, t.id_conversacion, t.id_cliente, t.id_usuario, t.id_apartamento, cp.telefono as client_phone FROM tickets t INNER JOIN clientes_potenciales cp ON t.id_cliente = cp.id_cliente WHERE t.id_ticket = ?",[ticketId], function(error:any, res:any){
          if(error){
           console.log("error en la consulta ", error);
           reject(err);
          }else{
           connection.release();
           if (res.length === 0) {
            //throw new Error("No se encontró ticket con el id especificado.");
            console.log("no se encontro data");
            reject(res);
          }else{
            console.log("res", res)
            resolve(res)
          }
          
          }
         })
       }
     })
    })

}
