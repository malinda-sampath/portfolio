import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [, setOrbit] = useState(0);
  const [, setSignal] = useState(97);
  const [activeIndex, setActiveIndex] = useState(0);
  const [metrics, setMetrics] = useState({
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

  const techStack = [
    { label: "React", version: "18.2+" },
    { label: "TypeScript", version: "5.0+" },
    { label: "Vite", version: "5.0+" },
    { label: "Tailwind CSS", version: "3.4+" },
    { label: "Framer Motion", version: "10.16+" },
    { label: "GitHub Actions", version: "CI/CD" },
  ];

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
          <p className="text-sm text-orange-400 font-mono">Expected restoration: Unknown</p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* LEFT - Maintenance Status */}
          <motion.div
            variants={itemVariants}
            className="bg-slate-900/40 border border-orange-500/30 rounded-2xl p-8 backdrop-blur-xl hover:border-orange-400/60 transition-all"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse" />
              <h2 className="text-xl font-bold text-orange-400">Maintenance Status</h2>
            </div>

            <div className="relative w-full h-64 flex items-center justify-center mb-6">
              {/* Progress circle */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="55" fill="none" stroke="rgba(100, 116, 139, 0.2)" strokeWidth="8" />
                  <motion.circle
                    cx="60"
                    cy="60"
                    r="55"
                    fill="none"
                    stroke="url(#grad)"
                    strokeWidth="8"
                    strokeDasharray="345"
                    initial={{ strokeDashoffset: 345 }}
                    animate={{ strokeDashoffset: 345 - (metrics.deploymentProgress / 100) * 345 }}
                    transition={{ duration: 0.5 }}
                  />
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fb923c" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute text-center">
                  <div className="text-2xl font-bold text-orange-400">{metrics.deploymentProgress.toFixed(0)}%</div>
                  <div className="text-xs text-slate-400 mt-1">Complete</div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Elapsed Time</span>
                <span className="text-orange-400 font-mono">42m</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Estimated Remaining</span>
                <span className="text-orange-400 font-mono">18m - 38m</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-700/50 text-xs text-slate-400">
              <div className="flex justify-between mb-1">
                <span>Status</span>
                <span className="text-orange-400">In Progress</span>
              </div>
              <div className="flex justify-between">
                <span>Started</span>
                <span className="text-slate-300">12:30 UTC</span>
              </div>
            </div>
          </motion.div>

          {/* CENTER - Maintenance Log */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-1 bg-slate-900/40 border border-yellow-500/30 rounded-2xl p-8 backdrop-blur-xl hover:border-yellow-400/60 transition-all"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
              <h2 className="text-xl font-bold text-yellow-400">Maintenance Log</h2>
            </div>

            <div className="h-64 overflow-y-auto space-y-1 font-mono text-xs">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: i <= activeIndex ? 1 : 0.3, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`flex gap-2 ${i === activeIndex ? "text-yellow-400" : "text-slate-500"}`}
                >
                  <span className="flex-shrink-0">▸</span>
                  <span>{msg}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-4 text-center text-yellow-400 font-bold text-sm"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              ⚙ MAINTENANCE IN PROGRESS
            </motion.div>
          </motion.div>

          {/* RIGHT - What's Being Improved */}
          <motion.div
            variants={itemVariants}
            className="bg-slate-900/40 border border-blue-500/30 rounded-2xl p-8 backdrop-blur-xl hover:border-blue-400/60 transition-all"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
              <h2 className="text-xl font-bold text-blue-400">Improvements</h2>
            </div>

            <div className="space-y-4 text-sm">
              <div className="pb-4 border-b border-slate-700/50">
                <p className="text-slate-400 mb-1">Design Refresh</p>
                <p className="text-blue-300">Modern UI/UX with improved performance metrics</p>
              </div>

              <div className="pb-4 border-b border-slate-700/50">
                <p className="text-slate-400 mb-1">Code Quality</p>
                <p className="text-blue-300">React 18+, TypeScript stricter types, better error handling</p>
              </div>

              <div className="pb-4 border-b border-slate-700/50">
                <p className="text-slate-400 mb-1">Performance</p>
                <p className="text-blue-300">Optimized builds (2.45s), code splitting, asset minification</p>
              </div>

              <div className="pb-4 border-b border-slate-700/50">
                <p className="text-slate-400 mb-1">Security</p>
                <p className="text-blue-300">Enhanced routing validation, dependency audit, SSL/TLS</p>
              </div>

              <div>
                <p className="text-slate-400 mb-1">Infrastructure</p>
                <p className="text-blue-300">GitHub Actions CI/CD optimization, Pages deployment automation</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tech Stack Section */}
        <motion.div
          variants={itemVariants}
          className="bg-slate-900/40 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-xl"
        >
          <h3 className="text-lg font-bold text-slate-200 mb-6 flex items-center gap-2">
            <span className="text-amber-400">→</span> Production Stack
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {techStack.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:bg-slate-700/50 transition-all group cursor-pointer"
              >
                <div className="font-semibold text-sm text-slate-200 group-hover:text-cyan-400 transition-colors">
                  {tech.label}
                </div>
                <div className="text-xs text-slate-500 mt-1">{tech.version}</div>
              </motion.div>
            ))}
          </div>
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
                <p className="text-orange-400 font-mono">12:30 UTC</p>
              </div>
              <div>
                <p className="text-slate-400">Est. Complete</p>
                <p className="text-orange-400 font-mono">14:00 - 14:30 UTC</p>
              </div>
              <div>
                <p className="text-slate-400">Duration</p>
                <p className="text-orange-400 font-mono">1-2 hours</p>
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