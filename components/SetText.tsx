import { colors } from '@/utils/styles';
import { Text, type TextProps, StyleSheet } from 'react-native';

export type SetTextProps = TextProps & {

  type?: 'default' | 'bold' | 'small' | 'title';
  size?: number;
  color?: string;

};

export function SetText({
  type = 'default',
  size,
  color,
  ...rest
}: SetTextProps) {

  return (
    <Text 
      style={[rest.style,
        type == 'default' ? styles.default : undefined,
        type === 'bold' ? styles.bold : undefined,
        type === 'small' ? styles.small : undefined,
        type === 'title' ? styles.title : undefined,
        size ? {fontSize: size} : undefined,
        color ? {color: color} : {color: colors.whereblack}
      ]}
      >{rest.children}</Text>
  );
}

const defaultFont = 'notoSansThai';
const boldFont = 'notoSansThaiBold';
const styles = StyleSheet.create({
  default: {
    fontFamily: 'notoSansThai',
  },
  bold: {
    fontFamily: 'notoSansThaiBold',
    // transform: [{ scaleY: 0.85}],
  },
  small: {
    fontFamily: defaultFont,
    fontSize: 12,
  },
  title: {
    fontFamily: boldFont,
    fontSize: 27,
    // transform: [{ scaleY: 0.85}],
  },
});
