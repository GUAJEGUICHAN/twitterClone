import React from 'react';

import { StyleSheet, TouchableOpacity } from 'react-native';

import { BlurView } from 'expo-blur';

type Props = {
  setPopUp: React.Dispatch<React.SetStateAction<boolean>>,
  children: React.ReactChild | React.ReactChild[];
}

export default function TouchableBlurView({ setPopUp, children }: Props) {
  const styles = StyleSheet.create({
    blurview: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      zIndex: 1,
    },
    touchableopacity: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
  });

  return (
    <BlurView
      intensity={10}
      tint="dark"
      style={styles.blurview}
    >
      <TouchableOpacity
        style={styles.touchableopacity}
        onPress={() => { setPopUp(false); }}
      >
        {children}
      </TouchableOpacity>
    </BlurView>
  );
}
