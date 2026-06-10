import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function ProfileCard({ name, bio, theme, avatarUrl }) {
  const avatarSource =
    avatarUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4A90D9&color=fff&size=128`;

  const styles = StyleSheet.create({
    card: {
      backgroundColor: theme.card,
      borderRadius: 16,
      padding: 24,
      alignItems: 'center',
      shadowColor: theme.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      borderWidth: 1,
      borderColor: theme.border,
      width: '100%',
    },
    avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 16,
      borderWidth: 3,
      borderColor: theme.primary,
    },
    name: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 8,
      textAlign: 'center',
    },
    bio: {
      fontSize: 14,
      fontStyle: 'italic',
      color: theme.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
      marginBottom: 16,
    },
    badge: {
      backgroundColor: theme.primary + '20',
      borderRadius: 20,
      paddingHorizontal: 14,
      paddingVertical: 6,
      borderWidth: 1,
      borderColor: theme.primary + '40',
    },
    badgeText: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.primary,
    },
  });

  return (
    <View style={styles.card}>
      <Image source={{ uri: avatarSource }} style={styles.avatar} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.bio}>{bio}</Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Active Member 🌟</Text>
      </View>
    </View>
  );
}
