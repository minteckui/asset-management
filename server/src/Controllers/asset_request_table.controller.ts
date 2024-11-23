import { FastifyReply, FastifyRequest } from "fastify";
import { and, eq } from "drizzle-orm";
//
import { db } from "../Config/db";
import { assetRequestTable } from "../Models/asset_request_table";
import { CreateAssetRequestInput, UpdateAssetRequestSchema } from "../Schemas/assetRequest.schema";
import { logger } from "../Utils/logger";

export const createAssetRequest = async (req: FastifyRequest, reply: FastifyReply) => {
  const { assetId, userId, comments } = req.body as CreateAssetRequestInput;

  try {
    const newRequest = await db
      .insert(assetRequestTable)
      .values({ assetId, userId, comments, status: "Pending" })
      .returning();

    reply.status(201).send(newRequest);
  } catch (error) {
    reply.status(500).send({ error: "Failed to create request" });
  }
};

export const getAllMyPendingRequests = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    // const userId = req.jwtPayload.id;
    const userId =  1;
    const requests = await db
      .select()
      .from(assetRequestTable)
      .where(and(eq(assetRequestTable.status, "Pending"), eq(assetRequestTable.userId, userId)));
    reply.send(requests);
  } catch (error) {
    reply.status(500).send({ error: "Failed to fetch requests" });
  }
};

export const getAllMyRequests = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    // const userId = req.jwtPayload.id;
    const userId =  1;
    const requests = await db.select().from(assetRequestTable).where(eq(assetRequestTable.userId, userId));
    reply.send(requests);
  } catch (error) {
    reply.status(500).send({ error: "Failed to fetch requests" });
  }
};

export const getAllAssetRequests = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const requests = await db.select().from(assetRequestTable);
    reply.send(requests);
  } catch (error) {
    reply.status(500).send({ error: "Failed to fetch requests" });
  }
};

export const updateAssetRequestStatus = async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as { id: string };
  const { adminId, status, comments } = req.body as UpdateAssetRequestSchema;

  try {
    const updatedRequest = await db
      .update(assetRequestTable)
      .set({ adminId, status, comments, updatedAt: new Date() })
      .where(eq(assetRequestTable.id, parseInt(id)))
      .returning();

    if (!updatedRequest.length) {
      return reply.status(404).send({ message: "Request not found" });
    }

    reply.status(200).send(updatedRequest);
  } catch (error) {
    console.error(error)
    reply.status(500).send({ error: "Failed to update request status" });
  }
};
