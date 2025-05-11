import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchPaymentsByType } from "@/services/payment-service";
import { SymbolView } from "expo-symbols";
import { ScrollView } from "react-native-gesture-handler";
fetchPaymentsByType;

interface HistoryListProps {
  paymentType: string;
}

const HistoryList: React.FC<HistoryListProps> = ({ paymentType }) => {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPayments = async () => {
      setLoading(true);
      const fetchedPayments = await fetchPaymentsByType(paymentType);
      setPayments(fetchedPayments);
      setLoading(false);
    };

    loadPayments();
  }, [paymentType]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView className="p-4">
      {payments.length === 0 ? (
        <Text>No payments found for type: {paymentType}</Text>
      ) : (
        <FlatList
          data={payments}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex-row items-center bg-white px-4 py-3 border-b border-gray-200">
  
              <View className="w-12 h-12 rounded-xl bg-gray-100 justify-center items-center mr-3">
                <SymbolView name="house.fill" />
              </View>

 
              <View className="flex-1">
                <Text className="text-base font-semibold text-black">
                  {item.name}
                </Text>
                <Text className="text-sm text-gray-500">Shop no:</Text>
              </View>

      
              <Text className="text-sm text-gray-400">{item.date}</Text>
            </View>
          )}
        />
      )}
    </ScrollView>
  );
};

export default HistoryList;
