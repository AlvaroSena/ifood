import { FastifyInstance } from "fastify";
import { CreatePartnerController } from "./controllers/create-partner-controller";
import { SendPartnerEmailConfirmationController } from "./controllers/send-partner-email-confirmation-controller";
import { ConfirmPartnerEmailController } from "./controllers/confirm-partner-email-controller";
import { GetPartnerController } from "./controllers/get-partner-controller";
import { GetAllPartnersController } from "./controllers/get-all-partners-controller";
import { AuthenticatePartnerWithPasswordController } from "./controllers/authenticate-partner-with-password-controller";
import { ensureIfPartnerIsAuthenticated } from "./middlewares/ensure-if-partner-is-authenticated";
import { CreateMerchantController } from "./controllers/create-merchant-controller";
import { SendPartnerMagicLinkController } from "./controllers/send-partner-magic-link-controller";
import { AuthenticatePartnerWithMagicLinkController } from "./controllers/authenticate-partner-with-magic-link-controller";
import { CreateCustomerController } from "./controllers/create-customer-controller";
import { AuthenticateCustomerWithPasswordController } from "./controllers/authenticate-customer-with-password-controller";

export async function routes(app: FastifyInstance) {
  const createPartnerController = new CreatePartnerController();
  const sendPartnerEmailConfirmationController = new SendPartnerEmailConfirmationController();
  const confirmPartnerEmailController = new ConfirmPartnerEmailController();
  const getPartnerController = new GetPartnerController();
  const getAllPartnersController = new GetAllPartnersController();
  const authenticatePartnerWithPasswordController = new AuthenticatePartnerWithPasswordController();
  const sendPartnerMagicLinkController = new SendPartnerMagicLinkController();
  const authenticatePartnerWithMagicLinkController = new AuthenticatePartnerWithMagicLinkController();

  const createMerchantController = new CreateMerchantController();

  const createCustomerController = new CreateCustomerController();
  const authenticateCustomerWithPasswordController = new AuthenticateCustomerWithPasswordController();

  app.post('/api/v1/partners', createPartnerController.handle);
  app.post('/api/v1/partners/send-confirmation', sendPartnerEmailConfirmationController.handle);
  app.post('/api/v1/partners/email-confirmation', confirmPartnerEmailController.handle);
  app.get('/api/v1/partners/:partnerId', getPartnerController.handle);
  app.get('/api/v1/partners', {
    preHandler: ensureIfPartnerIsAuthenticated,
  }, 
    getAllPartnersController.handle
  );
  app.post('/api/v1/partners/sessions', authenticatePartnerWithPasswordController.handle);
  app.post('/api/v1/partners/send-magic-link', sendPartnerMagicLinkController.handle);
  app.get('/api/v1/partners/sessions/magic-link', authenticatePartnerWithMagicLinkController.handle);

  app.post('/api/v1/merchants', {
    preHandler: ensureIfPartnerIsAuthenticated,
  }, 
    createMerchantController.handle
  );

  app.post('/api/v1/customers', createCustomerController.handle);
  app.post('/api/v1/customers/sessions', authenticateCustomerWithPasswordController.handle);
} 