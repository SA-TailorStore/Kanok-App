import React from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';

const Icon = () => (
  <Svg width="24" height="25" viewBox="0 0 24 25" fill="none">
    <Defs>
      <LinearGradient
        id="paint0_linear_307_2772"
        x1="24.9021"
        y1="-1.04865"
        x2="18.7122"
        y2="26.1151"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset="0" stopColor="#F2C2AD" />
        <Stop offset="0.458333" stopColor="#E98690" />
        <Stop offset="1" stopColor="#E56981" />
      </LinearGradient>
    </Defs>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.59325 7.4257C3.59 8.18145 3 9.36457 3 10.6206V19.5347C3 21.1916 4.34315 22.5347 6 22.5347H18.9029C20.5597 22.5347 21.9029 21.1916 21.9029 19.5347V10.6197C21.9029 9.36415 21.3134 8.18148 20.3109 7.42567L14.2604 2.86426C13.1917 2.05852 11.7185 2.05824 10.6494 2.86357L4.59325 7.4257Z"
      fill="url(#paint0_linear_307_2772)"
    />
  </Svg>
);

const App = () => (
  <View>
    <Icon />
  </View>
);

export default App;
