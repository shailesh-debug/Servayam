import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, Clock, ShieldCheck, Lock } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!EMAIL_REGEX.test(formData.email.trim())) {
      setFormStatus("error");
      setStatusMessage("Please enter a valid email address.");
      return;
    }

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;
    if (!accessKey) {
      setFormStatus("error");
      setStatusMessage("Contact form is not configured. Add VITE_WEB3FORMS_ACCESS_KEY to your .env file.");
      return;
    }

    setFormStatus("submitting");
    setStatusMessage("Sending your message...");

    const payload = new FormData();
    payload.append("access_key", accessKey);
    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("message", formData.message);
    payload.append("subject", "New enquiry from Servayam website");
    payload.append("from_name", "Servayam Contact Form");
    payload.append("botcheck", "");

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        body: payload,
      });

      const result = (await response.json()) as { success?: boolean; message?: string };

      if (response.ok && result.success) {
        setFormStatus("success");
        setStatusMessage("Thanks. Your message has been sent.");
        setFormData({ name: "", email: "", message: "" });
        return;
      }

      setFormStatus("error");
      setStatusMessage(result.message || "Could not send your message. Please try again.");
    } catch {
      setFormStatus("error");
      setStatusMessage("Network error while sending. Please try again in a moment.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-on-background/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.9, opacity: 0, rotate: 2 }}
            className="relative w-full max-w-lg bg-surface border-8 border-on-background p-8 ink-offset-black"
          >
            <button
              onClick={onClose}
              className="absolute -top-6 -right-6 bg-error text-white p-2 border-4 border-on-background hover:rotate-90 transition-transform"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="font-headline font-black text-4xl uppercase tracking-tighter mb-6 italic">
              Let's <span className="text-primary">Ignite</span> Your Project
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
              <div>
                <label className="block font-headline font-bold uppercase text-sm mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-surface-container border-4 border-on-background p-3 focus:ink-offset-primary outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block font-headline font-bold uppercase text-sm mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$"
                  title="Please enter a valid email address"
                  className="w-full bg-surface-container border-4 border-on-background p-3 focus:ink-offset-primary outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block font-headline font-bold uppercase text-sm mb-2">Tell us about your project</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-surface-container border-4 border-on-background p-3 focus:ink-offset-primary outline-none transition-all resize-none"
                  placeholder="I want to build the next big animation..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, skewX: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={formStatus === "submitting"}
                className="w-full bg-primary text-on-primary font-headline font-black uppercase py-4 border-4 border-on-background ink-offset-black flex items-center justify-center gap-2"
              >
                {formStatus === "submitting" ? "Sending..." : "Send Message"} <Send className="w-5 h-5" />
              </motion.button>

              {formStatus !== "idle" && (
                <p
                  role="status"
                  aria-live="polite"
                  className={`font-pixel text-[0.6rem] uppercase tracking-wider ${formStatus === "error" ? "text-error" : "text-on-surface-variant"}`}
                >
                  {statusMessage}
                </p>
              )}

              {/* Trust signals */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 border-t-2 border-dashed border-outline-variant mt-2">
                {[
                  { icon: Clock, text: "Reply within 24 hours" },
                  { icon: ShieldCheck, text: "No commitment required" },
                  { icon: Lock, text: "100% confidential" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-1.5 text-on-surface-variant">
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="font-pixel text-[0.5rem] uppercase leading-loose">{text}</span>
                  </div>
                ))}
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
