import { convertToJalali } from '@/utils/helper/convetDataToTime';
import React from 'react';

interface PayProps {
    items: {
        id: string;
        is_paid: boolean;
        amount: number;
        created_at: string;
        gateway: string;
        transaction_id: string;
    };
}
const  Pay: React.FC<PayProps> = ({ items }) => {
    return (
        <div className='w-full bg-lightBlueGray border rounded-2xl px-6 max-md:px-3 py-4'>
            <div className='flex justify-between text-lg max-md:text-sm max-md:flex-col'>
                {items.is_paid ? (

                    <p className='text-turquoise font-medium max-md:text-sm	 '>پرداخت موفق</p>
                ) : <p className='text-customRed font-medium max-md:text-sm	 '>پرداخت ناموفق</p>
                }

                <div className='flex max-md:mt-2 max-md:justify-between'>
                    <p className='ml-16 font-medium max-md:text-sm'>{items.amount.toLocaleString()} تومان</p>
                    {/* <p>{moment(items.created_at).locale('fa').format('jD jMMMM jYYYY - HH:mm')}</p> */}
                    <p className='font-extralight max-md:text-xs'>{convertToJalali(items.created_at)}</p>
                    {/* <p>{items.created_at}</p> */}

                </div>
            </div>
            <p className='mt-3 font-medium text-lg max-md:text-sm'> <span className='font-extralight'>درگاه</span> {items.gateway}</p>
            <p className='mt-3 max-md:hidden text-lg font-medium max-md:text-sm'> <span className='font-extralight'>شماره پیگیری پرداخت : </span>{items.transaction_id}</p>

        </div>
    );
};

export default Pay;