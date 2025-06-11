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

        {/* Ultra-Premium Verify Gmail Card */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          whileHover={{ scale: 1.05, y: -12, rotateX: -5 }}
          whileTap={{ scale: 0.98 }}
          className="perspective-1000"
        >
          <Card className="card-professional border-orange-500/60 hover:border-orange-400/80 cursor-pointer h-full group relative overflow-hidden transform-gpu">
            {/* Premium card overlay effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-amber-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <CardHeader className="text-center pb-10 relative z-10">
              <div className="flex justify-center mb-10">
                <motion.div
                  className="relative p-10 bg-gradient-to-br from-orange-600/20 to-amber-700/30 rounded-3xl group-hover:from-orange-500/30 group-hover:to-amber-600/40 transition-all duration-500 shadow-2xl"
                  whileHover={{ rotate: -15, scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {/* Glowing ring around icon */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/30 to-amber-600/30 blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Shield className="w-24 h-24 text-orange-400 group-hover:text-orange-300 transition-colors relative z-10" />
                  {/* Premium security badges */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-orange-400/50"></div>
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-orange-400/50"></div>
                </motion.div>
              </div>
              <CardTitle className="text-4xl text-neon font-black tracking-wide mb-4">
                Verify Gmail Delete
              </CardTitle>
              <div className="w-20 h-1.5 bg-gradient-to-r from-orange-500 to-amber-400 mx-auto rounded-full shadow-lg"></div>
            </CardHeader>
            <CardContent className="text-center space-y-8 pb-10 relative z-10">
              <p className="text-orange-200 text-xl leading-relaxed font-medium">
                Military-grade verified deletion with dual authentication
                protocols
              </p>
              <div className="space-y-3 text-base text-orange-300/90">
                <div className="flex items-center justify-center gap-3 glass-premium px-4 py-2 rounded-full">
                  <div className="w-2.5 h-2.5 bg-orange-400 rounded-full animate-pulse"></div>
                  <span className="font-semibold">Enhanced Security</span>
                </div>
                <div className="flex items-center justify-center gap-3 glass-premium px-4 py-2 rounded-full">
                  <div className="w-2.5 h-2.5 bg-orange-400 rounded-full animate-pulse"></div>
                  <span className="font-semibold">Dual Authentication</span>
                </div>
                <div className="flex items-center justify-center gap-3 glass-premium px-4 py-2 rounded-full">
                  <div className="w-2.5 h-2.5 bg-orange-400 rounded-full animate-pulse"></div>
                  <span className="font-semibold">Verified Processing</span>
                </div>
              </div>
              <Button
                onClick={onDeleteVerifyGmail}
                className="w-full bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 hover:from-orange-500 hover:via-amber-400 hover:to-orange-500 text-white py-5 text-xl font-bold shadow-2xl hover:shadow-orange-500/40 transition-all duration-400 transform hover:scale-105 btn-professional group relative overflow-hidden"
                size="lg"
              >
                <div className="flex items-center justify-center gap-4 relative z-10">
                  <Shield className="w-6 h-6" />
                  <span className="tracking-wider">INITIALIZE PROCESS</span>
                  <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse"></div>
                </div>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Ultra-Premium Webhook Creation Card */}
        {!isCustomInstance && onCreateWebhook && (
          <motion.div
            initial={{ opacity: 0, x: 60, rotateY: 15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.05, y: -12, rotateY: -5 }}
            whileTap={{ scale: 0.98 }}
            className="lg:col-span-1 md:col-span-2 perspective-1000"
          >
            <Card className="card-professional border-purple-500/60 hover:border-purple-400/80 cursor-pointer h-full group relative overflow-hidden transform-gpu">
              {/* Premium card overlay effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <CardHeader className="text-center pb-10 relative z-10">
                <div className="flex justify-center mb-10">
                  <motion.div
                    className="relative p-10 bg-gradient-to-br from-purple-600/20 to-violet-700/30 rounded-3xl group-hover:from-purple-500/30 group-hover:to-violet-600/40 transition-all duration-500 shadow-2xl"
                    whileHover={{ rotate: 18, scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {/* Glowing ring around icon */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/30 to-violet-600/30 blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Webhook className="w-24 h-24 text-purple-400 group-hover:text-purple-300 transition-colors relative z-10" />
                    {/* Premium creation badge */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-purple-400/50"></div>
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-purple-400/50"></div>
                  </motion.div>
                </div>
                <CardTitle className="text-4xl text-neon font-black tracking-wide mb-4">
                  Create Webhook
                </CardTitle>
                <div className="w-20 h-1.5 bg-gradient-to-r from-purple-500 to-violet-400 mx-auto rounded-full shadow-lg"></div>
              </CardHeader>
              <CardContent className="text-center space-y-8 pb-10 relative z-10">
                <p className="text-purple-200 text-xl leading-relaxed font-medium">
                  Enterprise-grade webhook generation with personal instance
                  deployment
                </p>
                <div className="space-y-3 text-base text-purple-300/90">
                  <div className="flex items-center justify-center gap-3 glass-premium px-4 py-2 rounded-full">
                    <div className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="font-semibold">Custom Webhook URL</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 glass-premium px-4 py-2 rounded-full">
                    <div className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="font-semibold">Personal Instance</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 glass-premium px-4 py-2 rounded-full">
                    <div className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="font-semibold">Shareable Portal</span>
                  </div>
                </div>
                <Button
                  onClick={onCreateWebhook}
                  className="w-full bg-gradient-to-r from-purple-600 via-violet-500 to-purple-600 hover:from-purple-500 hover:via-violet-400 hover:to-purple-500 text-white py-5 text-xl font-bold shadow-2xl hover:shadow-purple-500/40 transition-all duration-400 transform hover:scale-105 btn-professional group relative overflow-hidden"
                  size="lg"
                >
                  <div className="flex items-center justify-center gap-4 relative z-10">
                    <Webhook className="w-6 h-6" />
                    <span className="tracking-wider">CREATE INSTANCE</span>
                    <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse"></div>
                  </div>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Ultra-Professional Footer */}
      <motion.div
        className="mt-32 text-center relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        {/* Premium separator */}
        <motion.div
          className="relative mb-10"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <div className="w-60 h-px bg-gradient-to-r from-transparent via-blue-400 via-purple-400 via-cyan-400 to-transparent mx-auto"></div>
          <div className="absolute inset-0 w-60 h-px bg-gradient-to-r from-transparent via-blue-400 via-purple-400 via-cyan-400 to-transparent mx-auto blur-sm"></div>
        </motion.div>

        {/* Professional badges */}
        <motion.div
          className="flex items-center justify-center gap-8 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <div className="glass-premium px-6 py-3 rounded-full border border-blue-500/30">
            <span className="text-blue-300 text-sm font-bold tracking-wider">
              ENTERPRISE SECURE
            </span>
          </div>
          <div className="glass-premium px-6 py-3 rounded-full border border-purple-500/30">
            <span className="text-purple-300 text-sm font-bold tracking-wider">
              MILITARY GRADE
            </span>
          </div>
          <div className="glass-premium px-6 py-3 rounded-full border border-emerald-500/30">
            <span className="text-emerald-300 text-sm font-bold tracking-wider">
              ULTRA RELIABLE
            </span>
          </div>
        </motion.div>

        <motion.p
          className="text-gray-400 text-lg font-light tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          POWERED BY ADVANCED ENTERPRISE TECHNOLOGY
        </motion.p>
      </motion.div>
    </div>
  );
};
