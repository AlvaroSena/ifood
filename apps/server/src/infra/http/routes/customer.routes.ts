import { FastifyInstance } from "fastify";
import { CreateCustomerController } from "../controllers/create-customer-controller";
import { AuthenticateCustomerWithPasswordController } from "../controllers/authenticate-customer-with-password-controller";

export async function customerRoutes(app: FastifyInstance) {
  const createCustomerController = new CreateCustomerController();
  const authenticateCustomerWithPasswordController = new AuthenticateCustomerWithPasswordController();

  app.post('/api/v1/customers', createCustomerController.handle);
  app.post('/api/v1/customers/sessions', authenticateCustomerWithPasswordController.handle);
}