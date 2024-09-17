import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { View } from 'react-native';

const MyIcon = () => (
  <View style={{ width: 20, height: 20 }}>
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <Defs>
        <LinearGradient id="paint0_linear_312_5664" x1="10" y1="0" x2="10" y2="20" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor="#EC9798" />
          <Stop offset="1" stopColor="#E77085" />
        </LinearGradient>
      </Defs>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.52 5.823C0 6.77 0 7.915 0 10.203V11.725C0 15.625 -1.19209e-07 17.576 1.172 18.788C2.344 20 4.229 20 8 20H12C15.771 20 17.657 20 18.828 18.788C19.999 17.576 20 15.626 20 11.725V10.204C20 7.915 20 6.771 19.48 5.823C18.962 4.874 18.013 4.286 16.116 3.108L14.116 1.867C12.111 0.622 11.108 0 10 0C8.892 0 7.89 0.622 5.884 1.867L3.884 3.108C1.987 4.286 1.039 4.874 0.52 5.823ZM9.25 16C9.25 16.1989 9.32902 16.3897 9.46967 16.5303C9.61032 16.671 9.80109 16.75 10 16.75C10.1989 16.75 10.3897 16.671 10.5303 16.5303C10.671 16.3897 10.75 16.1989 10.75 16V13C10.75 12.8011 10.671 12.6103 10.5303 12.4697C10.3897 12.329 10.1989 12.25 10 12.25C9.80109 12.25 9.61032 12.329 9.46967 12.4697C9.32902 12.6103 9.25 12.8011 9.25 13V16Z"
        fill="url(#paint0_linear_312_5664)"
      />
    </Svg>
  </View>
);

export default MyIcon;
