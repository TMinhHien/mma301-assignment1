import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ThemeToggleSwitch({ isDark, onToggle, theme }) {
  const animatedValue = useRef(new Animated.Value(isDark ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: isDark ? 1 : 0,
      useNativeDriver: false,
      bounciness: 10,
    }).start();
  }, [isDark, animatedValue]);

  const toggleBg = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E2E8F0', theme.primary]
  });

  const knobPosition = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 26]
  });

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
    },
    labelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    iconWrap: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: isDark ? theme.primaryLight : '#F1F5F9',
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 2,
    },
    subLabel: {
      fontSize: 13,
      color: theme.textSecondary,
    },
    toggleTrack: {
      width: 52,
      height: 28,
      borderRadius: 14,
      justifyContent: 'center',
    },
    toggleKnob: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: '#FFFFFF',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onToggle}
      activeOpacity={0.8}
    >
      <View style={styles.labelContainer}>
        <View style={styles.iconWrap}>
          <Ionicons 
            name={isDark ? "moon" : "sunny"} 
            size={22} 
            color={isDark ? theme.primary : "#F59E0B"} 
          />
        </View>
        <View>
          <Text style={styles.label}>Appearance</Text>
          <Text style={styles.subLabel}>
            {isDark ? 'Dark Mode' : 'Light Mode'}
          </Text>
        </View>
      </View>

      <Animated.View style={[styles.toggleTrack, { backgroundColor: toggleBg }]}>
        <Animated.View style={[styles.toggleKnob, { left: knobPosition }]}>
          <Ionicons 
            name={isDark ? "moon" : "sunny"} 
            size={14} 
            color={isDark ? theme.primary : "#F59E0B"} 
          />
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
}
