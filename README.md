# 🚗 Auto-Care

Auto-Care is a React Native application built with **Expo** that helps users manage all vehicle-related needs in one place. Whether you're booking car services, renting, or selling a vehicle, Auto-Care simplifies the experience with a user-friendly interface and seamless integrations.

---




## 📦 Tech Stack

- **React Native + Expo** – Cross-platform development
- **Firebase** – Backend, authentication, and storage
- **NativeWind** – Utility-first styling for React Native
- **SF Symbols** – Icon system
- **Sonner Native** – Toast notifications
- **Gorhom Bottom Sheet** – Advanced bottom sheet modal
- **Custom Components** – Custom UI elements (TabBar, TopTabs, PillTabs, etc.)

---

## ✨ Features

- 🔍 **Browse Vehicle Options**
  - Services (e.g., maintenance)
  - Rentals
  - Selling/buying vehicles

- 📅 **Booking System**
  - Calendar integration to schedule services or rentals
  - Choose available time slots

- 💳 **Payment Methods**
  - Visa, Mastercard, PayPal (digital payments)
  - Cash on delivery/service

- 📜 **Transaction History**
  - View past bookings and payment details

- 👤 **User Profile**
  - Edit profile information
  - Secure login/logout with Firebase Auth

---

## 📁 Project Structure

```
app/
│
├── auth/                # Authentication flow (login, signup)
├── root/                # Root-level routing logic
├── details/             # Detail screens for items/services
├── payments/            # Payment screens and flow
├── profile/             # User profile screens
├── tabs/                # Bottom tab navigation (history, home, profile, workshop)
│   ├── history/
│   ├── home/
│   ├── profile/
│   └── workshop/
│   ├── _layout.tsx      # Tab layout
│
├── _layout.tsx          # Root layout file
├── index.tsx            # App entry point
│
assets/                  # Image,font, icons assets
components/
├── forms/               # Reusable form components
├── ui/                  # Custom UI components
│   ├── pill-tabs/
│   ├── sheet/
│   ├── skeleton-loaders/
│   ├── tab-bar/
│   ├── top-tabs/
│   ├── pressable-scale.tsx
│   ├── segmented-tab.tsx
│   └── touchable-bounce.tsx
│
context/                 # Global React contexts (e.g., auth-context)
data/                    # Static or mock data
hooks/                   # Custom React hooks
services/
├── auth-service.ts      # Firebase Auth service
├── payment-service.ts   # Payment processing logic
types/                   # TypeScript types
utils/                   # Utility functions and datasets
.env                     # Environment variables
```

---

## Demo

<video src="https://github.com/user-attachments/assets/34282556-c464-45bf-8247-f2042e7b84d4" controls width="500" />


## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).


## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.



