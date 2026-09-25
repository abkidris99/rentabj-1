import React, { useState } from 'react';
import { siteConfig } from '../data/siteConfig';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'How does RentABJ Homes verify rental properties in Abuja?',
    answer:
      'Every listing on RentABJ Homes undergoes physical in-person inspection by our team. We verify the landlord or principal caretaker, test electrical and water systems (borehole, AEDC prepaid meter), review tenancy agreements, and ensure zero duplicate or phantom listings.',
  },
  {
    question: 'What are the standard agent and legal fees for renting in Abuja?',
    answer:
      'Standard Abuja rental transactions typically involve a 10% agency fee, a 5–10% legal/tenancy agreement fee, and a refundable caution deposit (usually 10%). RentABJ Homes ensures 100% transparent fee breakdowns with zero hidden charges before you commit.',
  },
  {
    question: 'Which Abuja districts do you cover for rental apartments?',
    answer:
      'We cover prime and emerging residential and commercial districts across the Federal Capital Territory, including Gwarinpa, Maitama, Guzape, Katampe & Katampe Extension, Jahi, Wuse 2, Lifecamp, Dawaki, Karsana, and Kubwa.',
  },
  {
    question: 'How quickly can I schedule an inspection and move in?',
    answer:
      'Property inspections can be arranged within 2–4 hours via our WhatsApp desk or instant property request form. Once documentation and payments are finalized, keys are typically handed over within 24 to 48 hours.',
  },
  {
    question: 'What should I check regarding power, water, and service charge in Abuja?',
    answer:
      'Always verify if the property has a dedicated AEDC prepaid meter or shared billing, whether the compound utilizes an automated borehole system, and what the estate service charge covers (e.g., central diesel generator hours, 24/7 security outposts, facility maintenance, and waste disposal).',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="faq-section" style={{ padding: '80px 0', background: 'var(--bg-light)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
          <span className="eyebrow">Frequently Asked Questions</span>
          <h2 className="section-title">Renting in Abuja: Everything You Need to Know</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Clear, honest answers to help you navigate Abuja house hunting, legal fees, inspections, and lease terms without stress.
          </p>
        </div>

        <div style={{ maxWidth: '820px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  background: '#fff',
                  borderRadius: '16px',
                  border: isOpen ? '1.5px solid var(--emerald)' : '1px solid rgba(11, 31, 58, 0.08)',
                  boxShadow: isOpen
                    ? '0 12px 28px rgba(15, 169, 88, 0.08)'
                    : '0 2px 8px rgba(11, 31, 58, 0.03)',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    padding: '22px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    color: isOpen ? 'var(--emerald-dark)' : 'var(--navy)',
                  }}
                >
                  <span>{faq.question}</span>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: isOpen ? 'rgba(15, 169, 88, 0.12)' : 'rgba(11, 31, 58, 0.05)',
                      color: isOpen ? 'var(--emerald)' : 'var(--navy)',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      flexShrink: 0,
                      transition: 'transform 0.25s ease',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div
                    style={{
                      padding: '0 24px 22px',
                      color: 'var(--text-soft)',
                      fontSize: '0.98rem',
                      lineHeight: 1.7,
                      borderTop: '1px solid rgba(11, 31, 58, 0.04)',
                      paddingTop: '16px',
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA for questions */}
        <div
          style={{
            marginTop: '44px',
            textAlign: 'center',
            padding: '28px',
            background: '#fff',
            borderRadius: '16px',
            maxWidth: '680px',
            margin: '44px auto 0',
            border: '1px dashed rgba(15, 169, 88, 0.35)',
          }}
        >
          <p style={{ fontWeight: 600, color: 'var(--navy)', marginBottom: '8px', fontSize: '1.05rem' }}>
            Have a specific rental question or property inquiry?
          </p>
          <p style={{ color: 'var(--text-soft)', fontSize: '0.92rem', marginBottom: '18px' }}>
            Speak directly with our local Abuja consultants on WhatsApp for instant assistance.
          </p>
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ display: 'inline-flex', padding: '12px 24px', fontSize: '0.92rem' }}
          >
            Chat with an Agent on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
