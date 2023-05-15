import {View, Text, SafeAreaView, TextInput, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { StackActions } from "@react-navigation/native";
import Quran from '../assets/Quran.png';
import awan from '../assets/awan.png';
import ButtonCom from '../components/ButtonCom';
import { AuthContext } from '../components/contex';

const SplashScreen = ({navigation}) => {
 
  const {signIn} = React.useContext(AuthContext)
  const[value, setValue]= useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const handleGetStarted=()=>{
    if(value){
      AsyncStorage.setItem('namakamu', value);
      signIn(value);
    }else{
      setErrorMessage('Nama tidak boleh kosong');
    }
  }
  return (
    <SafeAreaView className="flex-1 ">
      <View className="flex-1 justify-center items-center px-[30px]">
        <View className="-mt-[90px]">
        <Text className="text-[#672CBC] font-bold text-center text-[28px]">QuranKu</Text>
        <Text className="text-[#8789A3] w-[190px] text-center font-normal text-[16px] py-4">Pelajari Al-Quran dan Bacalah sekali setiap hari</Text>
        </View>
        <View className="bg-[#672CBC] h-[450] w-full rounded-[30px] justify-center items-center object-contain" >
          <Image
            source={awan}
            className="object-contain -mt-[50px] h-[150px] w-full"
          />
          <Image
            source={Quran}
            className="object-contain h-[150px] w-[245px]"
          />
          <View className="w-full px-5 pt-2">
            <TextInput
              className="shadow appearance-none border-2 bg-[#F1F1F3] border-gray-200 rounded-full w-full py-3 font-medium px-6 text-gray-500 leading-tight "
              placeholder="Masukkan Nama Kamu"
              onChangeText={value => {
                if (value.trim() !== '') {
                  setValue(value);
                  setErrorMessage('');
                } else {
                  setValue('');
                  setErrorMessage('Nama tidak boleh kosong');
                }
              }}
              defaultValue={value}
            />
          </View>

          {errorMessage !== '' && <Text className="text-red-500">{errorMessage}</Text>}
        </View>
        <ButtonCom name={'Mulai'} onPress={()=>handleGetStarted()} />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
