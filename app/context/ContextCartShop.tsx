"use client";
import { getCart } from "@/utils/api/getCart";
import { getTokenFromCookie } from "@/utils/helper/getCooki";
import { getTotalquantity } from "@/utils/helper/setProductBuy";
import { useQuery } from "@tanstack/react-query";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
interface MediaFileC {
  order: number;
  tag: string;
  collection_name: string;
  main_link: string;
  conversion_links: {
      [key: string]: string;
  };
}

interface CollectionC {
  id: number;
  title: string;
  description: string;
  products_count: number | null;
  media_files: MediaFileC[];
}

interface ProductC {
  id: number;
  quantity: number;
  discount_applied: number;
  total_discount_amount: number | null;
  total_final_price: number | null;
  old_main_price: number;
  old_price: number;
  is_active: number;
  type: string;
  structure: string;
  structure_title: string;
  type_title: string;
  slug: string;
  title: string;
  sub_title: string;
  weight: number;
  description: string;
  main_price: number;
  price: number;
  sale_percent: number;
  main_price_formatted: string;
  price_formatted: string;
  currency: string;
  min_number: number;
  max_number: number;
  in_stock_count: number;
  is_liked: boolean;
  media_files: MediaFileC[];
  collections: CollectionC[];
}

interface AddressC {
  id: number;
  address: string;
  full_address: string;
  state_id: number;
  city_id: number;
  postal_code: string;
  mobile: string;
  phone: string;
  last_name: string;
  first_name: string;
  for_me: number;
}

interface UserC {
  first_name: string;
  last_name: string;
  name: string;
  mobile: string;
  mobile_verified_at: string;
  type: string;
  gender: string;
  gender_num: string;
  city: string;
  state: string;
  addresses: AddressC[];
}

interface CartDataC {
  id: number;
  items: ProductC[];
  shipping_price: number | null;
  shipping_price_formatted: string;
  is_shipping_free: boolean;
  discount: number | null;
  currency: string;
  address: AddressC;
  address_id: number;
  user: UserC;
}
interface TotalItemsContextType {
  totalItems: number;
  setTotalItems: (value: number) => void;
  refetch: () => void;
  
  data: CartDataC | null ;
  isLoading: boolean;
}

const defaultValue: TotalItemsContextType = {
  totalItems: 0,
  setTotalItems: () => {},
  refetch: () => {},
  data: null,
  isLoading: false, 
};

const TotalItemsContext = createContext<TotalItemsContextType>(defaultValue);

export const useTotalItems = () => useContext(TotalItemsContext);

interface TotalItemsProviderProps {
  children: ReactNode;
}

export const TotalItemsProvider: React.FC<TotalItemsProviderProps> = ({
  children,
}) => {
  const [totalItems, setTotalItems] = useState<number>(defaultValue.totalItems);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  useEffect(()=>{
    if(!getTokenFromCookie()){
      setTotalItems(getTotalquantity())
  
    }
  
  })
  useEffect(() => {
    
  if(getTokenFromCookie()){
    if (!isLoading && data?.data?.total_items) {
      setTotalItems(data.data.total_items);
    }
  }else{
    setTotalItems(getTotalquantity())
  }
  }, [data, isLoading]);

  return (
    <TotalItemsContext.Provider
      value={{ totalItems, setTotalItems, refetch, data : data?.data, isLoading }} 
    >
      {children}
    </TotalItemsContext.Provider>
  );
};
