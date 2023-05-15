import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Button,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useState} from 'react';
import Loading from '../components/Loading';
import Sound from 'react-native-sound';
import playSound from '../assets/playSound.png';
import Bismillah from '../assets/bismillah.png';
import Quran from '../assets/Quran.png';
const DetailPage = ({route}) => {
  const audioSound = [
    {
      id: '01',
      nama: 'Abdullah Al Juhany',
    },
    {
      id: '02',
      nama: 'Abdul-Muhsin Al Qasim',
    },
    {
      id: '03',
      nama: 'Abdurrahman as Sudais',
    },
    {
      id: '04',
      nama: 'Ibrahim Al Dossari',
    },
    {
      id: '05',
      nama: 'Misyari Rasyid Al Afasi',
    },
  ];
  const [datas, setDatas] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState('01');

  let sound = null;
  const playAudio = audioUrl => {
    sound = new Sound(audioUrl, null, error => {
      if (error) {
        console.log('Gagal memuat audio', error);
      } else {
        console.log('Audio siap untuk diputar');
        sound.play(success => {
          if (success) {
            console.log('Audio diputar selesai');
          } else {
            console.log('Gagal memutar audio');
          }
        });
      }
    });
  };

  useEffect(() => {
    const findDetail = () => {
    try {
      fetch(`https://equran.id/api/v2/surat/${route.params.id}`)
        .then(res => res.json())
        .then(json => {
          setDatas(json.data);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
      
    };
    findDetail();
  }, []);

  if (isLoading || datas === null) {
    return <Loading />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        style={{
          paddingHorizontal: 20,
          overflow: 'hidden',
        }}>
        <TouchableOpacity
          className="flex items-center justify-center bg-[#863ED5] object-cover  w-full h-[265px] rounded-[20px] py-7 shadow-lg"
          onPress={() => playAudio(datas.audioFull[selectedValue])}>
          <Image
            source={Quran}
            alt="belum"
            style={{
              width: 300,
              // resizeMode: 'cover',
              alignSelf: 'flex-end',
              opacity: 0.2,
            }}
            className="static -mb-[30px] -mr-[70px]"
          />
          <View className="absolute">
            <View>
              <Text className="text-center text-white text-[26px] font-medium">
                {datas.namaLatin}
              </Text>
              <Text className="text-center text-white text-[16px] mt-1 font-medium">
                {datas.arti}
              </Text>
            </View>
            <View className="border w-[200px] border-[#eff0f135] my-6 rounded-full"></View>
            <View>
              <View className="flex-row items-center justify-center mb-8">
                <Text className="text-center text-white text-[14px] font-medium px-1">
                  {datas.tempatTurun}
                </Text>
                <Text className="text-center text-white text-[14px] font-medium">
                  . {datas.jumlahAyat} Ayat
                </Text>
              </View>
              <Image source={Bismillah} alt="belum" />
            </View>
          </View>
        </TouchableOpacity>
        <View>
          <Picker
            selectedValue={selectedValue}
            className={'w-full border'}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }>
            {(audioSound || []).map((item, i) => (
              <Picker.Item key={i} label={item.nama} value={item.id} />
            ))}
          </Picker>
        </View>
        <View>
          {(datas.ayat || []).map((item, i) => (
            <View key={i} className="bg-white w-full py-2 px-2">
              <View className="flex-row w-full justify-between bg-[#12193112] rounded-[10px] py-[10px] px-[13px]">
                <View className="bg-[#863ED5] w-7 h-7 items-center justify-center rounded-full">
                  <Text className="text-white font-medium">
                    {item.nomorAyat}
                  </Text>
                </View>
                <View>
                  <TouchableOpacity
                    className=""
                    onPress={() => playAudio(item.audio[selectedValue])}>
                    <Image source={playSound} alt="belum" />
                  </TouchableOpacity>
                </View>
              </View>
              <View className="mt-6">
                <View className="flex justify-end">
                  <Text className="font-bold text-xl">{item.teksArab}</Text>
                </View>
                <View className="flex justify-start mt-4">
                  <Text className="font-medium text-md">
                    {item.teksIndonesia}
                  </Text>
                </View>
              </View>
              <View className="border border-[#bbc4ce1c] mt-4 rounded-full"></View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailPage;
