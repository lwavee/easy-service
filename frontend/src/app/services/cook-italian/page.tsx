import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Italian Cook | Easy Service",
  description: "Authentic Italian pastas, pizzas, and risottos crafted to perfection in your home.",
};

export default function CookItalianPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-24 pb-8">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="bg-white rounded-3xl overflow-hidden mb-12">
            <div className="w-full h-[400px] md:h-[500px] relative rounded-3xl overflow-hidden mb-10 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200&auto=format&fit=crop" 
                alt="Italian Cook" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-6 text-slate-700 leading-relaxed">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Italian Cook
              </h1>
              
              <p className="text-lg">
                Authentic Italian pastas, pizzas, and risottos crafted to perfection in your home.
              </p>
              
              <p>
                A clean and well-maintained environment is essential for a healthy and comfortable lifestyle. Our <strong>Italian Cook</strong> ensures every detail is taken care of. Over time, regular maintenance is required that routine cleaning cannot fully address. Our expert process covers every aspect to ensure thorough hygiene and long-lasting freshness.
              </p>

              <p>
                We begin with a complete inspection to understand specific requirements. Our trained professionals use advanced tools, eco-friendly materials, and proven techniques to deliver exceptional results. The service includes comprehensive care, ensuring that you receive the best quality.
              </p>

              

              <p>
                Our service is ideal for seasonal preparation, special occasions, or regular maintenance. We understand that every home is unique, so we provide customized plans designed to match your specific needs and requirements.
              </p>

              <p>
                When you choose our <strong>Italian Cook</strong>, you can expect spotless results, reliable service, and an overall refreshing environment. We take pride in providing reliable service with timely execution and excellent customer support.
              </p>

              <div className="pt-8 pb-4">
                <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-[#5bb4d3] hover:bg-[#4a9cb8] text-white px-8 py-3 text-lg font-medium shadow-md transition-colors">
                  Contact Us
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
