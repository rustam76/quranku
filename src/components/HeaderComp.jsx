import { View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import Quran from '../assets/Quran.png';
import books from '../assets/books.png';
const HeaderComp = (props) => {
const {isName, isHistory, onPressTafsir, onPressSurah, children} = props;
  return (
    <View>
        <View className="pb-[24px]">
          <Text className="text-gray-400 font-medium text-[18px]">
            Asslamu'alaikum
          </Text>
          <Text className="text-[#240F4F] font-semibold text-[24px]">
            {isName}
          </Text>
        </View>
        <View className="bg-[#863ED5] rounded-[20px] h-[150px] mb-6 flex-row">
          <View className="px-[20px] py-[19px]">
            <View className="flex-row">
              <Image source={books} alt="belum" />
              <Text className="text-white font-medium text-[14px] pl-3">
                Terakhir Dibaca
              </Text>
            </View>
            <View className="py-[20px]">
              <Text className="text-white font-semibold text-[18px]">
                {isHistory}
              </Text>
            </View>
          </View>
          <View className="pl-7">
            <Image
              source={Quran}
              alt="belum"
              style={{
                width: 150,
                resizeMode: 'contain',
                alignSelf: 'flex-end',
              }}
            />
          </View>
        </View>
        <View className="flex-row w-full justify-between bg-[#7584B512] rounded-[10px] py-[10px] px-[13px]">
          <TouchableOpacity className={` w-[170px] h-7 items-center justify-center rounded-full ${onPressSurah ? 'bg-[#9A8EA80E]' : 'bg-[#5E24A12A]'}`} onPress={onPressSurah}>
            <Text className={` ${onPressSurah ? 'text-[#863ED5]' : 'text-[#281D66]'} font-medium`}>Surah</Text>
          </TouchableOpacity>
          <TouchableOpacity className={` w-[170px] h-7 items-center justify-center rounded-full ${onPressTafsir ? 'bg-[#9A8EA80E]' : 'bg-[#5E24A12A]'}`} onPress={onPressTafsir}>
            <Text className={` ${onPressTafsir ? 'text-[#863ED5]' : 'text-[#281D66]'} font-medium`}>Tafsir</Text>
          </TouchableOpacity>
        </View>
        <View>
        {[children]}
        </View>
    </View>
  )
}

export default HeaderComp