import { FastifyInstance } from "fastify";
import { CreateMerchantController } from "../controllers/create-merchant-controller";
import { ensureIfPartnerIsAuthenticated } from "../middlewares/ensure-if-partner-is-authenticated";

export async function merchantRoutes(app: FastifyInstance) {
  const createMerchantController = new CreateMerchantController();

  app.post('/api/v1/merchants', {
    preHandler: ensureIfPartnerIsAuthenticated,
  }, 
    createMerchantController.handle
  );
}