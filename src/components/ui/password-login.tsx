import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";

interface PasswordLoginProps {
  onSuccess: () => void;
}

export const PasswordLogin = ({ onSuccess }: PasswordLoginProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate login process
    setTimeout(() => {
      if (password === "54787") {
        onSuccess();
      } else {
        setError("Incorrect password");
        setPassword("");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md bg-black/60 border-gray-700 backdrop-blur-xl shadow-2xl">
        <CardHeader className="text-center pb-6">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="mb-4 p-3 bg-blue-600/20 rounded-full">
              <Lock className="w-8 h-8 text-blue-400" />
            </div>
            <CardTitle className="text-4xl font-bold text-white mb-2 tracking-wide">
              X-LiNk
            </CardTitle>
            <p className="text-gray-400 text-sm uppercase tracking-wider">
              Access Portal
            </p>
          </motion.div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black/50 border-gray-600 text-white placeholder:text-gray-500 h-12 focus:border-blue-500 transition-colors"
                disabled={isLoading}
              />
            </motion.div>

            {error && (
              <motion.p
                className="text-red-400 text-sm text-center font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.p>
            )}

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 font-semibold tracking-wide transition-all duration-200"
                disabled={isLoading || !password}
              >
                {isLoading ? "Authenticating..." : "ACCESS SYSTEM"}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};
