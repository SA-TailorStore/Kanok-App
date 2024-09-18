import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const CustomIcon = () => (
  <Svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <Path
      d="M21.8125 4.325C21.8125 2.225 20.1 0.5 17.9875 0.5C15.875 0.5 14.15 2.225 14.1625 4.325V14.1625H4.325C2.225 14.1625 0.5 15.875 0.5 17.9875C0.5 20.0875 2.225 21.8125 4.325 21.8125H14.1625V31.6375C14.1625 33.7375 15.875 35.4625 17.9875 35.4625C20.0875 35.4625 21.8125 33.75 21.8125 31.6375V21.8125H31.6375C33.7375 21.8125 35.4625 20.1 35.4625 17.9875C35.4625 15.8875 33.75 14.1625 31.6375 14.1625H21.8125V4.325Z"
      fill="url(#paint0_linear)"
    />
    <Defs>
      <LinearGradient id="paint0_linear" x1="17.9812" y1="0.5" x2="17.9812" y2="35.4625" gradientUnits="userSpaceOnUse">
        <Stop stopColor="#F47E9A" />
        <Stop offset="1" stopColor="#FF6090" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default CustomIcon;
