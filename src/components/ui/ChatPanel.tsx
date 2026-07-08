import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Mail, Send, X } from "lucide-react";
import { PERSONAL_INFO } from "../../utills/constants";
import { useWhatsAppChat } from "../../context/WhatsAppChatContext";

const QUICK_MESSAGES = [
  "Hi Malinda, I would like to discuss a software engineering opportunity.",
  "Hi Malinda, I am interested in collaborating on a project.",
  "Hi Malinda, I would like to know more about your backend experience.",
];

const MAX_MESSAGE_LENGTH = 500;

// Rough "online" heuristic based on local time — purely cosmetic signal,
// not a real presence check.
const useIsLikelyOnline = () => {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const check = () => {
      const hour = new Date().getHours();
      setOnline(hour >= 8 && hour < 23);
    };
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);

  return online;
};

const formatTime = (date: Date) =>
  date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

interface ChatPanelProps {
  /** "floating" keeps the bottom-right card shadow; "inline" is meant to sit
   * inside another card/section without its own heavy shadow. */
  variant?: "floating" | "inline";
  className?: string;
}

const ChatPanel = ({
  variant = "floating",
  className = "",
}: ChatPanelProps) => {
  const { setIsChatOpen } = useWhatsAppChat();
  const [message, setMessage] = useState("");
  const [greetingTime] = useState(() => new Date());
  const isOnline = useIsLikelyOnline();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatAreaRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (!message.trim()) return;

    const encodedMessage = encodeURIComponent(
      message.slice(0, MAX_MESSAGE_LENGTH),
    );

    window.open(
      `https://wa.me/${PERSONAL_INFO.whatsapp}?text=${encodedMessage}`,
      "_blank",
    );

    setMessage("");
    setIsChatOpen(false);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  // Focus textarea on mount (i.e. whenever the panel appears).
  useEffect(() => {
    const id = setTimeout(() => textareaRef.current?.focus(), 150);
    return () => clearTimeout(id);
  }, []);

  // Auto-scroll chat area to bottom when the draft bubble appears/changes.
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [message]);

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value.slice(0, MAX_MESSAGE_LENGTH));
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  const handleQuickMessage = (item: string) => {
    setMessage(item);
    requestAnimationFrame(() => {
      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(item.length, item.length);
    });
  };

  const charsLeft = MAX_MESSAGE_LENGTH - message.length;
  const nearLimit = charsLeft <= 40;

  return (
    <div
      className={`
        overflow-hidden rounded-2xl border border-white/10 w-auto
        ${variant === "floating" ? "shadow-2xl" : "shadow-lg"}
        ${className}
      `}
    >
      {/* Header */}
      <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3 text-white">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]">
          <FaWhatsapp className="h-5 w-5" />
          <span
            className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#075E54] ${
              isOnline ? "bg-green-400" : "bg-gray-400"
            }`}
          />
        </div>

        <div className="flex-1">
          <h3 className="text-sm font-medium">Malinda Sampath</h3>
          <p className="text-xs text-white/70">
            {isOnline
              ? "Usually replies within a few hours"
              : "Away — will reply soon"}
          </p>
        </div>

        <button onClick={() => setIsChatOpen(false)} aria-label="Close chat">
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Chat Area */}
      <div
        ref={chatAreaRef}
        className="bg-[#ECE5DD] p-4 space-y-3 max-h-[280px] overflow-y-auto"
      >
        <div className="max-w-[80%] wrap-break-word rounded-lg rounded-tl-none bg-white px-3 py-2 text-sm text-black shadow">
          Hi 👋
          <br />
          Thanks for visiting my portfolio.
          <br />
          How can I help you?
          <div className="mt-1 text-right text-[10px] text-gray-400">
            {formatTime(greetingTime)}
          </div>
        </div>

        {message && (
          <div className="ml-auto wrap-break-word max-w-[80%] rounded-lg rounded-tr-none bg-[#DCF8C6] px-3 py-2 text-sm text-black shadow">
            {message}
            <div className="mt-1 text-right text-[10px] text-gray-500">
              {formatTime(new Date())}
            </div>
          </div>
        )}
      </div>

      {/* Quick Messages */}
      <div className="bg-[#ECE5DD] px-4 pb-3 flex flex-col gap-2">
        {QUICK_MESSAGES.map((item, index) => (
          <button
            key={index}
            onClick={() => handleQuickMessage(item)}
            className="rounded-lg bg-white px-3 py-2 text-left text-xs text-gray-700 shadow hover:bg-gray-100 transition"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Composer */}
      <div className="bg-[#f0f0f0] p-3">
        <div className="flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleMessageChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Type a message"
            rows={1}
            aria-label="Message to Malinda"
            className="max-h-[120px] flex-1 resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-black outline-none focus:ring-1 focus:ring-[#25D366]"
          />

          <button
            onClick={sendMessage}
            disabled={!message.trim()}
            aria-label="Send message on WhatsApp"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white transition hover:scale-105 disabled:opacity-40"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-1.5 flex items-center justify-between px-1">
          <span className="text-[10px] text-gray-400">
            Enter to send · Shift+Enter for new line
          </span>
          {message.length > 0 && (
            <span
              className={`text-[10px] ${nearLimit ? "text-red-500" : "text-gray-400"}`}
            >
              {charsLeft}
            </span>
          )}
        </div>

        <div className="mt-2 flex items-center justify-center gap-1 text-[10px] text-gray-400">
          <Mail className="h-3 w-3" />
          <a
            href={PERSONAL_INFO.email ? `mailto:${PERSONAL_INFO.email}` : "#"}
            className="underline hover:text-gray-600"
          >
            No WhatsApp? Email instead
          </a>
        </div>
      </div>
    </div>
  );
};

export default ChatPanel;
