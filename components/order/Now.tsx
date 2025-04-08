import React from 'react';
import Cart from '../icons/Cart';

const Now: React.FC = () => {
    return (
        <div className="flex flex-col items-center">
        <p className="py-6 px-5 rounded-full bg-lightBlueGray mb-2">
          <Cart />
        </p>
        <p className="text-lg text-customGray">هنوز سفارشی ثبت نکرده اید</p>
      </div>
    );
};

export default Now;