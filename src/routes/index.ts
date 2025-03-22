import { Router } from "express";
import { ClientController } from "../controllers/clientController";

const router = Router();

router.get('/crm/clients-get-all', ClientController.getAllClients);

export default router;