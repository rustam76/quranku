import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import SplashScreen from './pages/SplashScreen';
import TafsirPage from './pages/TafsirPage';
import DetailTafsir from './pages/DetailTafsir';

const Stack = createStackNavigator();

function NavigationMenu() {
  const [isLoading, setLoading] = useState('');
  useEffect(() => {
    const getName = () => {
      let nameGet = AsyncStorage.getItem('namakamu');
      setLoading(nameGet);
    };
    getName();
  }, []);

  return (
    <Stack.Navigator>
      {!isLoading ? (
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
      ) : (
        null
      )}

      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={({route}) => ({
          title: route.params?.detailName || 'QuranKu',
          headerTitleAlign: 'center',
          headerTintColor: 'blue',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
        })}
      />

      <Stack.Screen
        name="TafsirPage"
        component={TafsirPage}
        options={({route}) => ({
          title: route.params?.detailName || 'QuranKu',
          headerTitleAlign: 'center',
          headerTintColor: 'blue',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
        })}
      />
      <Stack.Screen
        name="DetailPage"
        component={DetailPage}
        options={({route}) => ({
          title: route.params?.detailName || 'Detail Page',
        })}
      />
      <Stack.Screen
        name="DetailTafsir"
        component={DetailTafsir}
        options={({route}) => ({
          title: route.params?.detailName || 'Detail Tafsir',
        })}
      />
    </Stack.Navigator>
  );
}

export default NavigationMenu;
