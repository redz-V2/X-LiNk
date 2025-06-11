import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XLogo } from "@/components/ui/x-logo";
import { Lock, Shield, Eye, EyeOff } from "lucide-react";

interface PasswordLoginProps {
  onSuccess: () => void;
}

export const PasswordLogin = ({ onSuccess }: PasswordLoginProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Prevent any auto-logout or session timeout
  useEffect(() => {
    console.log("🔐 Professional login portal initialized");

    const storeSession = () => {
      localStorage.setItem("x-link-session", "active");
      localStorage.setItem("x-link-session-start", new Date().toISOString());
    };

    storeSession();

    const sessionKeepAlive = setInterval(() => {
      localStorage.setItem("x-link-last-activity", new Date().toISOString());
    }, 60000);

    return () => {
      clearInterval(sessionKeepAlive);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      if (password === "54787") {
        localStorage.setItem("x-link-authenticated", "true");
        localStorage.setItem("x-link-login-time", new Date().toISOString());
        console.log("✅ Authentication successful - access granted");
        onSuccess();
      } else {
        setAttempts((prev) => prev + 1);
        setError("Invalid security credentials");
        setPassword("");
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {/* Professional Background Blur */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.4, 0, 0.2, 1],
          type: "spring",
          stiffness: 100,
        }}
      >
        <Card className="card-professional border-0 shadow-2xl">
          <CardHeader className="text-center pb-8 pt-12">
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-col items-center"
            >
              {/* Enhanced Logo Section */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl scale-150" />
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <XLogo size={100} />
                </motion.div>
              </div>

              {/* Professional Branding */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center"
              >
                <CardTitle className="text-5xl font-bold mb-4 tracking-tight">
                  <span className="metallic-text">X-LiNk</span>
                </CardTitle>

                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500" />
                  <Shield className="w-5 h-5 text-blue-400" />
                  <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-500" />
                </div>

                <p className="text-gray-400 text-sm uppercase tracking-[0.2em] font-medium mb-2">
                  Professional Access Portal
                </p>

                <div className="flex items-center justify-center gap-2 text-xs text-green-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="font-mono">SYSTEM ONLINE</span>
                </div>
              </motion.div>
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-6 px-8 pb-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Security Code Input */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-gray-300 tracking-wide">
                  Security Credentials
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center">
                    <Lock className="w-4 h-4 text-gray-500" />
                  </div>

                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter access code"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 pr-12 h-14 text-center text-lg font-mono tracking-[0.3em] glass-effect border-gray-700/50 focus:border-blue-500/70 focus:ring-blue-500/20 transition-all duration-300"
                    disabled={isLoading}
                    autoComplete="off"
                    spellCheck={false}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </motion.div>

              {/* Security Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="flex justify-between items-center text-xs"
              >
                <div className="flex items-center gap-2 text-gray-500">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                  <span className="font-mono">SSL Secured</span>
                </div>

                <div className="flex items-center gap-2 text-gray-500">
                  <span className="font-mono">Attempts: {attempts}/∞</span>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                </div>
              </motion.div>

              {/* Error Display */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="glass-effect border-red-500/50 rounded-lg p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                    <p className="text-red-400 text-sm font-medium">{error}</p>
                  </div>
                </motion.div>
              )}

              {/* Professional Submit Button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <Button
                  type="submit"
                  disabled={isLoading || !password}
                  className="btn-professional w-full h-14 font-semibold tracking-wide text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <div className="loading-professional" />
                      <span>AUTHENTICATING</span>
                      <div className="flex gap-1">
                        <div
                          className="w-1 h-1 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <div
                          className="w-1 h-1 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <div
                          className="w-1 h-1 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5" />
                      <span>INITIALIZE ACCESS</span>
                      <div className="w-2 h-2 bg-white rounded-full opacity-50" />
                    </div>
                  )}
                </Button>
              </motion.div>
            </form>

            {/* Professional Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="text-center space-y-4 pt-6 border-t border-gray-800/50"
            >
              <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-gray-500 rounded-full" />
                  <span className="font-mono">256-BIT ENCRYPTION</span>
                </div>
                <div className="w-px h-3 bg-gray-700" />
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-gray-500 rounded-full" />
                  <span className="font-mono">ZERO-LOG POLICY</span>
                </div>
              </div>

              <p className="text-xs text-gray-600 font-mono">
                PROFESSIONAL SECURITY PORTAL v2.0
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
