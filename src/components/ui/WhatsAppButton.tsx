import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { ArrowUp, Send, X } from "lucide-react";
import { PERSONAL_INFO } from "../../utills/constants";
import useMagnetic from "../../hooks/userMagnetic";

const QUICK_MESSAGES = [
  "Hi Malinda, I would like to discuss a software engineering opportunity.",
  "Hi Malinda, I am interested in collaborating on a project.",
  "Hi Malinda, I would like to know more about your backend experience.",
];

const WhatsAppButton = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const boxRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
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

    const encodedMessage = encodeURIComponent(message);

    window.open(
      `https://wa.me/${PERSONAL_INFO.whatsapp}?text=${encodedMessage}`,
      "_blank",
    );

    setMessage("");
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
  };

  return (
    <div
      ref={boxRef}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-4"
    >
      {/* WhatsApp + Popup container */}
      <div className="relative flex justify-center">
        {/* Chat Window */}
        <div
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
              flex h-10 w-10
              items-center justify-center
              rounded-full
              bg-[#25D366]
            "
              >
                <FaWhatsapp className="h-5 w-5" />
              </div>

              <div className="flex-1">
                <h3 className="text-sm font-medium">Malinda Sampath</h3>

                <p className="text-xs text-white/70">
                  Available for opportunities
                </p>
              </div>

              <button onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div
              className="
            bg-[#ECE5DD]
            p-4
            space-y-3
          "
            >
              <div
                className="
              max-w-[80%]
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
              </div>

              {/* User Draft */}
              {message && (
                <div
                  className="
                ml-auto
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
                  onClick={() => setMessage(item)}
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
            <div
              className="
            flex
            items-end
            gap-2
            bg-[#f0f0f0]
            p-3
          "
            >
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
          </div>
        </div>
      </div>

      {/* Floating Button */}
      <div className="relative">
        <button
          ref={whatsappRef as React.RefObject<HTMLButtonElement>}
          onClick={() => setOpen(!open)}
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
        className="
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
    "
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
};

export default WhatsAppButton;
