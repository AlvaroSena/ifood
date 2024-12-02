import { FastifyInstance } from "fastify";
import { CreatePartnerController } from "./controllers/create-partner-controller";
import { SendPartnerEmailConfirmationController } from "./controllers/send-partner-email-confirmation-controller";
import { ConfirmPartnerEmailController } from "./controllers/confirm-partner-email-controller";

export async function routes(app: FastifyInstance) {
  const createPartnerController = new CreatePartnerController();
  const sendPartnerEmailConfirmationController = new SendPartnerEmailConfirmationController();
  const confirmPartnerEmailController = new ConfirmPartnerEmailController();

  app.post('/api/v1/partners', createPartnerController.handle);
  app.post('/api/v1/partners/send-confirmation', sendPartnerEmailConfirmationController.handle);
  app.post('/api/v1/partners/email-confirmation', confirmPartnerEmailController.handle);
} 