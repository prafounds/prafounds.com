import { db } from "./db";
import {
  subscribers,
  applications,
  type InsertSubscriber,
  type Subscriber,
  type InsertApplication,
  type Application,
} from "@shared/schema";

/**
 * Raised when DATABASE_URL isn't configured, so `db` is null. Previously
 * every write dereferenced a null `db` and surfaced as a blank 500 — the
 * route can now answer with a 503 and a "email us instead" fallback,
 * which matters a great deal more for a founder's application than for a
 * newsletter signup.
 */
export class StorageUnavailableError extends Error {
  constructor() {
    super("Storage is not configured");
    this.name = "StorageUnavailableError";
  }
}

function requireDb() {
  if (!db) throw new StorageUnavailableError();
  return db;
}

export interface IStorage {
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
  createApplication(application: InsertApplication): Promise<Application>;
}

export class DatabaseStorage implements IStorage {
  async createSubscriber(insertSubscriber: InsertSubscriber): Promise<Subscriber> {
    const [subscriber] = await requireDb()
      .insert(subscribers)
      .values(insertSubscriber)
      .returning();
    return subscriber;
  }

  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const [application] = await requireDb()
      .insert(applications)
      .values(insertApplication)
      .returning();
    return application;
  }
}

export const storage = new DatabaseStorage();
