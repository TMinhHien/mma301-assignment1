import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return { text: 'Good Morning', emoji: '🌤️' };
  if (hour < 18) return { text: 'Good Afternoon', emoji: '☀️' };
  return { text: 'Good Evening', emoji: '🌙' };
}

export default function HomeScreen({ navigation }) {
  const { theme, isDark } = useTheme();
  const greeting = getGreeting();

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {/* Hero Header */}
      <View style={[styles.hero, { backgroundColor: theme.primary }]}>
        <SafeAreaView>
          <View style={styles.heroInner}>
            <View style={styles.heroIconWrap}>
              <Ionicons name="person-circle" size={72} color="rgba(255,255,255,0.95)" />
            </View>
            <Text style={styles.greetingText}>
              {greeting.emoji} {greeting.text}, Explorer!
            </Text>
            <Text style={styles.heroTitle}>Welcome to{'\n'}ProfileApp</Text>
            <Text style={styles.heroSubtitle}>
              Your personal space to manage and share your profile with the world.
            </Text>
          </View>
        </SafeAreaView>
        {/* Bottom wave decoration */}
        <View style={[styles.wave, { backgroundColor: theme.background }]} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Action Cards */}
        <View style={styles.cardRow}>
          <TouchableOpacity
            style={[styles.quickCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
            onPress={() => navigation.navigate('Profile')}
            activeOpacity={0.75}
          >
            <View style={[styles.quickCardIcon, { backgroundColor: theme.primary + '22' }]}>
              <Ionicons name="person" size={26} color={theme.primary} />
            </View>
            <Text style={[styles.quickCardLabel, { color: theme.text }]}>My Profile</Text>
            <Text style={[styles.quickCardDesc, { color: theme.textSecondary }]}>View & edit info</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.quickCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
            onPress={() => navigation.navigate('Settings')}
            activeOpacity={0.75}
          >
            <View style={[styles.quickCardIcon, { backgroundColor: theme.accent + '22' }]}>
              <Ionicons name="color-palette" size={26} color={theme.accent} />
            </View>
            <Text style={[styles.quickCardLabel, { color: theme.text }]}>Settings</Text>
            <Text style={[styles.quickCardDesc, { color: theme.textSecondary }]}>
              {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Feature Banner */}
        <View style={[styles.banner, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          <View style={[styles.bannerIconWrap, { backgroundColor: theme.primary + '18' }]}>
            <Ionicons name="sparkles" size={28} color={theme.primary} />
          </View>
          <View style={styles.bannerText}>
            <Text style={[styles.bannerTitle, { color: theme.text }]}>Personalize your profile</Text>
            <Text style={[styles.bannerDesc, { color: theme.textSecondary }]}>
              Update your name, bio and switch themes anytime
            </Text>
          </View>
        </View>

        {/* CTA Buttons */}
        <TouchableOpacity
          style={[styles.ctaBtn, { backgroundColor: theme.primary }]}
          onPress={() => navigation.navigate('Profile')}
          activeOpacity={0.85}
        >
          <Ionicons name="person-circle-outline" size={20} color="#fff" />
          <Text style={styles.ctaBtnText}>View My Profile</Text>
          <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.8)" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.outlineBtn, { borderColor: theme.primary }]}
          onPress={() => navigation.navigate('Settings')}
          activeOpacity={0.85}
        >
          <Ionicons name="settings-outline" size={20} color={theme.primary} />
          <Text style={[styles.outlineBtnText, { color: theme.primary }]}>Open Settings</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingTop: 56,
    paddingHorizontal: 24,
    paddingBottom: 0,
  },
  heroInner: {
    alignItems: 'center',
    paddingBottom: 32,
  },
  heroIconWrap: {
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  greetingText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
    marginBottom: 6,
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 38,
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.72)',
    textAlign: 'center',
    lineHeight: 19,
    maxWidth: 260,
  },
  wave: {
    height: 28,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  content: {
    padding: 20,
    paddingTop: 8,
    paddingBottom: 40,
  },
  cardRow: {
    flexDirection: 'row',
    marginBottom: 14,
    gap: 12,
  },
  quickCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  quickCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  quickCardLabel: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 3,
  },
  quickCardDesc: {
    fontSize: 12,
    lineHeight: 16,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    gap: 14,
  },
  bannerIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerText: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  bannerDesc: {
    fontSize: 12,
    lineHeight: 17,
  },
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: '#4A90D9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  ctaBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  outlineBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 2,
    gap: 8,
  },
  outlineBtnText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
