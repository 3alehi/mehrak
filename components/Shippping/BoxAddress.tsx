import { formatPhoneNumber } from '@/utils/helper/FormatPhone';
import React from 'react';
interface BoxAddressProps{
    data:AddressData;
}
const BoxAddress: React.FC <BoxAddressProps> = ({data}) => {
    
    return (
        <div className='bg-lightBlueGray rounded-lg py-3  px-5 text-charcoal border border-lightGrayBlue mt-3'>
            <p className='text-lg font-light max-md:text-sm line-clamp-1'>{data.full_address}</p>
   <div className='text-sm font-extralight mt-4'>
   <p>آدرس - آدرس</p>
            <p>کد پسیتی : {data.postal_code}</p>
            <p>تلفن : {formatPhoneNumber(data.mobile)}</p>
            <p>تحویل گیرنده :{data.first_name} {data.last_name}</p>
   </div>
        </div>
    );
};

export default BoxAddress;