export const metadata = {
  title: "Terms of Service | ServiceHub",
  description: "ServiceHub Terms of Service detailing user agreements, service provider guidelines, cancellation rules, and booking terms.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-muted/10 pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="bg-card border border-border p-8 md:p-12 rounded-3xl shadow-sm space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Terms of Service</h1>
          <p className="text-sm text-muted-foreground">Last updated: July 20, 2026</p>

          <div className="space-y-6 text-foreground text-sm leading-relaxed border-t border-border pt-6">
            <section className="space-y-2">
              <h2 className="text-lg font-bold">1. Agreement to Terms</h2>
              <p className="text-muted-foreground">
                By accessing or using the ServiceHub website, mobile application, or any associated service platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold">2. Booking & Cancellation Policy</h2>
              <p className="text-muted-foreground">
                Customers may reschedule or cancel any scheduled service booking up to 2 hours prior to the slot commencement time at zero penalty. Cancellations made less than 2 hours before arrival may incur a nominal doorstep dispatch charge.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold">3. 30-Day Service Guarantee</h2>
              <p className="text-muted-foreground">
                All home repairs, appliance servicing, and cleaning tasks performed by ServiceHub professionals come with a 30-day rework warranty. If the specific issue inspected and repaired reoccurs within 30 days, we will dispatch a technician to fix it at no additional cost.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold">4. User Responsibilities & Safety</h2>
              <p className="text-muted-foreground">
                Users must provide a safe environment for service professionals operating on site. Any abuse, non-payment, or unauthorized modification of work done will void the service guarantee.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
