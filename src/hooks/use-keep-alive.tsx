import { useEffect } from "react";

export const useKeepAlive = () => {
  useEffect(() => {
    console.log("🔄 Keep-alive system activated");

    // Prevent browser from sleeping/idling
    const preventSleep = () => {
      // Keep the page active by requesting animation frame
      const keepActive = () => {
        requestAnimationFrame(keepActive);
      };
      keepActive();
    };

    // Start the keep-alive system
    preventSleep();

    // Prevent page unload/refresh accidentally
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = ""; // This will show browser confirmation dialog
    };

    // Keep session active with periodic activity
    const keepSessionActive = () => {
      // Update document title to show activity
      const originalTitle = document.title;
      document.title = "🟢 X-LiNk Active";

      setTimeout(() => {
        document.title = originalTitle;
      }, 1000);

      // Store activity timestamp
      localStorage.setItem("last-activity", new Date().toISOString());

      console.log("💓 Keep-alive heartbeat:", new Date().toISOString());
    };

    // Run keep-alive every 30 seconds
    const keepAliveInterval = setInterval(keepSessionActive, 30000);

    // Prevent page visibility changes from affecting the app
    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.log("📱 Page hidden - maintaining activity");
        keepSessionActive();
      } else {
        console.log("👁️ Page visible - activity resumed");
        keepSessionActive();
      }
    };

    // Add event listeners
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Keep mouse/keyboard activity alive
    const activityEvents = [
      "mousemove",
      "keydown",
      "click",
      "scroll",
      "touchstart",
    ];

    const handleActivity = () => {
      localStorage.setItem("last-user-activity", new Date().toISOString());
    };

    activityEvents.forEach((event) => {
      document.addEventListener(event, handleActivity, { passive: true });
    });

    // Initial activity
    keepSessionActive();

    // Cleanup function
    return () => {
      clearInterval(keepAliveInterval);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      activityEvents.forEach((event) => {
        document.removeEventListener(event, handleActivity);
      });

      console.log("🛑 Keep-alive system deactivated");
    };
  }, []);

  return {
    isActive: true,
    lastActivity: localStorage.getItem("last-activity"),
    lastUserActivity: localStorage.getItem("last-user-activity"),
  };
};
