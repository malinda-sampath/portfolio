import NavBar from "./components/layout/NavBar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import RadialGradientBackground from "./components/backgrounds/RadialGradientBackground";
import Skills from "./components/sections/Skills";
import Footer from "./components/layout/Footer";
import WhatsAppButton from "./components/ui/WhatsAppButton";
import { WhatsAppChatProvider } from "./context/WhatsAppChatContext";

const App = () => {
  return (
    <WhatsAppChatProvider>
      <div className="min-h-screen bg-black">
        <RadialGradientBackground variant="full-page" />
        <div className="noise-overlay" aria-hidden="true" />
        <NavBar />
        <main>
          <Hero />
          <About />
          <Skills />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </WhatsAppChatProvider>
  );
};

export default App;
