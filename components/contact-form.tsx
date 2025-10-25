'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import Container from './container';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const contactSchema = z.object({
  name: z.string().min(1, '請輸入姓名'),
  email: z.string().email('請輸入正確 Email'),
  subject: z.string().min(1, '請輸入主旨'),
  message: z.string().min(1, '請輸入訊息'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm({ className }: { className?: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const [subjectValue, setSubjectValue] = useState('');

  const onSubmit = (data: ContactFormData) => {
    // 組成 mailto
    const mailtoLink = `mailto:ssuyuke@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`姓名: ${data.name}\nEmail: ${data.email}\n\n${data.message}`)}`;
    window.location.href = mailtoLink;
  };

  return (
    <section id="contact" className={cn('md:py-20 overflow-hidden', className)}>
      <Container>
        <div className="mb-12 text-center">
          <h2 className="relative inline-block mb-8 text-primary text-lg md:text-xl lg:text-2xl font-semibold tracking-widest cursor-default group">
            [ CONTACT ]
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </h2>
        </div>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.3,
            }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 text-sm w-full md:w-1/2"
          >
            {/* 姓名 */}
            <h3 className="flex flex-col gap-4 mb-8 text-2xl font-bold tracking-widest">
              Let&apos;s Talk :)
            </h3>
            <div>
              <input
                {...register('name')}
                className="w-full px-4 py-2 rounded-md border border-border bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="你的名字"
              />
              {errors.name && (
                <p className="text-destructive mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <input
                {...register('email')}
                className="w-full px-4 py-2 rounded-md border border-border bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="你的 Email"
              />
              {errors.email && (
                <p className="text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* 主旨 */}
            <div>
              <div className="flex gap-2 mb-2">
                <button
                  type="button"
                  className="px-3 py-1 rounded-md border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition"
                  onClick={() => {
                    setSubjectValue('網頁開發外包');
                  }}
                >
                  網頁開發外包
                </button>
                <button
                  type="button"
                  className="px-3 py-1 rounded-md border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition"
                  onClick={() => {
                    setSubjectValue('前端技能諮詢');
                  }}
                >
                  前端技能諮詢
                </button>
              </div>
              <input
                {...register('subject')}
                value={subjectValue}
                onChange={e => setSubjectValue(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-border bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="請輸入主旨"
              />
              {errors.subject && (
                <p className="text-destructive mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>

            {/* 訊息 */}
            <div>
              <textarea
                {...register('message')}
                rows={5}
                className="w-full px-4 py-2 rounded-md border border-border bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="輸入你的訊息"
              />
              {errors.message && (
                <p className="text-destructive mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* 送出 */}
            <div>
              <button
                type="submit"
                className="px-6 py-2 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary-hover transition"
              >
                送出
              </button>
            </div>
          </motion.form>
          <motion.video
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.5,
            }}
            autoPlay
            loop
            muted
            className="w-full md:w-1/4 max-h-[550px] rounded-3xl shadow-sm object-cover"
          >
            <source src="/contact.MP4" type="video/mp4" />
            您的瀏覽器不支援影片播放。
          </motion.video>
        </div>
      </Container>
    </section>
  );
}
