import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface SuccessNotificationProps {
  onBackToDashboard: () => void;
}

export const SuccessNotification = ({
  onBackToDashboard,
}: SuccessNotificationProps) => {
  return (
    <motion.div
      className="flex items-center justify-center min-h-screen"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="w-full max-w-md bg-black/60 border-green-600/50 backdrop-blur-xl shadow-2xl">
        <CardHeader className="text-center pb-6">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <motion.div
              className="mb-4 p-3 bg-green-600/20 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <CheckCircle className="w-12 h-12 text-green-400" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-white mb-2">
              Request Submitted
            </CardTitle>
            <p className="text-green-300 text-sm text-center">
              Your request has been successfully processed and sent to the
              system.
            </p>
          </motion.div>
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              onClick={onBackToDashboard}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 font-semibold"
            >
              Back to Dashboard
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
