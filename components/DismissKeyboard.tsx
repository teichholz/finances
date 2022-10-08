import React from 'react';
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native';

const DismissKeyboardHOC = (Comp: any) => {
  return ({ children, ...props }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
      <Comp {...props}>
        {children}
      </Comp>
    </TouchableWithoutFeedback>
  );
};

export const HideKeyboardOnPress = ({ children }: any) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    {children}
  </TouchableWithoutFeedback>
);
