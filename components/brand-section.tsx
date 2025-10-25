import Link from 'next/link';
import React from 'react';
import Container from './container';
import { motion } from 'framer-motion';

export default function ContactSection({ className }: { className?: string }) {
  return (
    <section className={className}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.5,
          }}
          className="flex flex-col md:flex-row justify-between items-center pb-5 md:pb-0"
        >
          <p className="text-7xl lg:text-9xl font-bold">SSUYUKE</p>
          <div className="flex-1 flex flex-col">
            <div className="text-center text-sm">
              <p className="tracking-widest mb-1">ssuyuke@gmail.com</p>
              <div>
                {['Instagram', 'Facebook', 'Linkedin'].map(
                  (item, index, arr) => (
                    <React.Fragment key={item}>
                      <Link
                        href=""
                        className="hover:text-primary transition-colors tracking-wide"
                      >
                        {item.toUpperCase()}
                      </Link>
                      {index < arr.length - 1 && (
                        <span className="mx-1 text-muted-foreground">/</span>
                      )}
                    </React.Fragment>
                  )
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
