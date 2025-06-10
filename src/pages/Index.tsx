import { motion } from "framer-motion";
import { RainEffect } from "@/components/ui/rain-effect";
import { SnowEffect } from "@/components/ui/snow-effect";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-black" />

      {/* Weather effects */}
      <RainEffect />
      <SnowEffect />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <motion.header
          className="p-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <nav className="flex justify-between items-center max-w-7xl mx-auto">
            <motion.h1
              className="text-3xl font-bold text-white"
              whileHover={{ scale: 1.05 }}
            >
              Professional Website
            </motion.h1>
            <div className="flex gap-6">
              <Button
                variant="ghost"
                className="text-white hover:text-blue-300"
              >
                Home
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:text-blue-300"
              >
                About
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:text-blue-300"
              >
                Services
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:text-blue-300"
              >
                Contact
              </Button>
            </div>
          </nav>
        </motion.header>

        {/* Hero section */}
        <main className="flex-1 flex items-center justify-center px-8">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <h2 className="text-6xl md:text-8xl font-bold text-white mb-6 bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
                Welcome
              </h2>
              <p className="text-xl md:text-2xl text-blue-200 mb-12 max-w-4xl mx-auto leading-relaxed">
                Experience a professional website with stunning visual effects.
                Built with modern technologies and elegant design principles.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
                  >
                    Get Started
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-blue-400 text-blue-300 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg"
                  >
                    Learn More
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Feature cards */}
            <motion.div
              className="grid md:grid-cols-3 gap-8 mt-16"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="bg-black/30 border-blue-800 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white text-xl">
                      Modern Design
                    </CardTitle>
                    <CardDescription className="text-blue-200">
                      Clean and professional interface with stunning visual
                      effects
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-blue-100">
                      Experience the perfect blend of aesthetics and
                      functionality with our modern design approach.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="bg-black/30 border-blue-800 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white text-xl">
                      High Performance
                    </CardTitle>
                    <CardDescription className="text-blue-200">
                      Optimized for speed and smooth animations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-blue-100">
                      Built with cutting-edge technologies to ensure fast
                      loading and smooth user experience.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="bg-black/30 border-blue-800 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white text-xl">
                      Responsive
                    </CardTitle>
                    <CardDescription className="text-blue-200">
                      Perfect on all devices and screen sizes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-blue-100">
                      Fully responsive design that adapts beautifully to
                      desktop, tablet, and mobile devices.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </main>

        {/* Footer */}
        <motion.footer
          className="p-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <p className="text-blue-300">
            © 2024 Professional Website. Built with passion and modern
            technology.
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;
