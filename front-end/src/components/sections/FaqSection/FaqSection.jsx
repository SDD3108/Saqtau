"use client";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/src/ui/accordion";
export default function FaqSection({ c }) {
  return (
    <section className="section wrap faq-section">
      <div>
        <p className="eyebrow">{c.faqTag}</p>
        <h2>{c.faqTitle}</h2>
      </div>
      <Accordion type="single" collapsible>
        {c.faqs.map(([q, a], i) => (
          <AccordionItem value={String(i)} key={q}>
            <AccordionTrigger>{q}</AccordionTrigger>
            <AccordionContent>{a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
