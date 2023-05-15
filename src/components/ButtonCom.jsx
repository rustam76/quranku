import {TouchableOpacity, Text} from 'react-native';
import React from 'react';

const ButtonCom = props => {
  return (
    <TouchableOpacity
      className="w-[180px] relative -my-10  rounded-full bg-[#F9B091] py-5"
      onPress={props.onPress}>
      <Text className="text-center text-white text-lg">{props.name}</Text>
    </TouchableOpacity>
  );
};

export default ButtonCom;