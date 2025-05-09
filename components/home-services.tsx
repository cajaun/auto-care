import { View, Text, FlatList } from 'react-native'
import React from 'react'
import TouchableBounce from './ui/touchable-bounce'
import { Image } from 'expo-image'
import { SymbolView } from 'expo-symbols'
import { vehicleServices } from '@/util/vehicle-services'

interface HomeServicesProps {
  activeTab: string;
}

const HomeServices = ({ activeTab }: HomeServicesProps) => {

  const filteredServices = vehicleServices.filter(service => service.category === activeTab)

  return (
    <View className="gap-y-4 pt-8 px-4 ">
    <View>
      <Text className="text-2xl font-bold">Vehicle Services</Text>
    </View>

    <FlatList
      scrollEnabled={false}
      contentInsetAdjustmentBehavior="automatic"
      data={filteredServices}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      columnWrapperStyle={{
        justifyContent: "space-between",
        marginBottom: 12,
      }}
      renderItem={({ item }) => (
        <TouchableBounce style={{ width: "48%" }}>
          <View
            key={item.name}
            className="rounded-lg overflow-hidden"
            style={{
              width: "100%",
              height: 120,
              marginBottom: 10,
              position: "relative",
            }}
          >
            <Image
              source={item.image}
              style={{ width: "100%", height: 120, borderRadius: 12 }}
              contentFit="cover"
            />

            <View
              className="absolute bottom-4 "
              style={{
                width: 100,
                height: 30,
              }}
            >
              <Image
                source={item.tag}
                style={{ width: "100%", height: "100%" }}
                contentFit="contain"
              />
            </View>
          </View>

          <View className="gap-y-1">
            <View>
              <Text className="text-lg font-semibold">{item.name}</Text>
            </View>

            <View className="flex-row items-center gap-x-2">
              <SymbolView name="headset" tintColor="#A3A6AC" />

              <Text className="text-dark-50">24/7</Text>
            </View>
          </View>
        </TouchableBounce>
      )}
    />
  </View>
  )
}

export default HomeServices