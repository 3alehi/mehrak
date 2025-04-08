// import { useQuery } from "@tanstack/react-query";
// import apiClient from "../api/apiClient";
// import { useParams } from "next/navigation";

// export const useApiLists = (key: string, url: string) => {
//   const { data, isLoading, error, refetch } = useQuery({
//     queryKey: [key],
//     queryFn: async () => {
//       const response = await apiClient.get(url);

//       return response.data.data[key];
//     },
//     staleTime: 10 * 60 * 1000,
//   });

//   const getList = (): any[] | null => {
//     return data;
//   };

//   const getTitle = (id: string, titleKey: string = "title"): string | null => {
//     const list = data;
//     if (Array.isArray(list)) {
//       const item = data.find((entry: any) => entry.id === id);
//       return item && item[titleKey] ? item[titleKey] : null;
//     }
//     return null;
//   };

//   const getId = (value: string, key: string = "title"): string | null => {
//     if (Array.isArray(data)) {
//       const item = data.find((entry: any) => entry[key] === value);
//       return item ? item.id : null;
//     }
//     return null;
//   };

//   return { data, isLoading, error, refetch, getList, getTitle, getId };
// };



// inpoer useParams


// const { getList}=useApiList("categories", "/caegrories")