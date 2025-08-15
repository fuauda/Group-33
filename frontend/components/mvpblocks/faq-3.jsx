'use client';;
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Mail } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Badge } from '../ui/badge';
import Link from 'next/link'

function FAQItem({
  question,
  answer,
  index
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    (<motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.15,
        ease: 'easeOut',
      }}
      className={cn(
        'group border-border/60 rounded-lg border',
        'transition-all duration-200 ease-in-out',
        isOpen ? 'bg-card/30 shadow-sm' : 'hover:bg-card/50'
      )}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 px-6 py-4">
        <h3
          className={cn(
            'text-left text-base font-medium transition-colors duration-200',
            'text-foreground/80',
            isOpen && 'text-foreground'
          )}>
          {question}
        </h3>
        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
            scale: isOpen ? 1.1 : 1,
          }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
          className={cn(
            'shrink-0 rounded-full p-0.5',
            'transition-colors duration-200',
            isOpen ? 'text-primary' : 'text-muted-foreground'
          )}>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: {
                height: {
                  duration: 0.4,
                  ease: [0.04, 0.62, 0.23, 0.98],
                },
                opacity: {
                  duration: 0.25,
                  delay: 0.1,
                },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: {
                  duration: 0.3,
                  ease: 'easeInOut',
                },
                opacity: {
                  duration: 0.25,
                },
              },
            }}>
            <div className="border-border/40 border-t px-6 pt-2 pb-4">
              <motion.p
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{
                  duration: 0.3,
                  ease: 'easeOut',
                }}
                className="text-muted-foreground text-sm leading-relaxed">
                {answer}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>)
  );
}

export default function Faq3() {
  const faqs = [
    {
      question: 'What is CommunityConnect?',
      answer:
        "CommunityConnect is a digital platform designed to empower citizens, NGOs, and donors by providing tools for civic issue reporting, volunteer coordination, donation tracking, and community engagement. It bridges the gap between people who want to make a difference and those who need support.",
    },
    {
      question: 'Who can use CommunityConnect?',
      answer:
        'Anyone! Whether you\'re a concerned citizen reporting a local issue, an NGO looking for volunteers or funding, or a donor wanting transparency, CommunityConnect is built for you. Local governments and community organizers can also use it for outreach and data insights.',
    },
    {
      question: 'How does the volunteer matching engine work?',
      answer:
        "The volunteer matching engine intelligently connects volunteers with opportunities based on location, interests, skills, and availability. It ensures that organizations get the right help, and volunteers find meaningful ways to contribute.",
    },
    {
      question: 'How are donations tracked and made transparent?',
      answer:
        'All donations made through CommunityConnect are logged and viewable in real time by donors and NGOs. Each donation is tagged to specific causes or projects, with regular updates and impact reports provided to ensure full transparency.',
    },
    {
      question: 'Is my data safe on the platform?',
      answer:
        'Yes. CommunityConnect prioritizes privacy and data security. All user data is encrypted, and sensitive actions are protected by secure authentication protocols. We do not sell or share personal data with third parties.',
    },
  ];

  return (
    (<section className="bg-background relative w-full overflow-hidden py-16" id="FAQs">
      {/* Decorative elements */}
      <div
        className="bg-primary/5 absolute top-20 -left-20 h-64 w-64 rounded-full blur-3xl" />
      <div
        className="bg-primary/5 absolute -right-20 bottom-20 h-64 w-64 rounded-full blur-3xl" />
      <div className="relative container mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center">
          <Badge
            variant="outline"
            className="border-primary mb-4 px-3 py-1 text-xs font-medium tracking-wider uppercase">
            FAQs
          </Badge>

          <h2
            className="from-primary mb-3 bg-gradient-to-r to-rose-400 bg-clip-text text-3xl font-bold text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-sm">
            Everything you need to know about CommunityConnect
          </p>
        </motion.div>

        <div className="mx-auto max-w-2xl space-y-2">
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={cn('mx-auto mt-12 max-w-md rounded-lg p-6 text-center')}>
          <div
            className="bg-primary/10 text-primary mb-4 inline-flex items-center justify-center rounded-full p-2">
            <Mail className="h-4 w-4" />
          </div>
          <p className="text-foreground mb-1 text-sm font-medium">
            Still have questions?
          </p>
          <p className="text-muted-foreground mb-4 text-xs">
            We&apos;re here to help you
          </p>

          <Link href={"/contact"} className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 font-medium">
          <div id="contact-support" className="flex items-center gap-2">
              Contact Support
          </div>
            
          </Link>
        </motion.div>
      </div>
    </section>)
  );
}
