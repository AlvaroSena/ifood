import { FastifyInstance } from "fastify";
import { CreateGroupController } from "../controllers/create-group-controller";
import { ensureIfPartnerIsAuthenticated } from "../middlewares/ensure-if-partner-is-authenticated";

export async function groupRoutes(app: FastifyInstance) {
  const createGroupController = new CreateGroupController();

  app.post('/api/v1/groups', {
    preHandler: ensureIfPartnerIsAuthenticated,
  },
    createGroupController.handle
  );
}