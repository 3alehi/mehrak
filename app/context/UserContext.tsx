'use client'
import { fetchUserData } from "@/utils/api/me";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface UserContextType {
  firstName: string | null;
  lastName: string | null;
  name: string | null;
  nationalNumber: string | null;
  email: string | null;
  emailVerifiedAt: string | null;
  mobile: string;
  mobileVerifiedAt: string | null;
  gender: string;
  gender_num: string;
  city: string | null;
  state: string | null;
  walletBalance: number;
  walletBalanceFormatted: string;
  followersCount: number;
  followingCount: number;
  has_password: boolean;
  setUserData: (data: UserContextType) => void;
  refetchUserData: () => void; // جدید: برای فراخوانی دوباره داده‌ها
}

const defaultUserContext: UserContextType = {
  firstName: null,
  lastName: null,
  name: null,
  nationalNumber: null,
  email: null,
  emailVerifiedAt: null,
  mobile: "",
  mobileVerifiedAt: null,
  gender: "",
  gender_num: "0",
  city: null,
  state: null,
  walletBalance: 0,
  has_password: false,
  walletBalanceFormatted: "0 تومان",
  
  followersCount: 11,
  followingCount: 12,
  setUserData: () => {},
  refetchUserData: () => {},
};

const UserContext = createContext<UserContextType>(defaultUserContext);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserContextType>(defaultUserContext);

  useEffect(() => {
    if (!userData.mobile) {
      fetchUserData()
        .then((res) => {
          
          const serverData = res?.data;
          if (serverData) {
            const transformedData: UserContextType = {
              firstName: serverData.first_name,
              lastName: serverData.last_name,
              name: serverData.name,
              nationalNumber: serverData.national_number,
              email: serverData.email,
              emailVerifiedAt: serverData.email_verified_at,
              mobile: serverData.mobile,
              mobileVerifiedAt: serverData.mobile_verified_at,
              gender: serverData.gender,
              gender_num: serverData.gender_num,
              city: serverData.city,
              state: serverData.state,
              walletBalance: serverData.wallet_balance,
              walletBalanceFormatted: serverData.wallet_balance_formatted,
              followersCount: serverData.followers_count,
              followingCount: serverData.following_count,
              has_password : serverData.has_password,
              setUserData: () => {},
              refetchUserData: () => {},
            };
            setUserData(transformedData);
          } else {
            console.warn("No data received from server.");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  
  }, []);

  const refetchUserData = () => {
    fetchUserData()
      .then((res) => {
        if (res?.data) {
          setUserData((prev) => ({
            ...prev,
            ...res.data,
          }));
        } else {
          console.warn("No data received during refetch.");
        }
      })
      .catch((error) => {
        console.error("Error refetching user data:", error);
      });
      
  };

  return (
    <UserContext.Provider value={{ ...userData, setUserData, refetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
