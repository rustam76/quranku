import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React from 'react';
import Muslim from '../assets/muslim.png';
const CardComp = props => {
  return (
    <TouchableOpacity className=" my-2" onPress={props.onPress}>
      <View className="w-full bg-white flex-row justify-between items-center rounded-md py-2 px-2">
        <View className="flex-row justify-between items-center">
          <View className="flex justify-center items-center">
            <Image source={Muslim} alt="belum" />
            <View className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center">
              <Text className="text-[#240F4F] font-medium text-[14px]">{props.nomor}</Text>
            </View>
          </View>
          <View className="pl-[16px]">
            <Text className="font-medium text-[16px] text-[#240F4F]">
              {props.namaLatin}
            </Text>
            {props.tempatTurun ? (
              <View className="flex-row justify-center items-center">
              <Text className="pr-1 font-medium text-[12px] text-[#8789A3]">
                {props.tempatTurun}
              </Text>
              <Text className="font-bold text-[16px] text-[#8789A3]">.</Text>
              <Text className="pl-1 font-medium text-[12px] text-[#8789A3]">
                {props.jumlahAyat} Ayat
              </Text>
            </View>
            ) : ''}
            
          </View>
        </View>
        <View>
          <Text className="font-bold text-[20px] text-[#240F4F]">
            {props.nama}
          </Text>
        </View>
      </View>
      <View className="border border-[#bbc4ce1c] mt-4 rounded-full"></View>
    </TouchableOpacity>
  );
};

export default CardComp;
