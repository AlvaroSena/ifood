import { FastifyInstance } from "fastify";
import { customerRoutes } from "./customer.routes";
import { merchantRoutes } from "./merchant.routes";
import { partnerRoutes } from "./partner.routes";

export async function routes(app: FastifyInstance) {
  app.register(partnerRoutes);
  app.register(merchantRoutes);
  app.register(customerRoutes);
} 