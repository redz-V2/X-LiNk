import { useState } from "react";
import { RainEffect } from "@/components/ui/rain-effect";
import { SnowEffect } from "@/components/ui/snow-effect";
import { PasswordLogin } from "@/components/ui/password-login";
import { Dashboard } from "@/components/ui/dashboard";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-black" />

      {/* Weather effects */}
      <RainEffect />
      <SnowEffect />

      {/* Main content */}
      <div className="relative z-10">
        {!isLoggedIn ? (
          <PasswordLogin onSuccess={handleLoginSuccess} />
        ) : (
          <Dashboard />
        )}
      </div>
    </div>
  );
};

export default Index;
