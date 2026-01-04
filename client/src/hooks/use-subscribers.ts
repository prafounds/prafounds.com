import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertSubscriber } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useCreateSubscriber() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertSubscriber) => {
      const res = await fetch(api.subscribers.create.path, {
        method: api.subscribers.create.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        // Handle specific error codes if needed, using the shared schema if possible
        if (res.status === 400) {
          const errorData = await res.json();
          // Try to parse with the validation error schema
          const validationError = api.subscribers.create.responses[400].safeParse(errorData);
          if (validationError.success) {
            throw new Error(validationError.data.message);
          }
          throw new Error("Invalid request");
        }
        throw new Error('Failed to subscribe');
      }

      return api.subscribers.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Subscribed",
        description: "Thank you for your interest in PraFounds.",
      });
      // Invalidate any relevant queries if we had a list of subscribers
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
