import "dotenv/config";

export default {
  expo: {
    name: "auto-care-components",
    slug: "auto-care-components",
    extra: {
      API_KEY: process.env.API_KEY,
      AUTH_DOMAIN: process.env.AUTH_DOMAIN,
      PROJECT_ID: process.env.PROJECT_ID,
      STORAGE_BUCKET: process.env.STORAGE_BUCKET,
      MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
      APP_ID: process.env.APP_ID,
      MEASUREMENT_ID: process.env.MEASUREMENT_ID,
      eas: {
        "projectId": "de436f27-9d99-4889-af5b-40b7e0ab027d"
      }
    },
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      bundleIdentifier: "com.anonymous.autocarecomponents",
      supportsTablet: true,
      googleServicesFile: "./GoogleService-Info.plist"
    },
    android: {
      package: "com.anonymous.autocarecomponents",
      googleServicesFile: "./google-services.json",
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      
      "expo-router",
      [
        "react-native-fbsdk-next",
        {
          "appID": process.env.FACEBOOK_APP_ID,
          "clientToken": process.env.FACEBOOK_CLIENT_TOKEN,
          "displayName": "auto-care",
          "scheme": process.env.FACEBOOK_SCHEME,
          "advertiserIDCollectionEnabled": false,
          "autoLogAppEventsEnabled": false,
          "isAutoInitEnabled": true,
          "iosUserTrackingPermission": "This identifier will be used to deliver personalized ads to you."
        }
      ],
      "@react-native-firebase/app",
      "@react-native-firebase/auth",
      
      [
        "expo-build-properties",
        {
          "ios": {
            "useFrameworks": "static"
          }
        }
      ],
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
        
        
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
  },
};
