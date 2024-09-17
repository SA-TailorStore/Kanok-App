import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const MyIcon = () => (
  <Svg width="23" height="22" viewBox="0 0 23 22" fill="none">
    <Defs>
      <LinearGradient id="paint0_linear_312_5666" x1="12" y1="2" x2="12" y2="20" gradientUnits="userSpaceOnUse">
        <Stop offset="0" stopColor="#EC9798" />
        <Stop offset="1" stopColor="#E77085" />
      </LinearGradient>
      <LinearGradient id="paint1_linear_312_5666" x1="8.5" y1="7" x2="8.5" y2="13" gradientUnits="userSpaceOnUse">
        <Stop offset="0" stopColor="#EC9798" />
        <Stop offset="1" stopColor="#E77085" />
      </LinearGradient>
    </Defs>
    <Path
      d="M5.636 17.3639C7.10845 18.8364 9.04594 19.7527 11.1183 19.9567C13.1906 20.1607 15.2696 19.6398 17.0009 18.4827C18.7322 17.3256 20.0087 15.604 20.6129 13.6112C21.217 11.6184 21.1115 9.47776 20.3142 7.55408C19.5169 5.63039 18.0772 4.0427 16.2404 3.06158C14.4037 2.08045 12.2835 1.7666 10.2413 2.17352C8.19909 2.58043 6.36116 3.68293 5.04073 5.29312C3.72031 6.90332 2.99909 8.92157 3 11.0039V12.9999"
      stroke="url(#paint0_linear_312_5666)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M1 11L3 13L5 11M11 7V12H16"
      stroke="url(#paint1_linear_312_5666)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default MyIcon;
