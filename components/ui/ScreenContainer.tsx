import React from 'react';
import { View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ScreenContainer = ({ children, style, ...rest }: ViewProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          flex: 1,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
};
