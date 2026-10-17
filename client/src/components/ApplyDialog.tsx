import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/**
 * The application form, as an overlay.
 *
 * The questions, validation and storage all live in Typeform - this
 * component only frames it. The previous hand-rolled form posted to
 * `/api/applications`; that route and its table still exist server-side
 * but nothing in the client calls them any more.
 *
 * It used to sit embedded in the Apply section, which meant every visit to
 * the home page paid for a third-party iframe whether or not anyone
 * intended to apply. Mounting it behind a dialog makes that cost opt-in:
 * Radix only renders the portal while open, so the iframe is created on
 * the first open and torn down on close.
 *
 * NOTE ON DELIVERY: where a completed response is emailed is a Typeform
 * account setting, not something this code can set. It is configured on
 * the form itself under Connect -> Notifications -> Self notifications.
 * Changing the address here does nothing.
 */
const TYPEFORM_ID = "YhLztiSK";
export const TYPEFORM_URL = `https://h9o6fjobcym.typeform.com/to/${TYPEFORM_ID}`;

type ApplyDialogValue = { openApply: () => void };

const ApplyDialogContext = createContext<ApplyDialogValue | null>(null);

export function useApplyDialog(): ApplyDialogValue {
  const ctx = useContext(ApplyDialogContext);
  if (!ctx) {
    throw new Error("useApplyDialog must be used within <ApplyDialogProvider>");
  }
  return ctx;
}

export function ApplyDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openApply = useCallback(() => setOpen(true), []);
  const value = useMemo(() => ({ openApply }), [openApply]);

  return (
    <ApplyDialogContext.Provider value={value}>
      {children}

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay
            className="fixed inset-0 z-[100] backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
            style={{ background: "rgba(0, 0, 0, 0.74)" }}
          />
          <Dialog.Content
            // The form is the description; there is no separate blurb for
            // Radix to point aria-describedby at.
            aria-describedby={undefined}
            className="fixed left-1/2 top-1/2 z-[101] flex max-h-[calc(100dvh-2rem)] w-[min(900px,calc(100vw-1.5rem))] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-sm border data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            style={{ borderColor: "var(--pf-line-2)", background: "var(--pf-bg)" }}
          >
            <div
              className="flex shrink-0 items-center justify-between border-b px-5 py-3.5"
              style={{ borderColor: "var(--pf-line)" }}
            >
              <Dialog.Title
                className="pf-mono text-[11px] uppercase tracking-[0.24em]"
                style={{ color: "var(--pf-muted)" }}
              >
                Send a deck
              </Dialog.Title>
              <Dialog.Close
                aria-label="Close"
                className="inline-flex h-9 w-9 items-center justify-center rounded-sm transition-colors hover:bg-[rgba(245,245,245,0.08)]"
                style={{ color: "var(--pf-muted)" }}
              >
                <X size={17} />
              </Dialog.Close>
            </div>

            {/* A plain iframe rather than Typeform's embed SDK: the SDK is
                another third-party script on the critical path, and the
                form needs none of what it adds here. */}
            <iframe
              src={TYPEFORM_URL}
              title="PraFounds application form"
              allow="camera; microphone; autoplay; encrypted-media;"
              className="block h-[72dvh] min-h-[420px] w-full flex-1 border-0"
            />

            {/* If the iframe is blocked - strict privacy settings, an
                extension, an old browser - the form is still reachable. */}
            <div
              className="shrink-0 border-t px-5 py-3"
              style={{ borderColor: "var(--pf-line)" }}
            >
              <p
                className="pf-mono text-[10px] uppercase tracking-[0.1em]"
                style={{ color: "var(--pf-dim)" }}
              >
                Form not loading?{" "}
                <a
                  href={TYPEFORM_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline underline-offset-2"
                  style={{ color: "var(--pf-text)" }}
                >
                  Open it in a new tab →
                </a>
              </p>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </ApplyDialogContext.Provider>
  );
}
