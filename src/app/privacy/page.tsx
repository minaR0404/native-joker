import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — NativeJoker",
  description: "Privacy policy for NativeJoker slang translator.",
};

export default function PrivacyPage() {
  return (
    <div className="flex-1 flex flex-col">
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <svg width="28" height="28" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#0f0f0f"/>
              <rect x="4" y="5" width="24" height="17" rx="4" fill="#f59e0b"/>
              <polygon points="8,22 14,22 9,28" fill="#f59e0b"/>
              <text x="16" y="17" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="10" fill="#0f0f0f" textAnchor="middle" letterSpacing="-0.5">yo!</text>
            </svg>
            <span className="font-bold text-lg tracking-tight">NativeJoker</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-10 space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="text-sm text-muted">Last updated: April 11, 2026</p>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">1. Information We Collect</h2>
          <p className="text-sm text-muted leading-relaxed">
            NativeJoker does not collect or store any personal information. The text you enter for translation is sent directly to the OpenAI API to generate a response and is not stored on our servers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">2. How We Use Your Information</h2>
          <p className="text-sm text-muted leading-relaxed">
            The text you submit is used solely to provide the translation service. We do not use your input for any other purpose, and we do not sell or share your data with third parties, except as required to provide the service (i.e., OpenAI API).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">3. Third-Party Services</h2>
          <p className="text-sm text-muted leading-relaxed">
            We use the following third-party services:
          </p>
          <ul className="text-sm text-muted list-disc list-inside space-y-1">
            <li><strong className="text-foreground">OpenAI API</strong> — processes your input text to generate slang translations. Subject to <a href="https://openai.com/policies/privacy-policy" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">OpenAI&apos;s Privacy Policy</a>.</li>
            <li><strong className="text-foreground">Google AdSense</strong> — may display advertisements. Google may use cookies to serve ads based on your interests. See <a href="https://policies.google.com/privacy" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">Google&apos;s Privacy Policy</a>.</li>
            <li><strong className="text-foreground">Vercel</strong> — hosts this website and may collect standard server logs including IP addresses.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">4. Cookies</h2>
          <p className="text-sm text-muted leading-relaxed">
            NativeJoker itself does not use cookies. However, Google AdSense may place cookies on your device to serve personalized ads. You can opt out of personalized advertising via <a href="https://adssettings.google.com" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">5. Contact</h2>
          <p className="text-sm text-muted leading-relaxed">
            If you have any questions about this privacy policy, please contact us at the GitHub repository.
          </p>
        </section>
      </main>

      <footer className="border-t border-border px-6 py-4">
        <div className="max-w-3xl mx-auto text-xs text-muted">
          <Link href="/" className="hover:text-foreground transition-colors">← Back to NativeJoker</Link>
        </div>
      </footer>
    </div>
  );
}
