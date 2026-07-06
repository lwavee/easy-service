"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I book a service?",
    answer: "Booking a service is easy! Just select the category you need, pick an available time slot, confirm your address, and proceed to payment. You can track your booking status in real-time.",
  },
  {
    question: "Are the professionals verified?",
    answer: "Yes, absolutely. Every professional on our platform undergoes a strict background check, skill verification, and ongoing quality assessments based on customer ratings.",
  },
  {
    question: "What if I am not satisfied with the service?",
    answer: "We offer a 100% Satisfaction Guarantee. If you're unhappy with the work, simply contact our 24x7 support within 24 hours, and we will arrange a rework or a refund.",
  },
  {
    question: "Is it safe to pay online?",
    answer: "Yes. We use industry-standard encryption and partner with trusted payment gateways like Stripe and Razorpay to ensure your payment details are completely secure.",
  },
  {
    question: "Can I reschedule or cancel my booking?",
    answer: "You can easily reschedule or cancel your booking through the app up to 2 hours before the scheduled time without any penalty.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Have questions? We're here to help. If you don't find your answer here, feel free to contact our support team.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className={`border rounded-2xl overflow-hidden transition-colors ${
                  isOpen ? "bg-card border-primary/50 shadow-sm" : "bg-card border-border hover:border-border/80"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex items-center justify-between w-full p-6 text-left"
                >
                  <span className={`font-semibold text-lg transition-colors ${isOpen ? "text-primary" : "text-foreground"}`}>
                    {faq.question}
                  </span>
                  <div className={`p-1 rounded-full transition-colors ${isOpen ? "bg-primary/10" : "bg-muted"}`}>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : "text-muted-foreground"}`}
                    />
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
