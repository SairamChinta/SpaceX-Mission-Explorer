import "./global.css";
import NotificationController from "../components/NotificationController"; 
import Navbar from "../components/Navbar";
import { ReactNode } from "react";

export const metadata = {
  title: "SpaceX Mission Explorer",
  description: "Browse SpaceX launches with filters, favorites and details"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-slate-900 dark:bg-slate-900 dark:text-white min-h-screen">
        <Navbar />
        <main className="max-w-6xl mx-auto p-4">{children}
          <NotificationController />
        </main>
      </body>
    </html>
  );
}
