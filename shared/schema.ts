import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: text("created_at").notNull().default("now()"),
});

export const insertSubscriberSchema = createInsertSchema(subscribers)
  .pick({ email: true })
  // `email` is a plain text column, so the generated schema is a bare
  // z.string() that happily accepts "not-an-email". Constrain it here.
  .extend({ email: z.string().trim().email("Enter a valid email address") });

export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
export type Subscriber = typeof subscribers.$inferSelect;

/* ── Founder applications ─────────────────────────────────────────── */

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),

  // Founder
  founderName: text("founder_name").notNull(),
  email: text("email").notNull(),
  role: text("role"),
  linkedin: text("linkedin"),

  // Company
  companyName: text("company_name").notNull(),
  website: text("website"),
  oneLiner: text("one_liner").notNull(),
  sector: text("sector").notNull(),
  location: text("location"),
  teamSize: text("team_size"),

  // Round
  stage: text("stage").notNull(),
  raising: text("raising"),
  traction: text("traction"),
  deckLink: text("deck_link"),
  heardVia: text("heard_via"),
  notes: text("notes"),

  createdAt: text("created_at").notNull().default("now()"),
});

/** Must match the four shelves on the thesis section. */
export const SECTORS = [
  "Developer tools",
  "Applied AI",
  "Infrastructure",
  "Trust & data",
  "Other",
] as const;

export const STAGES = ["Pre-seed", "Seed", "Pre-product", "Other"] as const;

/**
 * A URL field that accepts what founders actually type — "acme.io" as
 * often as "https://acme.io" — rather than rejecting the bare domain.
 * Empty string is treated as "not provided".
 */
const looseUrl = (message: string) =>
  z
    .string()
    .trim()
    .max(400)
    .optional()
    .transform((v) => (v ? v : undefined))
    .refine(
      (v) => v === undefined || /^((https?:\/\/)?[\w-]+(\.[\w-]+)+(\/\S*)?)$/i.test(v),
      { message },
    );

export const insertApplicationSchema = z.object({
  founderName: z
    .string({ required_error: "Tell us your name" })
    .trim().min(2, "Tell us your name").max(120),
  email: z
    .string({ required_error: "We need an email to reply to" })
    .trim().email("Enter a valid email address").max(200),
  role: z.string().trim().max(120).optional(),
  linkedin: looseUrl("Enter a valid LinkedIn URL"),

  companyName: z
    .string({ required_error: "What is the company called?" })
    .trim().min(1, "What is the company called?").max(160),
  website: looseUrl("Enter a valid website, e.g. acme.io"),
  oneLiner: z
    .string({ required_error: "A sentence, please — what do you do?" })
    .trim()
    .min(10, "A sentence, please — what do you do?")
    .max(220, "Keep it to one sentence (220 characters)"),
  sector: z.enum(SECTORS, { errorMap: () => ({ message: "Pick a sector" }) }),
  location: z.string().trim().max(120).optional(),
  teamSize: z.string().trim().max(40).optional(),

  stage: z.enum(STAGES, { errorMap: () => ({ message: "Pick a stage" }) }),
  raising: z.string().trim().max(80).optional(),
  traction: z.string().trim().max(600).optional(),
  deckLink: looseUrl("Enter a valid link to your deck"),
  heardVia: z.string().trim().max(160).optional(),
  notes: z.string().trim().max(1500).optional(),
});

export type InsertApplication = z.infer<typeof insertApplicationSchema>;
export type Application = typeof applications.$inferSelect;
