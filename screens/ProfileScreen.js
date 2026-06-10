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
  const [avatarUrl, setAvatarUrl] = useState(
    'https://wp-cms-media.s3.ap-east-1.amazonaws.com/lay_anh_dai_dien_facebook_dep_26_b93bb9c467.jpg'
  );

  useEffect(() => {
    if (route.params?.updatedName) setName(route.params.updatedName);
    if (route.params?.updatedBio) setBio(route.params.updatedBio);
    if (route.params?.updatedAvatarUrl !== undefined) setAvatarUrl(route.params.updatedAvatarUrl);
  }, [route.params]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContent: {
      padding: 20,
      paddingTop: 24,
    },
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 12,
      marginBottom: 32,
    },
    statCard: {
      flex: 1,
      backgroundColor: theme.surface,
      borderRadius: 16,
      padding: 16,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.border,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    statValue: {
      fontSize: 22,
      fontWeight: '800',
      color: theme.primary,
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    actionSection: {
      gap: 12,
    },
    primaryBtn: {
      backgroundColor: theme.primary,
      paddingVertical: 16,
      borderRadius: 14,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
      shadowColor: theme.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 4,
    },
    primaryBtnText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '700',
    },
    secondaryBtn: {
      backgroundColor: theme.surface,
      paddingVertical: 16,
      borderRadius: 14,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
      borderWidth: 1,
      borderColor: theme.border,
    },
    secondaryBtnText: {
      color: theme.text,
      fontSize: 16,
      fontWeight: '600',
    },
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <ProfileCard name={name} bio={bio} theme={theme} avatarUrl={avatarUrl} />

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

      <View style={styles.actionSection}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.navigate('EditProfile', { name, bio, avatarUrl })}
          activeOpacity={0.85}
        >
          <Ionicons name="pencil" size={20} color="#fff" />
          <Text style={styles.primaryBtnText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => navigation.navigate('Settings')}
          activeOpacity={0.85}
        >
          <Ionicons name="settings-outline" size={20} color={theme.textSecondary} />
          <Text style={styles.secondaryBtnText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
