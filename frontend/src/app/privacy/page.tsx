export const metadata = {
  title: "Privacy Policy | ServiceHub",
  description: "Learn how ServiceHub collects, uses, and safeguards your personal data and doorstep service address info.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-muted/10 pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="bg-card border border-border p-8 md:p-12 rounded-3xl shadow-sm space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">Last updated: July 20, 2026</p>

          <div className="space-y-6 text-foreground text-sm leading-relaxed border-t border-border pt-6">
            <section className="space-y-2">
              <h2 className="text-lg font-bold">1. Information We Collect</h2>
              <p className="text-muted-foreground">
                We collect information necessary to fulfill doorstep home service requests, including your name, mobile phone number, delivery/service address, and payment transaction details.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold">2. How We Use Your Data</h2>
              <p className="text-muted-foreground">
                Your data is exclusively used to assign verified service technicians, send booking updates via SMS/WhatsApp, generate invoices, and process refunds. We never sell your personal data to third parties.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold">3. Data Security & Encryption</h2>
              <p className="text-muted-foreground">
                All network transmissions are secured with 256-bit SSL encryption. Payment processing is conducted through PCI-DSS compliant banking partners.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
