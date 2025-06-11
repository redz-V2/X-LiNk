import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Shield, Trash2, Webhook, Zap, Star, Crown } from "lucide-react";
import { XLogo } from "@/components/ui/x-logo";

interface DashboardProps {
  onDeleteGmail: () => void;
  onDeleteVerifyGmail: () => void;
  onCreateWebhook?: () => void;
}

export const Dashboard = ({
  onDeleteGmail,
  onDeleteVerifyGmail,
  onCreateWebhook,
}: DashboardProps) => {
  // Check if this is a custom instance (hide webhook creation)
  const urlParams = new URLSearchParams(window.location.search);
  const isCustomInstance = urlParams.get("ref");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative">
      {/* Ultra-Premium Background Enhancement */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400/60 rounded-full animate-pulse-ultra-slow"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400/60 rounded-full animate-float"></div>
        <div className="absolute bottom-32 left-20 w-3 h-3 bg-cyan-400/40 rounded-full animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-1.5 h-1.5 bg-emerald-400/60 rounded-full animate-float"></div>
      </div>

      {/* Ultra-Professional Header */}
      <motion.div
        className="text-center mb-24 relative"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Premium Logo Container */}
        <motion.div
          className="flex justify-center mb-8 relative"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="relative">
            {/* Glow effect behind logo */}
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl scale-150 animate-pulse-ultra-slow"></div>
            <div className="absolute inset-0 bg-purple-500/10 rounded-full blur-3xl scale-200 animate-pulse-slow"></div>
            <XLogo size={140} />
            {/* Premium badge */}
            <motion.div
              className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1, type: "spring", stiffness: 300 }}
            >
              <Crown className="w-4 h-4 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Ultra-Premium Title */}
        <motion.h1
          className="text-8xl font-black text-holographic mb-8 tracking-wider drop-shadow-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          X-LiNk
        </motion.h1>

        {/* Premium Separator */}
        <motion.div
          className="relative mb-8"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="w-40 h-2 bg-gradient-to-r from-blue-500 via-purple-500 via-cyan-500 to-emerald-500 mx-auto rounded-full shadow-lg"></div>
          <div className="absolute inset-0 w-40 h-2 bg-gradient-to-r from-blue-500 via-purple-500 via-cyan-500 to-emerald-500 mx-auto rounded-full blur-sm"></div>
        </motion.div>

        {/* Ultra-Professional Subtitle */}
        <motion.p
          className="text-premium-gradient text-3xl font-bold tracking-wide mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Ultra Professional Management System
        </motion.p>

        {/* Premium Status Indicators */}
        <motion.div
          className="flex items-center justify-center gap-8 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="flex items-center gap-2 glass-premium px-4 py-2 rounded-full">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-300 text-sm font-bold">PREMIUM</span>
          </div>
          <div className="flex items-center gap-2 glass-premium px-4 py-2 rounded-full">
            <Star className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-sm font-bold">ENTERPRISE</span>
          </div>
          <div className="flex items-center gap-2 glass-premium px-4 py-2 rounded-full">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-green-300 text-sm font-bold">SECURE</span>
          </div>
        </motion.div>

        {/* Custom Instance Badge */}
        {isCustomInstance && (
          <motion.div
            className="inline-block px-6 py-3 glass-ultra rounded-2xl border-2 border-purple-500/50"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 1.2, type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
              <p className="text-purple-300 text-lg font-bold tracking-wide">
                Custom Instance Portal
              </p>
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
            </div>
          </motion.div>
        )}
      </motion.div>

      <div
        className={`grid gap-10 max-w-6xl w-full ${
          isCustomInstance
            ? "md:grid-cols-2 grid-cols-1"
            : "lg:grid-cols-3 md:grid-cols-2 grid-cols-1"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ scale: 1.03, y: -8 }}
          whileTap={{ scale: 0.97 }}
        >
          <Card className="bg-black/60 border-red-500/40 backdrop-blur-2xl hover:bg-black/70 transition-all duration-500 cursor-pointer h-full group shadow-2xl hover:shadow-red-500/25">
            <CardHeader className="text-center pb-8">
              <div className="flex justify-center mb-8">
                <motion.div
                  className="p-8 bg-gradient-to-br from-red-600/30 to-red-700/40 rounded-3xl group-hover:from-red-500/40 group-hover:to-red-600/50 transition-all duration-500 shadow-lg"
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Trash2 className="w-20 h-20 text-red-400 group-hover:text-red-300 transition-colors" />
                </motion.div>
              </div>
              <CardTitle className="text-3xl text-white font-bold tracking-wide mb-2">
                Delete Gmail
              </CardTitle>
              <div className="w-16 h-1 bg-red-500 mx-auto rounded-full"></div>
            </CardHeader>
            <CardContent className="text-center space-y-6 pb-8">
              <p className="text-red-200 text-lg leading-relaxed">
                Standard Gmail account deletion process. Requires Roblox
                authentication cookies.
              </p>
              <div className="space-y-2 text-sm text-red-300/80">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span>Quick processing</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span>Cookie authentication</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span>Instant execution</span>
                </div>
              </div>
              <Button
                onClick={onDeleteGmail}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white py-4 text-lg font-semibold shadow-xl hover:shadow-red-500/30 transition-all duration-300 transform hover:scale-105"
                size="lg"
              >
                <Mail className="w-5 h-5 mr-3" />
                Initialize Process
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.03, y: -8 }}
          whileTap={{ scale: 0.97 }}
        >
          <Card className="bg-black/60 border-orange-500/40 backdrop-blur-2xl hover:bg-black/70 transition-all duration-500 cursor-pointer h-full group shadow-2xl hover:shadow-orange-500/25">
            <CardHeader className="text-center pb-8">
              <div className="flex justify-center mb-8">
                <motion.div
                  className="p-8 bg-gradient-to-br from-orange-600/30 to-orange-700/40 rounded-3xl group-hover:from-orange-500/40 group-hover:to-orange-600/50 transition-all duration-500 shadow-lg"
                  whileHover={{ rotate: -8, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Shield className="w-20 h-20 text-orange-400 group-hover:text-orange-300 transition-colors" />
                </motion.div>
              </div>
              <CardTitle className="text-3xl text-white font-bold tracking-wide mb-2">
                Delete Verify Gmail
              </CardTitle>
              <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full"></div>
            </CardHeader>
            <CardContent className="text-center space-y-6 pb-8">
              <p className="text-orange-200 text-lg leading-relaxed">
                Advanced verified Gmail deletion. Requires both authentication
                cookies and password.
              </p>
              <div className="space-y-2 text-sm text-orange-300/80">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Enhanced security</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Dual authentication</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span>Verified processing</span>
                </div>
              </div>
              <Button
                onClick={onDeleteVerifyGmail}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white py-4 text-lg font-semibold shadow-xl hover:shadow-orange-500/30 transition-all duration-300 transform hover:scale-105"
                size="lg"
              >
                <Shield className="w-5 h-5 mr-3" />
                Initialize Process
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Only show webhook creation if NOT a custom instance */}
        {!isCustomInstance && onCreateWebhook && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.03, y: -8 }}
            whileTap={{ scale: 0.97 }}
            className="lg:col-span-1 md:col-span-2"
          >
            <Card className="bg-black/60 border-purple-500/40 backdrop-blur-2xl hover:bg-black/70 transition-all duration-500 cursor-pointer h-full group shadow-2xl hover:shadow-purple-500/25">
              <CardHeader className="text-center pb-8">
                <div className="flex justify-center mb-8">
                  <motion.div
                    className="p-8 bg-gradient-to-br from-purple-600/30 to-purple-700/40 rounded-3xl group-hover:from-purple-500/40 group-hover:to-purple-600/50 transition-all duration-500 shadow-lg"
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Webhook className="w-20 h-20 text-purple-400 group-hover:text-purple-300 transition-colors" />
                  </motion.div>
                </div>
                <CardTitle className="text-3xl text-white font-bold tracking-wide mb-2">
                  Create Webhook
                </CardTitle>
                <div className="w-16 h-1 bg-purple-500 mx-auto rounded-full"></div>
              </CardHeader>
              <CardContent className="text-center space-y-6 pb-8">
                <p className="text-purple-200 text-lg leading-relaxed">
                  Generate your own X-LiNk instance with custom webhook. Create
                  your personal management portal.
                </p>
                <div className="space-y-2 text-sm text-purple-300/80">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Custom webhook URL</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Personal instance</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Share with others</span>
                  </div>
                </div>
                <Button
                  onClick={onCreateWebhook}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white py-4 text-lg font-semibold shadow-xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105"
                  size="lg"
                >
                  <Webhook className="w-5 h-5 mr-3" />
                  Create Instance
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      <motion.div
        className="mt-20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="w-40 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent mx-auto mb-6 rounded-full"></div>
        <p className="text-gray-500 text-sm font-light tracking-wider">
          SECURE • RELIABLE • PROFESSIONAL
        </p>
      </motion.div>
    </div>
  );
};
