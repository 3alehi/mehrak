import CreatePasswordIcon from "./icons/CreatePasswordIcon";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
interface CreatePasswordProps {
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreatePassword: React.FC<CreatePasswordProps> = ({ setIsShow }) => {
  const rout = useRouter();
  return (
    <div className="font-vazirmatn">
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50 px-4 sm:px-6">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm sm:max-w-md p-6">
        <div className="text-center">
          <CreatePasswordIcon/>
          <p className="text-aquaBlue text-lg sm:text-xl font-semibold mt-4">
            با موفقیت وارد مهرا شدید.
          </p>
          <p className="text-customGray text-sm sm:text-base mt-2">
            برای تجربه خرید بهتر، رمز عبور تعریف کنید.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <Button
            className="flex-1 py-3 text-base sm:text-lg font-medium text-customGray bg-lightGray border border-CloudGray rounded-lg hover:bg-gray-100"
            onClick={() => {
              setIsShow(false);
              localStorage.clear();
            }}
          >
            ادامه خرید
          </Button>
          <Button
            className="flex-1 py-3 text-base sm:text-lg font-medium text-white bg-aquaBlue rounded-lg hover:bg-aquaBlue-dark"
            onClick={() => {
              setIsShow(false);
              rout.push("/profile/edit");
              localStorage.clear();
            }}
          >
            تعیین رمز عبور
          </Button>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default CreatePassword;
