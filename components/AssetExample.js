import { Text, View, StyleSheet } from 'react-native';

// Placeholder component - không dùng local assets
export default function AssetExample() {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        MMA301 - Assignment 1
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
