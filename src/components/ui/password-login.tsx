import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        setError("كلمة المرور غير صحيحة");
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
      <Card className="w-full max-w-md bg-black/40 border-blue-800 backdrop-blur-md">
        <CardHeader className="text-center">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <CardTitle className="text-3xl font-bold text-white mb-2">
              X-LiNk
            </CardTitle>
            <p className="text-blue-200">أدخل كلمة المرور للدخول</p>
          </motion.div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Input
                type="password"
                placeholder="كلمة المرور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black/50 border-blue-700 text-white placeholder:text-blue-300"
                disabled={isLoading}
              />
            </motion.div>

            {error && (
              <motion.p
                className="text-red-400 text-sm text-center"
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
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading || !password}
              >
                {isLoading ? "جاري التحقق..." : "دخول"}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};
