import React from "react";

const SkeletonStep: React.FC = () => {
  const steps = [0, 1, 2]; // تعداد مراحل

  return (
    <div>
      {/* اسکلت مراحل */}
      <div className="mt-16 w-[637px]">
        {/* آیکون‌ها و متن‌های شبیه‌سازی‌شده */}
        <div className="flex justify-between items-center">
          {steps.map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center animate-pulse"
            >
              {/* آیکون اسکلت */}
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              {/* متن اسکلت */}
              <div className="mt-2 w-16 h-4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>

        {/* خطوط و نقطه‌ها */}
        <div className="relative mt-6">
          {/* خط خاکستری */}
          <div className="absolute top-1/2 left-0 w-full border-t border-gray-300 transform -translate-y-1/2"></div>

          {/* نقاط اسکلت */}
          <div className="absolute top-1/2 transform -translate-y-1/2 flex justify-between w-full">
            {steps.map((_, index) => (
              <div
                key={index}
                className="w-4 h-4 bg-gray-300 rounded-full animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonStep;
