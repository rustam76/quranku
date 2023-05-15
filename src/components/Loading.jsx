
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, Animated, Easing } from 'react-native';
import Quran from '../assets/Quran.png';

const Loading = () => {
  const imageScale = useRef(new Animated.Value(1)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    const animateImage = Animated.loop(
      Animated.sequence([
        Animated.timing(imageScale, {
          toValue: 0.8,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(imageScale, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    );

    const animateText = Animated.loop(
      Animated.sequence([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    );

    const text = 'Loading...!!';
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      setTypedText(text.substring(0, currentIndex));
      currentIndex++;
      if (currentIndex > text.length) {
        currentIndex = 0;
      }
    }, 200);

    animateImage.start();
    animateText.start();

    return () => {
      clearInterval(intervalId);
      animateImage.stop();
      animateText.stop();
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'white' }}>
      <Animated.Image source={Quran} style={{ transform: [{ scale: imageScale }] }} />
      <Animated.Text
        style={{ marginTop: 10, fontSize: 16, fontWeight: 'bold', opacity: textOpacity }}
      >
        {typedText}
      </Animated.Text>
    </View>
  );
};

export default Loading;

