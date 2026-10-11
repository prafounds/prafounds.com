import type { Express } from "express";
import type { Server } from "http";
import { storage, StorageUnavailableError } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

/** Shown to a founder when we can't persist their application. */
const FALLBACK_EMAIL = "hello@prafounds.com";

function zodMessage(err: z.ZodError) {
  const first = err.errors[0];
  return { message: first.message, field: first.path.join(".") };
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post(api.subscribers.create.path, async (req, res) => {
    try {
      const input = api.subscribers.create.input.parse(req.body);
      const subscriber = await storage.createSubscriber(input);
      res.status(201).json(subscriber);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json(zodMessage(err));
      if (err instanceof StorageUnavailableError) {
        return res.status(503).json({ message: "Signups are temporarily unavailable." });
      }
      console.error("[subscribers] ", err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.applications.create.path, async (req, res) => {
    let input;
    try {
      input = api.applications.create.input.parse(req.body);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json(zodMessage(err));
      throw err;
    }

    try {
      const application = await storage.createApplication(input);
      console.log(
        `[applications] ${application.companyName} — ${application.sector} / ${application.stage} (${application.email})`,
      );
      res.status(201).json({ id: application.id, companyName: application.companyName });
    } catch (err) {
      if (err instanceof StorageUnavailableError) {
        // Never drop a founder's pitch silently: record it server-side and
        // hand back an address they can reach a human at.
        console.warn(
          "[applications] DATABASE_URL not set — application NOT persisted:\n" +
            JSON.stringify(input, null, 2),
        );
        return res.status(503).json({
          message:
            "We couldn't save your application just now. Please email it to us directly — we read every one.",
          fallbackEmail: FALLBACK_EMAIL,
        });
      }
      console.error("[applications] ", err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
