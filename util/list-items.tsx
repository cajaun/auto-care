import { logoutUser } from "@/services/auth-service";
import { router } from "expo-router";

export  const listItems = [
    {
      label: "History",
      icon: "time-outline",
      onPress: () => {
        router.push("/history");
      },
    },
    {
      label: "Notification",
      icon: "notifications-outline",
      isSwitch: true,
    },
    {
      label: "Setting",
      icon: "settings-outline",
      onPress: () => {
     
      },
    },
    {
      label: "Support",
      icon: "help-circle-outline",
      onPress: () => {
   
      },
    },
    {
      label: "Logout",
      icon: "log-out-outline",
      onPress: async () => {
        try {
          await logoutUser();
        } catch (error) {
          console.error("Logout failed", error);
        }
      },
    },
  ];