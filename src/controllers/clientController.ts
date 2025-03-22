import * as Consul from '../model/clientRepository';
//import  Consul  from "../model/clientRepository";

export class ClientController {
  /**
   * Devuelve el teléfono del cliente a partir del id del ticket.
   * @param ticketId - ID del ticket.
   * @returns El número de teléfono del cliente.
   */
  
  static async getPhoneByTicket(ticketId: number): Promise<string> {
    try {
      const phone = await Consul.getClientPhoneByTicket(ticketId);
      return phone;
    } catch (error) {
      console.error("ClientController - getPhoneByTicket error:", error);
      throw error;
    }
  }

  static getAllClients(req:any, res:any){

    let data= req.params;
  console.log("llegue");
    Consul.getAllClients(data, function (err:any, task: any){
      if(err){
  
        res.status(500).send(err);
      }else{
        //aqui se procesarán los datos en caso de ser necesario o se haran validaciones adicionales
       res.json(task);
      }
    })
  
  }

}

