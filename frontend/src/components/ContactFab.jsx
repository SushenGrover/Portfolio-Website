// src/components/ContactFab.jsx
import React, { useEffect, useState } from "react";

export default function ContactFab() {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ ok: null, msg: "" });

  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  // OPTIONAL: reset state whenever modal (re)opens
  useEffect(() => {
    if (open) setStatus({ ok: null, msg: "" });
  }, [open]);

  // Submit via AJAX to Formspree JSON endpoint
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus({ ok: null, msg: "" });

    const form = e.currentTarget;
    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
      _subject: "New portfolio contact",
    };

    try {
      const res = await fetch("https://formspree.io/f/xqadaeyo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus({ ok: true, msg: "Thanks! Message sent successfully." });
        form.reset();
        // setTimeout(() => setOpen(false), 1500);
      } else {
        let errBody = null;
        try {
          errBody = await res.json();
        } catch (_) {}
        const firstMsg =
          (Array.isArray(errBody?.errors) && errBody.errors[0]?.message) ||
          errBody?.message ||
          `HTTP ${res.status}`;
        setStatus({
          ok: false,
          msg: firstMsg || "Failed to send. Please try again.",
        });
      }
    } catch (err) {
      setStatus({ ok: false, msg: "Network error. Please try again." });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Floating action button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 rounded-full bg-blue-600 hover:bg-blue-500 hover:cursor-pointer text-white shadow-xl h-14 w-14 grid place-items-center"
        aria-label="Contact me"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"
            strokeWidth="2"
          />
        </svg>
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="relative w-full max-w-lg">
            {/* Gradient ring */}
            <div
              className="pointer-events-none absolute -inset-[3px] rounded-2xl
              bg-[conic-gradient(at_10%_10%,#60a5fa_0deg,#22d3ee_140deg,#a855f7_280deg,#60a5fa_360deg)]
              opacity-90 [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)]
              [mask-composite:exclude] p-[2px]"
            />
            {/* Card */}
            <div className="relative rounded-2xl bg-[#151a21] text-white shadow-2xl border border-white/5 overflow-hidden">
              <div className="h-[3px] w-full from-blue-500 via-cyan-400 to-purple-500 opacity-80" />
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 h-9 w-9 grid place-items-center text-align-center align-middle rounded-full text-blue-300 text-2xl hover:font-bold hover:bg-white/10"
                aria-label="Close"
              >
                ×
              </button>

              {/* Form body */}
              <div className="p-6">
                <h3 className="text-2xl font-extrabold mb-4">Contact me</h3>

                {/* AJAX Formspree form */}
                <form onSubmit={handleSubmit} className="grid gap-4">
                  <label className="grid gap-1">
                    <span className="text-sm text-slate-300">Name</span>
                    <input
                      name="name"
                      required
                      className="px-3 py-2 rounded bg-white/5 border border-white/10"
                    />
                  </label>
                  <label className="grid gap-1">
                    <span className="text-sm text-slate-300">Email</span>
                    <input
                      type="email"
                      name="email"
                      required
                      className="px-3 py-2 rounded bg-white/5 border border-white/10"
                    />
                  </label>
                  <label className="grid gap-1">
                    <span className="text-sm text-slate-300">Message</span>
                    <textarea
                      name="message"
                      rows="4"
                      required
                      className="px-3 py-2 rounded bg-white/5 border border-white/10"
                    />
                  </label>

                  <button
                    disabled={sending}
                    className="mt-2 inline-block bg-blue-600 hover:bg-blue-500 rounded-3xl px-5 py-2 font-semibold 
             disabled:opacity-60 hover:shadow-[0_0_12px_4px_rgba(59,130,246,0.4)]"
                  >
                    {sending ? "Sending…" : "Send"}
                  </button>

                  {/* Inline status messages */}
                  {status.ok === true && (
                    <div className="text-green-400 mt-1">{status.msg}</div>
                  )}
                  {status.ok === false && (
                    <div className="text-red-400 mt-1">{status.msg}</div>
                  )}
                </form>

                {/* If you ever want the old direct-post (redirect) method, revert to action= + method="POST". */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
