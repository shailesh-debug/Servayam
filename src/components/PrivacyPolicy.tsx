import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

interface PrivacyPolicyProps {
  onBack: () => void;
}

export default function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  return (
    <div className="min-h-screen bg-surface py-12 px-6 sm:px-8 relative">
      <div className="absolute inset-0 halftone opacity-5 text-on-background pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex items-center gap-4"
        >
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.05, x: -4 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-primary text-on-primary font-pixel text-xs tracking-tighter uppercase px-4 py-3 border-4 border-on-background ink-offset-black hover:shadow-[8px_8px_0_var(--color-on-background)] transition-all shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </motion.button>

          <div>
            <p className="font-pixel text-[0.6rem] uppercase tracking-widest text-primary mb-1">
              Legal
            </p>
            <h1 className="font-headline font-black text-4xl sm:text-6xl uppercase tracking-tighter text-on-background">
              Privacy Policy
            </h1>
          </div>
        </motion.div>

        {/* Last updated */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-10 inline-block bg-tertiary-container text-on-tertiary-container font-pixel text-[0.6rem] uppercase tracking-widest px-4 py-2 border-4 border-on-background"
        >
          Last updated: April 2025
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-10 font-body text-on-surface-variant leading-relaxed"
        >

          {/* Intro */}
          <div className="border-l-8 border-primary pl-6 py-2">
            <p className="text-base sm:text-lg text-on-background">
              Servayam ("we", "our", "us") is a 3D animation production studio based in India. We are committed to protecting the privacy of everyone who visits our website or contacts us about our services. This policy explains what information we collect, how we use it, and your rights around it.
            </p>
          </div>

          {[
            {
              title: "1. Information We Collect",
              content: [
                "**Contact information** — When you fill out our contact or inquiry form, we collect your name, email address, phone number (if provided), and the details of your project brief.",
                "**Usage data** — We may collect standard analytics data such as pages visited, time spent on the site, device type, and browser — to understand how people use our website and improve it.",
                "**Communications** — Any messages, emails, or briefs you send us are retained to fulfil your request and maintain a record of our correspondence.",
              ],
            },
            {
              title: "2. How We Use Your Information",
              content: [
                "To respond to project inquiries and communicate about potential or active work.",
                "To send relevant updates about Servayam services — only if you have opted in or initiated contact.",
                "To analyse website usage and improve the user experience.",
                "We do not sell, rent, or trade your personal data to any third party, ever.",
              ],
            },
            {
              title: "3. Cookies",
              content: [
                "Our website may use basic cookies for analytics purposes (e.g. Google Analytics or similar tools). These cookies do not identify you personally.",
                "You can disable cookies at any time through your browser settings. Disabling cookies will not affect your ability to use the site.",
              ],
            },
            {
              title: "4. Data Storage & Security",
              content: [
                "Your data is stored securely and accessed only by the Servayam team directly involved in client communication.",
                "We take reasonable precautions to protect your information from unauthorised access, loss, or misuse.",
                "We do not store payment information — all billing is handled through secure third-party platforms.",
              ],
            },
            {
              title: "5. Third-Party Services",
              content: [
                "Our website may link to YouTube (Giggle Filmz, Giggle Explains), Instagram, and other platforms. Once you leave our site, their respective privacy policies apply.",
                "We may use tools like Google Analytics, Vercel, or similar services. These providers have their own privacy policies that govern data collected through their platforms.",
              ],
            },
            {
              title: "6. Data Retention",
              content: [
                "We retain contact and project inquiry data for as long as necessary to fulfil the purpose for which it was collected, or as required by law.",
                "If you would like your data deleted, contact us and we will action it within 14 business days.",
              ],
            },
            {
              title: "7. Your Rights",
              content: [
                "You have the right to access the personal data we hold about you.",
                "You have the right to request correction or deletion of your data.",
                "You have the right to withdraw consent for marketing communications at any time.",
                "To exercise any of these rights, email us directly using the contact details below.",
              ],
            },
            {
              title: "8. Children's Privacy",
              content: [
                "Our services are not directed at children under the age of 13. We do not knowingly collect personal data from minors. If you believe we have inadvertently received data from a child, please contact us and we will delete it immediately.",
              ],
            },
            {
              title: "9. Changes to This Policy",
              content: [
                "We may update this Privacy Policy from time to time. The 'Last updated' date at the top of this page reflects when changes were last made. Continued use of the site after changes constitutes acceptance of the updated policy.",
              ],
            },
            {
              title: "10. Contact Us",
              content: [
                "If you have any questions about this Privacy Policy or how your data is handled, reach out to us via the Hire Us button on our website or email us directly. We'll respond promptly.",
              ],
            },
          ].map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.04 }}
              className="border-4 border-on-background bg-surface-container-lowest p-6 sm:p-8 shadow-[6px_6px_0_var(--color-on-background)]"
            >
              <h2 className="font-headline font-black text-xl sm:text-2xl uppercase tracking-tighter text-on-background mb-4 border-b-4 border-on-background pb-3">
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.content.map((item, j) => {
                  const parts = item.split(/\*\*(.*?)\*\*/g);
                  return (
                    <li key={j} className="flex gap-3 text-sm sm:text-base">
                      <span className="text-primary font-black shrink-0 mt-0.5">—</span>
                      <span>
                        {parts.map((part, k) =>
                          k % 2 === 1
                            ? <strong key={k} className="text-on-background font-bold">{part}</strong>
                            : part
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}

        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center border-8 border-on-background bg-primary/10 p-8 shadow-[10px_10px_0_var(--color-on-background)]"
        >
          <p className="font-pixel text-xs uppercase tracking-widest text-on-background mb-4">
            Questions about your data?
          </p>
          <h3 className="font-headline font-black text-2xl uppercase mb-6 text-on-background">
            Get in touch with us directly.
          </h3>
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-on-primary font-pixel text-xs tracking-tighter uppercase px-8 py-4 border-4 border-on-background ink-offset-black"
          >
            Back to Home
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
