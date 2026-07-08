import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Mail, ArrowUp, Send, X } from "lucide-react";
import { PERSONAL_INFO } from "../../utills/constants";
import useMagnetic from "../../hooks/userMagnetic";

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

const WhatsAppButton = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [greetingTime] = useState(() => new Date());

  const isOnline = useIsLikelyOnline();

  const boxRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const whatsappRef = useMagnetic({
    strength: 0.25,
    radius: 90,
  });

  const topRef = useMagnetic({
    strength: 0.15,
    radius: 70,
  });

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
    setOpen(false);

    // Reset textarea height since we bypass the onChange handler here.
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  // Close on click outside.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus textarea whenever the chat opens.
  useEffect(() => {
    if (open) {
      const id = setTimeout(() => textareaRef.current?.focus(), 150);
      return () => clearTimeout(id);
    }
  }, [open]);

  // Auto-scroll chat area to bottom when the draft bubble appears/changes.
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [message, open]);

  // One-time tooltip nudge, auto-dismissing.
  useEffect(() => {
    const seen = sessionStorage?.getItem?.("whatsapp-tooltip-seen");
    if (!seen) {
      const showId = setTimeout(() => setShowTooltip(true), 2000);
      const hideId = setTimeout(() => {
        setShowTooltip(false);
        sessionStorage?.setItem?.("whatsapp-tooltip-seen", "1");
      }, 7000);
      return () => {
        clearTimeout(showId);
        clearTimeout(hideId);
      };
    }
  }, []);

  // Only show "back to top" once the user has scrolled a bit.
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value.slice(0, MAX_MESSAGE_LENGTH));

    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  const handleQuickMessage = (item: string) => {
    setMessage(item);
    // Let state settle, then focus + place cursor at the end.
    requestAnimationFrame(() => {
      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(item.length, item.length);
    });
  };

  const handleToggle = () => {
    setOpen((prev) => !prev);
    setShowTooltip(false);
  };

  const charsLeft = MAX_MESSAGE_LENGTH - message.length;
  const nearLimit = charsLeft <= 40;

  return (
    <div
      ref={boxRef}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-4"
    >
      {/* WhatsApp + Popup container */}
      <div className="relative flex justify-center">
        {/* First-visit tooltip nudge */}
        <div
          className={`
            absolute bottom-full right-0 mb-2
            whitespace-nowrap
            rounded-full
            bg-white
            px-3 py-1.5
            text-xs
            font-medium
            text-gray-800
            shadow-lg
            transition-all duration-300
            ${showTooltip && !open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-1 opacity-0"}
          `}
        >
          Chat with me 👋
        </div>

        {/* Chat Window */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label="WhatsApp chat"
          className={`
        absolute
        bottom-full
        mb-4
        right-0
        w-[calc(100vw-48px)]
        max-w-[360px]
        origin-bottom-right
        transition-all duration-300
        ${
          open
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-90 opacity-0"
        }
      `}
        >
          <div
            className="
          overflow-hidden
          rounded-2xl
          shadow-2xl
          border
          border-white/10
        "
          >
            {/* Header */}
            <div
              className="
            flex items-center gap-3
            bg-[#075E54]
            px-4 py-3
            text-white
          "
            >
              <div
                className="
              relative
              flex h-10 w-10
              items-center justify-center
              rounded-full
              bg-[#25D366]
            "
              >
                <FaWhatsapp className="h-5 w-5" />
                <span
                  className={`
                    absolute -bottom-0.5 -right-0.5
                    h-3 w-3
                    rounded-full
                    border-2 border-[#075E54]
                    ${isOnline ? "bg-green-400" : "bg-gray-400"}
                  `}
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

              <button onClick={() => setOpen(false)} aria-label="Close chat">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div
              ref={chatAreaRef}
              className="
            bg-[#ECE5DD]
            p-4
            space-y-3
            max-h-[280px]
            overflow-y-auto
          "
            >
              <div
                className="
              max-w-[80%]
              wrap-break-word
              rounded-lg
              rounded-tl-none
              bg-white
              px-3 py-2
              text-sm
              text-black
              shadow
            "
              >
                Hi 👋
                <br />
                Thanks for visiting my portfolio.
                <br />
                How can I help you?
                <div className="mt-1 text-right text-[10px] text-gray-400">
                  {formatTime(greetingTime)}
                </div>
              </div>

              {/* User Draft */}
              {message && (
                <div
                  className="
                ml-auto
                wrap-break-word
                max-w-[80%]
                rounded-lg
                rounded-tr-none
                bg-[#DCF8C6]
                px-3 py-2
                text-sm
                text-black
                shadow
              "
                >
                  {message}
                  <div className="mt-1 text-right text-[10px] text-gray-500">
                    {formatTime(new Date())}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Messages */}
            <div
              className="
            bg-[#ECE5DD]
            px-4
            pb-3
            flex
            flex-col
            gap-2
          "
            >
              {QUICK_MESSAGES.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickMessage(item)}
                  className="
                  rounded-lg
                  bg-white
                  px-3 py-2
                  text-left
                  text-xs
                  text-gray-700
                  shadow
                  hover:bg-gray-100
                  transition
                "
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
                  className="
                max-h-[120px]
                flex-1
                resize-none
                rounded-lg
                border
                border-gray-300
                bg-white
                px-3 py-2
                text-sm
                text-black
                outline-none
                focus:ring-1
                focus:ring-[#25D366]
              "
                />

                <button
                  onClick={sendMessage}
                  disabled={!message.trim()}
                  aria-label="Send message on WhatsApp"
                  className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-[#25D366]
                text-white
                transition
                hover:scale-105
                disabled:opacity-40
              "
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
                  href={
                    PERSONAL_INFO.email ? `mailto:${PERSONAL_INFO.email}` : "#"
                  }
                  className="underline hover:text-gray-600"
                >
                  No WhatsApp? Email instead
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Button */}
      <div className="relative">
        <button
          ref={whatsappRef as React.RefObject<HTMLButtonElement>}
          onClick={handleToggle}
          aria-label={open ? "Close WhatsApp chat" : "Open WhatsApp chat"}
          aria-expanded={open}
          className="
        relative
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        bg-primary
        text-[#212121]
        shadow-[0_0_30px_rgba(124,255,91,0.45)]
        transition
        hover:scale-110
      "
        >
          {!open && (
            <span
              className="
            absolute inset-0
            rounded-full
            bg-primary/40
            animate-ping
          "
            />
          )}

          <FaWhatsapp className="relative h-7 w-7" />
        </button>
      </div>

      {/* Back to top button */}
      <button
        ref={topRef as React.RefObject<HTMLButtonElement>}
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        aria-label="Back to top"
        className={`
      flex
      h-12
      w-12
      items-center
      justify-center
      rounded-full
      border
      border-white/10
      bg-white/5
      text-white/70
      backdrop-blur-xl
      shadow-lg
      transition-all
      duration-300
      hover:scale-110
      hover:border-primary/40
      hover:text-primary
      ${showBackToTop ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-2"}
    `}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
};

export default WhatsAppButton;
