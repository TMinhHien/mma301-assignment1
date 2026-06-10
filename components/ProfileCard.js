import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileCard({ name, bio, theme, avatarUrl }) {
  const avatarSource =
    avatarUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=3B82F6&color=fff&size=256&bold=true`;

  const styles = StyleSheet.create({
    card: {
      backgroundColor: theme.surface,
      borderRadius: 24,
      overflow: 'hidden',
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      elevation: 8,
      borderWidth: 1,
      borderColor: theme.border,
      width: '100%',
      marginBottom: 24,
    },
    coverHeader: {
      height: 100,
      backgroundColor: theme.primary,
      opacity: 0.8,
    },
    profileInfo: {
      padding: 24,
      paddingTop: 0,
      alignItems: 'center',
    },
    avatarContainer: {
      marginTop: -48,
      marginBottom: 16,
      padding: 4,
      backgroundColor: theme.surface,
      borderRadius: 60,
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
    },
    avatar: {
      width: 96,
      height: 96,
      borderRadius: 48,
      backgroundColor: theme.primaryLight,
    },
    nameContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      marginBottom: 8,
    },
    name: {
      fontSize: 24,
      fontWeight: '800',
      color: theme.text,
      letterSpacing: -0.5,
    },
    bio: {
      fontSize: 15,
      color: theme.textSecondary,
      textAlign: 'center',
      lineHeight: 22,
      marginBottom: 20,
      paddingHorizontal: 12,
    },
    badgesRow: {
      flexDirection: 'row',
      gap: 8,
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    badge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.primaryLight,
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 6,
      gap: 4,
    },
    badgeText: {
      fontSize: 12,
      fontWeight: '700',
      color: theme.primaryDark,
    },
    proBadge: {
      backgroundColor: theme.accentLight,
    },
    proBadgeText: {
      color: theme.accent,
    },
  });

  return (
    <View style={styles.card}>
      <View style={styles.coverHeader} />
      <View style={styles.profileInfo}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: avatarSource }} style={styles.avatar} />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{name}</Text>
          <Ionicons name="checkmark-circle" size={20} color={theme.primary} />
        </View>
        <Text style={styles.bio}>{bio}</Text>
        <View style={styles.badgesRow}>
          <View style={styles.badge}>
            <Ionicons name="star" size={14} color={theme.primaryDark} />
            <Text style={styles.badgeText}>Active Member</Text>
          </View>
          <View style={[styles.badge, styles.proBadge]}>
            <Ionicons name="rocket" size={14} color={theme.accent} />
            <Text style={[styles.badgeText, styles.proBadgeText]}>PRO</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
