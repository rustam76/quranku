import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';
import CardComp from '../components/CardComp';
import Loading from '../components/Loading';

import HeaderComp from '../components/HeaderComp';
const HomePage = ({navigation}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHistory, setIsHistory] = useState('');
  const [isName, setIsName] = useState('');


  const handleDetail = (nomor, namaLatin) => {
    AsyncStorage.setItem('any_Key_here', namaLatin);
    navigation.navigate('DetailPage', {id: nomor, detailName: namaLatin});
  };

  const handelTafsir = () => {
    navigation.dispatch(StackActions.replace('TafsirPage',{ id: data }));
  };

  const findAll = async () => {
    try {
      await fetch('https://equran.id/api/v2/surat')
      .then(response => response.json())
      .then(result => {
        setData(result.data);
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    findAll();
  }, []);

  useEffect(() => {
    const getName = async () => {
      let nameGet = await AsyncStorage.getItem('any_Key_here');
      let nameku = await AsyncStorage.getItem('namakamu');
      setIsHistory(nameGet);
      setIsName(nameku);
    };
    getName();
  }, []);

  if (isLoading || data === null) {
    return <Loading />;
  }
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        style={{
          paddingHorizontal: 20,
          overflow: 'hidden',
        }}>
        <HeaderComp
          isName={isName ? isName : 'Belum ada'}
          isHistory={isHistory ? isHistory : 'Belum ada'}
          onPressTafsir={() => {
            handelTafsir();
          }}>

        <View className="">
          {(data || []).map((item, i) => (
            <CardComp
              key={i}
              nomor={item.nomor}
              namaLatin={item.namaLatin}
              tempatTurun={item.tempatTurun}
              jumlahAyat={item.jumlahAyat}
              nama={item.nama}
              onPress={() => handleDetail(item.nomor, item.namaLatin)}
            />
          ))}
        </View>
        </HeaderComp>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
