import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const MyIcon = () => (
  <Svg width="20" height="19" viewBox="0 0 20 19" fill="none">
    <Defs>
      <LinearGradient id="paint0_linear_312_5670" x1="10" y1="1" x2="10" y2="18" gradientUnits="userSpaceOnUse">
        <Stop offset="0" stopColor="#EC9798" />
        <Stop offset="1" stopColor="#E77085" />
      </LinearGradient>
    </Defs>
    <Path
      d="M6 6H14M6 10H12M16 1C16.7956 1 17.5587 1.31607 18.1213 1.87868C18.6839 2.44129 19 3.20435 19 4V12C19 12.7956 18.6839 13.5587 18.1213 14.1213C17.5587 14.6839 16.7956 15 16 15H11L6 18V15H4C3.20435 15 2.44129 14.6839 1.87868 14.1213C1.31607 13.5587 1 12.7956 1 12V4C1 3.20435 1.31607 2.44129 1.87868 1.87868C2.44129 1.31607 3.20435 1 4 1H16Z"
      stroke="url(#paint0_linear_312_5670)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default MyIcon;
