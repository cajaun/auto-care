import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { fetchPaymentsByType } from "@/services/payment-service";
import { SFSymbol, SymbolView } from "expo-symbols";
import { ScrollView } from "react-native-gesture-handler";
import TouchableBounce from "./ui/touchable-bounce";
import { useSheetRef } from "./ui/sheet/sheet";
import RebookSheet from "./ui/sheet/rebook-sheet";
import HistorySkeleton from "./ui/skeleton-loaders/history-skeleton";
import { getSymbolForService } from "@/util/vehicle-services";


interface HistoryListProps {
  paymentType: string;
}

const HistoryList: React.FC<HistoryListProps> = ({ paymentType }) => {
  const [payments, setPayments] = useState<any[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const bottomSheetModalRef = useSheetRef();

  //  Fetch payments when the paymentType prop changes (still a bit buggy but works for the most part)
  useEffect(() => {
    setLoading(true);
  
    //  call the fetchPaymentsByType function to get payments of a specific type
    const unsubscribe = fetchPaymentsByType(paymentType, (fetchedPayments) => {
      setPayments(fetchedPayments);
      setLoading(false);
    });
  
    // cleanup function to unsubscribe becasue  we dont want memory leaks frl 
    return () => unsubscribe();
  }, [paymentType]);  // dependency on paymentType to refetch when it changes

  const HistorySkeletonList = () => {
    return (
      <View className = "bg-white">
        {[...Array(5)].map((_, index) => (
          <HistorySkeleton key={index} />
        ))}
      </View>
    );
  };

  // when the data is loading show the skeleton loader
  if (loading) {
    return (
      <HistorySkeletonList />
    );
  }

  return (

    <FlatList
    key={paymentType}
      className="bg-white px-8"
      data={payments}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={
        <Text className="p-4">No payments found for type: {paymentType}</Text>
      }
      renderItem={({ item }) => (
        <View>
          <RebookSheet
            bottomSheetModalRef={bottomSheetModalRef}
            data={selectedPayment}
          />

          <TouchableBounce
            onPress={() => {
              setSelectedPayment(item);
              bottomSheetModalRef.current?.present();
            }}
          >
            <View className="flex-row items-center py-3 ">
              <View className="w-14 h-14 rounded-xl bg-[#E5EAFF4D] justify-center items-center mr-3">
                <SymbolView  name={getSymbolForService(item.name) as SFSymbol} tintColor={"#FF4040"} />
              </View>

              <View className="flex-1">
                <Text className="text-lg font-semibold text-black">
                  {item.name}
                </Text>
                <Text className="text-sm text-gray-500">Shop no: 120Ab38</Text>
              </View>

              <Text className="text-sm text-gray-400">
                {new Date(item.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </Text>
            </View>
          </TouchableBounce>
        </View>
      )}
      ItemSeparatorComponent={() => (
        <View className="h-3 border-b-[0.25px] border-dark-90/25" />
      )}
    />

  );
};

export default HistoryList;
