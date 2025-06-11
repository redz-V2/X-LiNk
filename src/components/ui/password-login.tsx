import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XLogo } from "@/components/ui/x-logo";

interface PasswordLoginProps {
  onSuccess: () => void;
}

export const PasswordLogin = ({ onSuccess }: PasswordLoginProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Prevent any auto-logout or session timeout
  useEffect(() => {
    // Clear any existing timeouts or logout mechanisms
    console.log("🔐 Login component loaded - preventing auto-logout");

    // Store login session permanently
    const storeSession = () => {
      localStorage.setItem("x-link-session", "active");
      localStorage.setItem("x-link-session-start", new Date().toISOString());
    };

    storeSession();

    // Keep session alive every minute
    const sessionKeepAlive = setInterval(() => {
      localStorage.setItem("x-link-last-activity", new Date().toISOString());
      console.log("💓 Session keep-alive updated");
    }, 60000);

    return () => {
      clearInterval(sessionKeepAlive);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Faster login process - no unnecessary delays
    setTimeout(() => {
      if (password === "54787") {
        // Store successful login
        localStorage.setItem("x-link-authenticated", "true");
        localStorage.setItem("x-link-login-time", new Date().toISOString());
        console.log("✅ Login successful - session established");
        onSuccess();
      } else {
        setError("Incorrect password");
        setPassword("");
      }
      setIsLoading(false);
    }, 500); // Reduced from 1000ms to 500ms for faster response
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md bg-black/70 border-gray-700/50 backdrop-blur-2xl shadow-2xl">
        <CardHeader className="text-center pb-8">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="mb-6">
              <XLogo size={80} />
            </div>
            <CardTitle className="text-4xl font-bold text-white mb-3 tracking-wider">
              X-LiNk
            </CardTitle>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-3"></div>
            <p className="text-gray-400 text-sm uppercase tracking-wider font-medium">
              Secure Access Portal
            </p>
            <div className="mt-2 text-xs text-green-400 bg-green-900/20 px-2 py-1 rounded">
              🟢 Always Online
            </div>
          </motion.div>
        </CardHeader>
        <CardContent className="space-y-6 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Input
                type="password"
                placeholder="Enter security code"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black/60 border-gray-600/50 text-white placeholder:text-gray-500 h-14 text-center text-lg font-mono tracking-widest focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                disabled={isLoading}
                autoComplete="off"
              />
            </motion.div>

            {error && (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-red-400 text-sm font-medium bg-red-900/20 border border-red-500/30 rounded-lg py-2 px-4">
                  {error}
                </p>
              </motion.div>
            )}

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white h-14 font-semibold tracking-wide transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                disabled={isLoading || !password}
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Authenticating...
                  </div>
                ) : (
                  "INITIALIZE ACCESS"
                )}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};
