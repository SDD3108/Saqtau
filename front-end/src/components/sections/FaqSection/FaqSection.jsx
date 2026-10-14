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
        {c.faqs.map(([question, answer], index) => (
          <AccordionItem
            key={index}
            value={String(index)}
          >
            <AccordionTrigger>
              {question}
            </AccordionTrigger>

            <AccordionContent>
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}