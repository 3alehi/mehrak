'use client'
import ShopCart from "../icons/ShopCart";
import Send from "../icons/Send";
import Pay from "../icons/Pay";
import { useRouter } from "next/navigation";

interface StepProps {
  currentStep: number;
}

const Step: React.FC<StepProps> = ({ currentStep }) => {
  const steps = [
    { id: 0, label: "سبد خرید", icon: <ShopCart />, route: "/cart" },
    { id: 1, label: "ارسال", icon: <Send />, route: "/shipping" },
    { id: 2, label: "پرداخت", icon: <Pay />, route: "/payment" },
  ];
  const router = useRouter();

  return (
    <div className="mt-7">
      <div className="mt-16 w-[637px] max-md:hidden flex justify-between items-center relative">
        <div className="absolute top-1/2 left-0 w-full border-t border-gray-300 transform -translate-y-1/2"></div>
        <div
          className="absolute top-1/2 transform -translate-y-1/2 border-t-2 border-teal-500 transition-all duration-300"
          style={{
            width: `${(currentStep / (steps.length - 1)) * 100}%`,
          }}
        ></div>

        {steps.map((step) => (
          <div
            key={step.id}
            onClick={() => {
              if (step.id <= currentStep) {
                router.push(`${step.route}`);
              }
            }}
            className="flex flex-col items-center justify-center cursor-pointer relative z-10"
          >
            <p
              className={`text-2xl absolute -top-14 ${
                currentStep >= step.id ? "text-teal-500" : "text-gray-400"
              }`}
            >
              {step.icon}
            </p>
            <p
              className={`text-xl absolute -top-7 w-36 text-center ${
                currentStep === step.id
                  ? "text-teal-500 font-medium"
                  : currentStep > step.id
                  ? "text-teal-500 font-light"
                  : "text-customGray font-extralight"
              }`}
            >
              {step.label}
            </p>
            {/* نقطه */}
            <div
              className={`w-4 h-4 rounded-full border-2 ${
                currentStep >= step.id
                  ? "bg-teal-500 border-teal-500"
                  : "bg-lightGrayBlue2 border-gray-300"
              }`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step;