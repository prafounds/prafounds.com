import { useMutation } from "@tanstack/react-query";
import { api, type InsertApplication } from "@shared/routes";

export interface ApplicationError extends Error {
  /** Which field failed server-side validation, if any. */
  field?: string;
  /** Present on 503: an address the founder can use instead. */
  fallbackEmail?: string;
}

/**
 * Submits a founder application. Server-side validation errors are
 * surfaced with their field so the form can point at the offending input
 * rather than showing a generic failure.
 */
export function useSubmitApplication() {
  return useMutation<{ id: number; companyName: string }, ApplicationError, InsertApplication>({
    mutationFn: async (data) => {
      const res = await fetch(api.applications.create.path, {
        method: api.applications.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const err = new Error(
          body.message || "Something went wrong. Please try again.",
        ) as ApplicationError;
        err.field = body.field;
        err.fallbackEmail = body.fallbackEmail;
        throw err;
      }

      return api.applications.create.responses[201].parse(await res.json());
    },
  });
}
