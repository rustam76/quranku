import {View, Text,SafeAreaView,ScrollView} from 'react-native';
import React, {useEffect,useState} from 'react';
import HeaderComp from '../components/HeaderComp';
import CardComp from '../components/CardComp';
import Loading from '../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackActions} from '@react-navigation/native';
const TafsirPage = ({navigation, route}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isHistory, setIsHistory] = useState('');
  const [isName, setIsName] = useState('');

  const handleDetail = (nomor, namaLatin) => {
    AsyncStorage.setItem('any_Key_here', namaLatin);
    navigation.navigate('DetailTafsir', {id: nomor, detailName: namaLatin});
  };

  const handleSurah = () => {
    navigation.dispatch(StackActions.replace('HomePage'));
  };



  useEffect(() => {
    const getName = async () => {
      let nameGet = await AsyncStorage.getItem('any_Key_here');
      let nameku = await AsyncStorage.getItem('namakamu');
      setIsHistory(nameGet);
      setIsName(nameku);
    };
    getName();
  }, []);



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
          onPressSurah={() => handleSurah()}>
          <View className="">
            {(route.params.id || []).map((item, i) => (
              <CardComp
                key={i}
                nomor={item.nomor}
                namaLatin={`Tafsir Surah ${item.namaLatin}`}
                // tempatTurun={item.tempatTurun}
                // jumlahAyat={item.jumlahAyat}
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

export default TafsirPage;
