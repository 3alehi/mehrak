'use client';
import React, { useEffect, useRef, useState } from 'react';

interface TextWithReadMoreProps {
  htmlContent: string;
}

const TextWithReadMore: React.FC<TextWithReadMoreProps> = ({ htmlContent }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (el) {
      // ابتدا clamp رو فعال می‌کنیم تا ارتفاع محدود بشه
      el.classList.add('line-clamp-4');
      
      // بعد از یک تیک، بررسی می‌کنیم که آیا محتوای بیشتری وجود داره یا نه
      requestAnimationFrame(() => {
        const fullHeight = el.scrollHeight;
        const clampHeight = el.clientHeight;

        // اگر ارتفاع واقعی بیشتر از clamp باشه، یعنی overflow داریم
        setIsOverflowing(fullHeight > clampHeight);
      });
    }
  }, [htmlContent]);

  return (
    <div className="mt-2 text-customGray text-lg leading-8 font-extralight text-justify">
      <div
        ref={contentRef}
        className={`transition-all duration-300 ease-in-out ${
          isExpanded ? '' : 'line-clamp-4'
        }`}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      {isOverflowing && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-aquaBlue mt-2 focus:outline-none"
        >
          {isExpanded ? 'نمایش کمتر' : 'نمایش بیشتر'}
        </button>
      )}
    </div>
  );
};

export default TextWithReadMore;
