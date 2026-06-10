import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import ThemeToggleSwitch from '../components/ThemeToggleSwitch';

export default function SettingsScreen({ navigation }) {
  const { theme, isDark, toggleTheme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContent: {
      padding: 20,
    },
    sectionGroup: {
      backgroundColor: theme.surface,
      borderRadius: 16,
      overflow: 'hidden',
      marginBottom: 24,
      borderWidth: 1,
      borderColor: theme.border,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 6,
      elevation: 2,
    },
    sectionHeader: {
      paddingHorizontal: 16,
      paddingTop: 16,
      paddingBottom: 8,
      fontSize: 13,
      fontWeight: '700',
      color: theme.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    itemRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    itemRowFirst: {
      borderTopWidth: 0,
    },
    itemLabel: {
      fontSize: 16,
      color: theme.text,
      fontWeight: '500',
    },
    itemValue: {
      fontSize: 16,
      color: theme.textSecondary,
    },

    footerText: {
      textAlign: 'center',
      fontSize: 13,
      color: theme.textSecondary,
      marginTop: 32,
      marginBottom: 16,
    },
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.sectionHeader}>Preferences</Text>
      <View style={styles.sectionGroup}>
        <View style={[styles.itemRow, styles.itemRowFirst, { paddingVertical: 4 }]}>
          <ThemeToggleSwitch
            isDark={isDark}
            onToggle={toggleTheme}
            theme={theme}
          />
        </View>
        <TouchableOpacity style={styles.itemRow} activeOpacity={0.7}>
          <Text style={styles.itemLabel}>Notifications</Text>
          <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemRow} activeOpacity={0.7}>
          <Text style={styles.itemLabel}>Language</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Text style={styles.itemValue}>English</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.textSecondary} />
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionHeader}>About App</Text>
      <View style={styles.sectionGroup}>
        <View style={[styles.itemRow, styles.itemRowFirst]}>
          <Text style={styles.itemLabel}>Version</Text>
          <Text style={styles.itemValue}>1.0.0 Pro</Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemLabel}>Assignment</Text>
          <Text style={styles.itemValue}>Assignment 1</Text>
        </View>
        <View style={styles.itemRow}>
          <Text style={styles.itemLabel}>Framework</Text>
          <Text style={styles.itemValue}>React Native / Expo</Text>
        </View>
      </View>

      <Text style={styles.footerText}>Made with ❤️ for MMA301</Text>
    </ScrollView>
  );
}
