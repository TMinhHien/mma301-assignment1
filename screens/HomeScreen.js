import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function HomeScreen({ navigation }) {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 32,
    },
    iconWrapper: {
      width: 90,
      height: 90,
      borderRadius: 45,
      backgroundColor: theme.primary + '20',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 28,
      borderWidth: 2,
      borderColor: theme.primary + '40',
    },
    greeting: {
      fontSize: 15,
      color: theme.primary,
      fontWeight: '600',
      marginBottom: 8,
      textAlign: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.text,
      textAlign: 'center',
      marginBottom: 12,
    },
    subtitle: {
      fontSize: 15,
      color: theme.textSecondary,
      textAlign: 'center',
      lineHeight: 22,
      marginBottom: 40,
    },
    buttonContainer: {
      width: '100%',
    },
    button: {
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 12,
      alignItems: 'center',
      width: '100%',
      marginVertical: 6,
      backgroundColor: theme.primary,
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 8,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
      letterSpacing: 0.5,
      color: '#FFFFFF',
    },
    outlineButton: {
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: theme.primary,
      alignItems: 'center',
      width: '100%',
      marginVertical: 6,
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 8,
    },
    outlineButtonText: {
      fontSize: 16,
      fontWeight: '600',
      letterSpacing: 0.5,
      color: theme.primary,
    },

  });

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Ionicons name="leaf" size={44} color={theme.primary} />
      </View>

      <Text style={styles.greeting}>
        {getGreeting()}, Explorer! 👋
      </Text>

      <Text style={styles.title}>Welcome to ProfileApp</Text>

      <Text style={styles.subtitle}>
        Your personal space to manage and share your profile with the world.
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Profile')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>View My Profile →</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.outlineButton}
          onPress={() => navigation.navigate('Settings')}
          activeOpacity={0.8}
        >
          <Ionicons name="settings-outline" size={18} color={theme.primary} />
          <Text style={styles.outlineButtonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
