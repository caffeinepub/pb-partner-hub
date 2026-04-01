import { Outlet } from "@tanstack/react-router";
import Footer from "./Footer";
import Header from "./Header";
import WhatsAppFloatingButton from "./WhatsAppFloatingButton";
import ChatbotWidget from "./chatbot/ChatbotWidget";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ChatbotWidget />
      <WhatsAppFloatingButton />
    </div>
  );
}
