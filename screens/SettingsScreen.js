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
      paddingTop: 28,
    },
    pageTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 24,
    },
    sectionCard: {
      backgroundColor: theme.surface,
      borderRadius: 14,
      padding: 18,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: theme.border,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 14,
      gap: 8,
    },
    sectionTitle: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.text,
    },
    divider: {
      height: 1,
      backgroundColor: theme.border,
      marginVertical: 12,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 6,
    },
    infoLabel: {
      fontSize: 14,
      color: theme.textSecondary,
    },
    infoValue: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.text,
    },
    button: {
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 8,
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 8,
      borderWidth: 2,
      borderColor: theme.primary,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
      letterSpacing: 0.5,
      color: theme.primary,
    },
    badge: {
      backgroundColor: theme.primary + '20',
      borderRadius: 6,
      paddingHorizontal: 8,
      paddingVertical: 2,
    },
    badgeText: {
      fontSize: 11,
      fontWeight: '600',
      color: theme.primary,
    },
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.pageTitle}>Preferences</Text>

      {/* Appearance Section */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Ionicons name="color-palette-outline" size={20} color={theme.primary} />
          <Text style={styles.sectionTitle}>🎨 Appearance</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{isDark ? 'DARK' : 'LIGHT'}</Text>
          </View>
        </View>

        <ThemeToggleSwitch
          isDark={isDark}
          onToggle={toggleTheme}
          theme={theme}
        />
      </View>

      {/* About Section */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Ionicons name="information-circle-outline" size={20} color={theme.primary} />
          <Text style={styles.sectionTitle}>ℹ️ About</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Version</Text>
          <Text style={styles.infoValue}>1.0.0</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Assignment</Text>
          <Text style={styles.infoValue}>Assignment 1</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>University</Text>
          <Text style={styles.infoValue}>FPT University</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Framework</Text>
          <Text style={styles.infoValue}>Expo ~54.0.35</Text>
        </View>
      </View>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
        activeOpacity={0.8}
      >
        <Ionicons name="arrow-back-outline" size={18} color={theme.primary} />
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
