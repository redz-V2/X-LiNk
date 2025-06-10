import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Shield } from "lucide-react";

export const Dashboard = () => {
  const handleDeleteGmail = () => {
    alert("سيتم حذف Gmail");
  };

  const handleDeleteVerifyGmail = () => {
    alert("سيتم حذف Gmail المؤكد");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-bold text-white mb-4">X-LiNk</h1>
        <p className="text-blue-200 text-lg">اختر العملية المطلوبة</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Card className="bg-black/40 border-red-600 backdrop-blur-md hover:bg-black/50 transition-all duration-300 cursor-pointer h-full">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-red-600/20 rounded-full">
                  <Mail className="w-12 h-12 text-red-400" />
                </div>
              </div>
              <CardTitle className="text-2xl text-white">
                Delete Gmail
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-red-200 mb-6 text-lg">
                حذف حسابات Gmail العادية
              </p>
              <Button
                onClick={handleDeleteGmail}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 text-lg"
                size="lg"
              >
                ابدأ العملية
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Card className="bg-black/40 border-orange-600 backdrop-blur-md hover:bg-black/50 transition-all duration-300 cursor-pointer h-full">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-orange-600/20 rounded-full">
                  <Shield className="w-12 h-12 text-orange-400" />
                </div>
              </div>
              <CardTitle className="text-2xl text-white">
                Delete Verify Gmail
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-orange-200 mb-6 text-lg">
                حذف حسابات Gmail المؤكدة
              </p>
              <Button
                onClick={handleDeleteVerifyGmail}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 text-lg"
                size="lg"
              >
                ابدأ العملية
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        className="mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <p className="text-blue-300 text-center">
          © 2024 X-LiNk - نظام إدارة متقدم
        </p>
      </motion.div>
    </div>
  );
};
