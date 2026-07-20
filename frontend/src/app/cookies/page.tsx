export const metadata = {
  title: "Cookie Policy | ServiceHub",
  description: "Understand how ServiceHub uses cookies and local storage to enhance browsing and booking experience.",
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-muted/10 pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="bg-card border border-border p-8 md:p-12 rounded-3xl shadow-sm space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Cookie Policy</h1>
          <p className="text-sm text-muted-foreground">Last updated: July 20, 2026</p>

          <div className="space-y-6 text-foreground text-sm leading-relaxed border-t border-border pt-6">
            <section className="space-y-2">
              <h2 className="text-lg font-bold">1. What Are Cookies</h2>
              <p className="text-muted-foreground">
                Cookies are small text files saved to your browser when you visit our app. They allow us to remember your location preference, active cart items, and login session.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold">2. Managing Cookies</h2>
              <p className="text-muted-foreground">
                You can choose to disable non-essential analytics cookies through your browser settings. Essential session cookies are required for processing bookings and logging into your account.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
