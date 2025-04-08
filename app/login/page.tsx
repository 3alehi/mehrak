"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import Login from '../../components/Login/Login';
import Password from '@/components/Login/Password';
import Sms from '@/components/Login/Sms';
import Back from '@/components/icons/Back';
import Link from 'next/link';
import ForgetPassOtp from '@/components/Login/ForgetPassOtp';
import ResetPassword from '@/components/Login/ResetPassword';
import { useAppContext } from '../context/context';

const Page: React.FC = () => {
    const [step, setStep] = useState<number>(0)
    const [phoneNumber, setPhoneNumber] = useState('');
    const { hasPassword } = useAppContext();

    return (
        <div className="flex flex-col items-center justify-center h-screen p-4">
            {
                (step === 3 || step === 2 || step == 1 || step === 4) &&
                <span className='cursor-pointer md:hidden right-4 top-0 self-start mb-2 flex items-center gap-2' onClick={() => {
                    if (hasPassword && step != 1 ) {
                        setStep(1)
                    } else if (step === 1) {
                        setStep(0)
                    }
                }}>
                    <Back />
                    <span className='text-sm font-extralight text-customGray' onClick={()=>{
                        setStep(0)
                    }}>
                    {[2, 3, 4].includes(step) ? "ورود کد تایید" : step === 1 ? "ورود با رمز عبور" : ""}

                    </span>
                </span>
            }
            <div className='bg-lightBlueGray rounded-2xl border max-w-[527px] w-full max-md:h-full border-lightGray' >
                <div className='w-full flex justify-center'>
                    <Link href={'/'}>
                    <Image
                        className='mt-20 max-md:mt-12 max-md:w-[124px] max-md:h-[43px]'
                        alt='mehra-logo'
                        src={'/logo.svg'}
                        width={163}
                        height={57}
                    /></Link>
                </div>
                {step === 0 && (
                    <Login phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} setStep={setStep} />
                )}
                {step === 1 && hasPassword && (
                    <Password phoneNumber={phoneNumber} setStep={setStep} />
                )}
                {step === 2 && (
                    <Sms setStep={setStep} phoneNumber={phoneNumber} />
                )}
                {step === 3 && (
                    <Sms setStep={setStep} phoneNumber={phoneNumber} />

                )}
                {step === 4 &&(
                    <ForgetPassOtp setStep={setStep} phoneNumber={phoneNumber} />
                )}
                {step === 5 &&(
                    <ResetPassword phoneNumber={phoneNumber} setStep={setStep} />
                )}

            </div>
        </div>
    );
};

export default Page;
