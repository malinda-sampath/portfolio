import NavBar from "./components/layout/NavBar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import RadialGradientBackground from "./components/backgrounds/RadialGradientBackground";

const App = () => {
  return (
    <div className="min-h-screen bg-black pb-[100vh]">
      <NavBar />
      <main>
        <RadialGradientBackground variant="full-page" />
        <Hero />
        <About />
      </main>
    </div>
  );
};

export default App;
