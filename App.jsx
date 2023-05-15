import 'react-native-gesture-handler';
import React, {useMemo, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import NavigationMenu from './src/NavigationMenu';
import {AuthContext} from './src/components/contex';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './src/pages/SplashScreen';

function App() {
  const [isLoading, setIsloading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const authContext = useMemo(() => ({
    signIn: value => {
      setUserToken(value);
      setIsloading(false);
    },
  }));

  useEffect(() => {
    const getName = async () => {
      try {
        let nameku = await AsyncStorage.getItem('namakamu');
        setUserToken(nameku);
      } catch (error) {
        console.log(error);
      }
    };
    getName();
  }, []);

  // console.log(userToken);
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken !== null && userToken !== '' ? (
          <NavigationMenu />
        ) : (
          <SplashScreen />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;
