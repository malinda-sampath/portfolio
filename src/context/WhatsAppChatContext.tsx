/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from "react";

interface WhatsAppChatContextValue {
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  isFooterInView: boolean;
  setIsFooterInView: (inView: boolean) => void;
}

const WhatsAppChatContext = createContext<WhatsAppChatContextValue | null>(
  null,
);

export const WhatsAppChatProvider = ({ children }: { children: ReactNode }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFooterInView, setIsFooterInView] = useState(false);

  return (
    <WhatsAppChatContext.Provider
      value={{ isChatOpen, setIsChatOpen, isFooterInView, setIsFooterInView }}
    >
      {children}
    </WhatsAppChatContext.Provider>
  );
};

export const useWhatsAppChat = () => {
  const ctx = useContext(WhatsAppChatContext);
  if (!ctx) {
    throw new Error(
      "useWhatsAppChat must be used within a WhatsAppChatProvider",
    );
  }
  return ctx;
};
