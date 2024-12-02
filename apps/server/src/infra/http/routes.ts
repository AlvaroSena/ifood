import { FastifyInstance } from "fastify";
import { CreatePartnerController } from "./controllers/create-partner-controller";

export async function routes(app: FastifyInstance) {
  const createPartnerController = new CreatePartnerController();

  app.post('/api/v1/partners', createPartnerController.handle);
} 