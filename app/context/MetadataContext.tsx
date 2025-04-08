"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface MetadataContextType {
  title: string;
  description: string;
  setMetadata: (title: string, description: string) => void;
}

const MetadataContext = createContext<MetadataContextType | undefined>(undefined);

export const MetadataProvider = ({ children }: { children: ReactNode }) => {
  const [title, setTitle] = useState("عنوان پیش‌فرض سایت");
  const [description, setDescription] = useState("توضیحات پیش‌فرض سایت");

  const setMetadata = (newTitle: string, newDescription: string) => {
    setTitle(newTitle);
    setDescription(newDescription);
  };

  return (
    <MetadataContext.Provider value={{ title, description, setMetadata }}>
      {children}
    </MetadataContext.Provider>
  );
};

export const useMetadata = () => {
  const context = useContext(MetadataContext);
  if (!context) {
    throw new Error("useMetadata باید داخل MetadataProvider استفاده شود");
  }
  return context;
};
