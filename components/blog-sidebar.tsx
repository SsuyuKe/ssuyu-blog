'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';

const categories = [
  '所有文章',
  '網頁動效',
  '前端開發',
  'React',
  '職涯轉職',
  '面試題',
];

const emailSchema = z.object({
  email: z.string().email({ message: '請輸入有效的 Email' }),
});

type EmailForm = z.infer<typeof emailSchema>;

export default function BlogSidebar({
  onCategoryChange,
}: {
  onCategoryChange: (category: string) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>('所有文章');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
  });

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  const onSubmit = async (data: EmailForm) => {
    setLoading(true);
    setSubmitError('');

    try {
      const res = await axios.post('/api/subscribe', { email: data.email });

      if (res.data.success) {
        setSuccess(true);
      } else {
        setSubmitError(res.data.error || '訂閱失敗');
      }
    } catch (err) {
      console.error(err);
      setSubmitError('訂閱失敗，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full sticky top-20">
      <div className="mb-3">
        <h3 className="font-semibold text-muted-foreground mb-3 tracking-wide">
          關於我
        </h3>
        {/* 關於我 */}
        <div className="flex flex-col justify-center items-center w-full gap-3">
          <Image
            src="/avatar.jpg"
            width={100}
            height={100}
            className="w-32 aspect-square rounded-full object-cover"
            alt="avatar"
          />
          <div className="text-sm text-muted-foreground text-center">
            <p className="mb-2 font-medium">思宇 Ssuyu</p>
            <p>前端工程師｜轉職前端教練</p>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <h3 className="font-semibold text-muted-foreground mb-3 tracking-wide">
          訂閱電子報
        </h3>
        <p className="text-sm mb-4">
          獲取 <strong>轉職前端大補帖</strong> 與{' '}
          <strong>不定時前端乾貨</strong>
          <br />
          讓前端技能不停升級！🚀
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-3 text-sm"
        >
          <input
            type="email"
            {...register('email')}
            placeholder="輸入你的 Email"
            className="w-full px-4 py-2 rounded-md border border-border bg-card text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <button
            type="submit"
            className={`cursor-pointer rounded-md py-2 px-4 transition-colors border
    ${
      success
        ? 'border-green-500 bg-green-100 text-green-700'
        : 'border-transparent bg-sidebar-primary text-sidebar-primary-foreground hover:bg-primary-hover'
    }
  `}
            disabled={loading || success}
          >
            {loading ? '訂閱中...' : success ? '訂閱成功！🎉' : '立即訂閱'}
          </button>

          {submitError && <p className="text-red-500">{submitError}</p>}
        </form>
      </div>
      <div>
        <h3 className="font-semibold text-muted-foreground mb-3 tracking-wide">
          分類
        </h3>
        {/* 分類 */}
        <ul className="space-y-4 min-w-max mb-5">
          {categories.map(category => (
            <li
              key={category}
              className={cn(
                'flex items-center gap-2 group text-muted-foreground font-medium hover:text-primary/90 hover:font-semibold transition-all duration-200 cursor-pointer',
                selectedCategory === category && 'text-primary'
              )}
              onClick={() => handleCategoryClick(category)}
            >
              <ChevronRight
                size={16}
                className="opacity-50 group-hover:translate-x-1 group-hover:opacity-100 transition-all"
              />
              <span className="text-[15px]">{category}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* TODO: 熱門文章或放大補帖訂閱電子報 */}
    </div>
  );
}
