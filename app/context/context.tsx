import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { fetchUserData } from "@/utils/api/me";
import { useUserContext } from "./UserContext";

interface AppContextType {
  hasPassword: boolean;
  setHasPassword: (value: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { mobile } = useUserContext();
  const [hasPassword, setHasPassword] = useState<boolean>(false);
  useEffect(() => {
    if (mobile) {
 fetchUserData().then(res=>{
  setHasPassword(res.data.has_password)
 })
    }
  }, [mobile]);
  return (
    <AppContext.Provider value={{ hasPassword, setHasPassword }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
