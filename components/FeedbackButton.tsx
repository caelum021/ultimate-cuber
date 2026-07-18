"use client";

import { useState } from "react";
import { useT } from "@/components/SettingsProvider";

const FEEDBACK_EMAIL = "caelum0to1@gmail.com";

export function FeedbackButton() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const send = () => {
    const body = text.trim();
    if (!body) return;
    const url = `mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent(
      "Ultimate Cuber feedback",
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
    setOpen(false);
    setText("");
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-accent text-accent-fg px-4 py-2.5 text-sm font-semibold shadow-lg hover:brightness-110 transition"
        aria-label={t.home.feedbackBtn}
      >
        <span aria-hidden>💬</span>
        {t.home.feedbackBtn}
      </button>

      {/* Popup */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-border bg-card p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold tracking-tight">{t.home.feedbackTitle}</h2>
            <p className="mt-1 text-sm text-muted">{t.home.feedbackDesc}</p>
            <textarea
              autoFocus
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t.home.feedbackPlaceholder}
              rows={5}
              className="mt-3 w-full rounded-lg border border-border bg-background p-3 text-sm outline-none focus:border-accent resize-none"
            />
            <div className="mt-3 flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="rounded-full px-4 py-1.5 text-sm text-muted hover:text-foreground transition"
              >
                {t.home.feedbackCancel}
              </button>
              <button
                onClick={send}
                disabled={!text.trim()}
                className="rounded-full bg-accent text-accent-fg px-5 py-1.5 text-sm font-semibold hover:brightness-110 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {t.home.feedbackSend}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
