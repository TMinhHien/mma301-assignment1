import React from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';

export default function ThemeToggleSwitch({ isDark, onToggle, theme }) {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 8,
    },
    labelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    emoji: {
      fontSize: 18,
    },
    label: {
      fontSize: 15,
      fontWeight: '500',
      color: theme.text,
    },
    subLabel: {
      fontSize: 12,
      color: theme.textSecondary,
      marginTop: 2,
    },
    textGroup: {
      marginLeft: 4,
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <View style={styles.labelContainer}>
        <Text style={styles.emoji}>{isDark ? '🌙' : '☀️'}</Text>
        <View style={styles.textGroup}>
          <Text style={styles.label}>Dark Mode</Text>
          <Text style={styles.subLabel}>
            {isDark ? '🌙 Dark' : '☀️ Light'}
          </Text>
        </View>
      </View>
      <Switch
        value={isDark}
        onValueChange={onToggle}
        trackColor={{ false: '#CBD5E1', true: theme.primary }}
        thumbColor={isDark ? theme.accent : '#FFFFFF'}
        ios_backgroundColor="#CBD5E1"
      />
    </TouchableOpacity>
  );
}
