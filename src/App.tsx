import NavBar from "./components/layout/NavBar";
import RadialGradientBackground from "./components/backgrounds/RadialGradientBackground";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Footer from "./components/layout/Footer";
import BackToTopButton from "./components/ui/BackToTopButton";
import Projects from "./components/sections/Projects";
import Certificate from "./components/sections/Certifications";

const App = () => {
  return (
    <div className="min-h-screen">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-1100 focus:bg-accent focus:text-black focus:px-4 focus:py-2 focus:rounded-md focus:font-semibold"
      >
        Skip to content
      </a>
      <RadialGradientBackground variant="full-page" />
      <div className="noise-overlay" aria-hidden="true" />
      <NavBar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certificate />
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default App;
