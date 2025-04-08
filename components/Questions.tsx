import Link from 'next/link';
import React, { useState } from 'react';

export default function Questions() {
    const questions = [
        {
            question: 'خرید کالاهای سنگین از مهرا چه هزینه ارسال دارد؟',
            answer: 'اگر کالای شما جزو کالاهای سنگین باشد، هزینه ارسال آن در تهران، اسلامشهر و کرج بسته به وزن و ماهیت کالا از ۲۵۰۰۰ تومان تا ۵۰۰۰۰ تومان می‌باشد.'
        },
        {
            question: 'آیا امکان بازگرداندن وجه بعد از لغو سفارش امکان‌پذیر است؟',
            answer: 'بله، وجه پرداختی شما پس از لغو سفارش، به حساب شما بازگردانده می‌شود.'
        },
        {
            question: 'نحوه خرید در سایت به چه صورت است؟',
            answer: 'برای خرید از سایت، ابتدا باید در سایت ثبت‌نام کرده و سپس محصولات مورد نظر را به سبد خرید اضافه کنید.'
        },
        {
            question: 'شرایط استفاده از سایت چیست؟',
            answer: 'برای استفاده از سایت باید قوانین و مقررات سایت را پذیرفته و رعایت کنید.'
        },
        {
            question: 'نحوه ارسال به چه شکل است؟',
            answer: 'ارسال کالاها از طریق پست و حمل و نقل شرکتی انجام می‌شود.'
        },
        {
            question: 'گزارش باقیمانده چه کاربردی دارد؟',
            answer: 'این گزارش برای بررسی موجودی و وضعیت کالاهای موجود استفاده می‌شود.'
        },
        {
            question: 'کالاهای موجودی چیست؟',
            answer: 'کالاهای موجودی کالاهایی هستند که در انبار موجود و قابل فروش هستند.'
        },
        {
            question: 'کالاهای دارای اولویت چگونه پیگیری می‌شوند؟',
            answer: 'کالاهای دارای اولویت با توجه به نیاز و درخواست مشتری، سریع‌تر پردازش و ارسال می‌شوند.'
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        if (openIndex === index) {
            setOpenIndex(null);
        } else {
            setOpenIndex(index);
        }
    };

    return (
        <div className='w-full mb-40 max-md:mb-36'>
            <p className='text-customGray font-bold text-2xl mb-5 max-md:mb-1 max-md:text-base '>پرسش‌های رایج</p>
            {questions.map((item, index) => (
                <div
                    key={index}
                    className='mb-2 bg-light-gray rounded-xl overflow-hidden shadow-sm'
                >
                    <div
                        className='p-4 flex justify-between items-center cursor-pointer'
                        onClick={() => toggleAccordion(index)}
                    >
                        <span className='text-customGray font-extralight text-lg max-md:text-xs max-md:font-light'>{item.question}</span>
                        {openIndex === index ? <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.7188 0.390625C10.8594 0.25 11.0938 0.25 11.2344 0.390625L21.3594 10.5156C21.5 10.6562 21.5 10.8906 21.3594 11.0312C21.2188 11.1719 20.9844 11.1719 20.8438 11.0312L11 1.1875L1.10938 11.0312C0.96875 11.1719 0.734375 11.1719 0.59375 11.0312C0.453125 10.8906 0.453125 10.6562 0.59375 10.5156L10.7188 0.390625Z" fill="#515869" />
                        </svg>
                            : <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.2188 11.6562L1.09375 1.53125C0.953125 1.39062 0.953125 1.15625 1.09375 1.01562C1.23438 0.875 1.46875 0.875 1.60938 1.01562L11.5 10.8594L21.3438 1.01562C21.4844 0.875 21.7188 0.875 21.8594 1.01562C22 1.15625 22 1.39062 21.8594 1.53125L11.7344 11.6562C11.5938 11.7969 11.3594 11.7969 11.2188 11.6562Z" fill="#515869" />
                            </svg>
                        }
                    </div>
                    <div
                        className='overflow-hidden transition-all bg-lightBlueGray duration-300 '
                        style={{
                            maxHeight: openIndex === index ? '200px' : '0',
                            padding: openIndex === index ? '1rem' : '0 1rem',
                            opacity: openIndex === index ? 1 : 0,
                        }}
                    >
                        <p className='text-customGray text-lg  max-md:text-xs max-md:font-light font-extralight leading-9'>{item.answer}{item.question.includes("کالاهای سنگین") && <Link href={'/buyproduct'}>ادامه</Link> }</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
