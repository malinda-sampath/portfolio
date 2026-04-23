import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [, setOrbit] = useState(0);
  const [, setSignal] = useState(97);
  const [, setActiveIndex] = useState(0);
  const [, setMetrics] = useState({
    buildTime: 2.45,
    deploymentProgress: 65,
    systemUptime: 99.98,
    responsesProcessed: 12847,
  });

  const [messages] = useState([
    "Initiating scheduled maintenance window...",
    "Backing up portfolio database and assets...",
    "Disabling public-facing API endpoints...",
    "Freezing session management and auth tokens...",
    "Migrating infrastructure to new deployment region...",
    "Upgrading React components and type safety...",
    "Rebuilding optimization pipeline and bundle...",
    "Running comprehensive security audit...",
    "Executing automated test suite (2,847 tests)...",
    "Deploying UI redesign and new features...",
    "Validating routing and base path configuration...",
    "Synchronizing DNS records and CDN cache...",
    "Performing smoke tests on production environment...",
    "Restoration complete — portfolio returning online 🚀"
  ]);


  useEffect(() => {
    const interval = setInterval(() => {
      setOrbit((prev) => (prev + 2) % 360);
    }, 50);

    const signalInterval = setInterval(() => {
      setSignal((prev) => (prev > 92 ? prev - 0.08 : 99.8));
    }, 400);

    const metricsInterval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        deploymentProgress: Math.min(prev.deploymentProgress + 0.5, 95),
        responsesProcessed: prev.responsesProcessed + Math.floor(Math.random() * 15),
      }));
    }, 1000);

    const messageInterval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % messages.length);
    }, 1800);

    return () => {
      clearInterval(interval);
      clearInterval(signalInterval);
      clearInterval(metricsInterval);
      clearInterval(messageInterval);
    };
  }, [messages.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 text-white overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,197,246,.2)_25%,rgba(68,197,246,.2)_50%,transparent_50%,transparent_75%,rgba(68,197,246,.2)_75%,rgba(68,197,246,.2))] bg-[length:40px_40px]" />
      </div>

      {/* Orbital backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative w-full max-w-7xl mx-auto px-6 py-12"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
            MAINTENANCE WINDOW
          </h1>
          <p className="text-lg text-slate-300 mb-2">malinda.dev Portfolio System — Scheduled Upgrade</p>
          <p className="text-sm text-orange-400 font-mono">Expected restoration: N/A</p>
        </motion.div>

        

        {/* Maintenance Notice Footer */}
        <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-slate-700/50">
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-6 mb-6">
            <h3 className="text-orange-400 font-bold mb-2">Scheduled Maintenance Notice</h3>
            <p className="text-slate-300 text-sm mb-3">
              We're upgrading the portfolio infrastructure and redesigning the interface with new features. During this time, the site will be temporarily unavailable.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <p className="text-slate-400">Started</p>
                <p className="text-orange-400 font-mono">N/A</p>
              </div>
              <div>
                <p className="text-slate-400">Est. Complete</p>
                <p className="text-orange-400 font-mono">N/A</p>
              </div>
              <div>
                <p className="text-slate-400">Duration</p>
                <p className="text-orange-400 font-mono">N/A</p>
              </div>
              <div>
                <p className="text-slate-400">Status</p>
                <p className="text-orange-400 font-mono">In Progress</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-400 font-mono text-center">
            malinda-sampath • software engineer • full-stack development • api platforms
          </p>
          <p className="text-xs text-slate-500 mt-2 text-center">
            Thank you for your patience. We'll be back online soon with an improved experience!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}