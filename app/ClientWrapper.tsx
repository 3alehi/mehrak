// components/ClientWrapper.tsx
"use client";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CreatePassword from "@/components/CreatePassword";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/UserContext";
import { TotalItemsProvider } from "./context/ContextCartShop";
import { AppProvider } from "./context/context";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30,
      gcTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [show, setIsShow] = useState<boolean>(true);
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const password: string =
    typeof window !== "undefined"
      ? localStorage.getItem("hasPassword") ?? ""
      : "";

  useEffect(() => {
    if (
      pathname !== "/login" &&
      show &&
      password !== "true" &&
      password != ""
    ) {
      const timer = setTimeout(() => {
        setShowCreatePassword(true);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [pathname, show, password]);

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TotalItemsProvider>
          {pathname !== "/login" &&
            pathname !== "/shipping" &&
            pathname !== "/payment" &&
            !pathname.includes("/factor") && <Navbar />}
          {showCreatePassword && show && (
            <CreatePassword setIsShow={setIsShow} />
          )}
          <div
            className={` ${
              pathname.includes("/special") || pathname === "/"
                ? ""
                : "container mx-auto"
            } font-vazirmatn max-md:pb-5`}
          >
            <AppProvider>{children}</AppProvider>
            <Toaster position="bottom-left" />
          </div>
          {!pathname.includes("/profile") &&
            !pathname.includes("/login") &&
            !pathname.includes("/payment") &&
            !pathname.includes("/shipping") &&
            !pathname.includes("/factor") && <Footer />}
        </TotalItemsProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}
