import { FastifyInstance } from "fastify";
import { CreateProductController } from "../controllers/create-product-controller";
import { ensureIfPartnerIsAuthenticated } from "../middlewares/ensure-if-partner-is-authenticated";

export async function productRoutes(app: FastifyInstance) {
  const createProductController = new CreateProductController();

  app.post('/api/v1/products', {
    preHandler: ensureIfPartnerIsAuthenticated,
  }, 
    createProductController.handle)
  ;
}