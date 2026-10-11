import { z } from 'zod';
import { insertSubscriberSchema, insertApplicationSchema } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
  unavailable: z.object({
    message: z.string(),
    /** Where to write instead when submissions can't be stored. */
    fallbackEmail: z.string().optional(),
  }),
};

export const api = {
  subscribers: {
    create: {
      method: 'POST' as const,
      path: '/api/subscribers',
      input: insertSubscriberSchema,
      responses: {
        201: z.object({ id: z.number(), email: z.string() }),
        400: errorSchemas.validation,
      },
    },
  },
  applications: {
    create: {
      method: 'POST' as const,
      path: '/api/applications',
      input: insertApplicationSchema,
      responses: {
        201: z.object({ id: z.number(), companyName: z.string() }),
        400: errorSchemas.validation,
        503: errorSchemas.unavailable,
      },
    },
  },
};

// Re-exported so client code can import request types from the route
// contract alongside the paths it already pulls from here.
export type { InsertSubscriber } from './schema';
export type { InsertApplication } from './schema';
export { SECTORS, STAGES } from './schema';
