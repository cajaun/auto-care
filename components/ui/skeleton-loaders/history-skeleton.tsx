import { View, Text } from "react-native";
import React from "react";

const HistorySkeleton = () => {
  return (
    <View className = "bg-white px-8">

  
    <View className="flex-row items-center py-3 ">
      <View className="w-14 h-14 rounded-xl bg-[#E5EAFF4D] justify-center items-center mr-3"></View>

      <View className="flex-1 gap-y-2">
      <View className=" bg-dark-5 w-full h-2 rounded-full" />
        <View className=" bg-dark-5   w-full h-2 rounded-full "  />
        <View className=" bg-dark-5   w-full h-2 rounded-full "  />
      </View>


    </View>
    </View>
  );
};

export default HistorySkeleton;
