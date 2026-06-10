import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import ProfileCard from '../components/ProfileCard';

export default function ProfileScreen({ navigation, route }) {
  const { theme } = useTheme();
  const [name, setName] = useState('Nguyen Van A');
  const [bio, setBio] = useState(
    'React Native enthusiast | FPT University student | Building cool apps 🚀'
  );

  // Nhận data từ EditProfileScreen qua route.params
  useEffect(() => {
    if (route.params?.updatedName) setName(route.params.updatedName);
    if (route.params?.updatedBio) setBio(route.params.updatedBio);
  }, [route.params]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContent: {
      padding: 20,
      paddingTop: 28,
    },
    sectionTitle: {
      fontSize: 13,
      fontWeight: '600',
      color: theme.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginBottom: 16,
    },
    actionsContainer: {
      marginTop: 24,
      gap: 10,
    },
    button: {
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 12,
      alignItems: 'center',
      width: '100%',
      marginVertical: 4,
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
      marginVertical: 4,
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
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 24,
      gap: 12,
    },
    statCard: {
      flex: 1,
      backgroundColor: theme.surface,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.border,
    },
    statValue: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.primary,
    },
    statLabel: {
      fontSize: 12,
      color: theme.textSecondary,
      marginTop: 4,
    },
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.sectionTitle}>Profile Overview</Text>

      <ProfileCard name={name} bio={bio} theme={theme} />

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>42</Text>
          <Text style={styles.statLabel}>Projects</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>128</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>96</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('EditProfile', { name, bio })
          }
          activeOpacity={0.8}
        >
          <Ionicons name="pencil" size={18} color="#FFFFFF" />
          <Text style={styles.buttonText}>Edit Profile</Text>
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
    </ScrollView>
  );
}
