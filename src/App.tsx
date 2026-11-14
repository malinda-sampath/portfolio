import NavBar from "./components/layout/NavBar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import RadialGradientBackground from "./components/backgrounds/RadialGradientBackground";
import Skills from "./components/sections/Skills";
import Footer from "./components/layout/Footer";
import BackToTopButton from "./components/ui/BackToTopButton";
import Projects from "./components/sections/Projects";
import Certificate from "./components/sections/Certifications";

const App = () => {
  return (
    <div className="min-h-screen bg-black">
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
