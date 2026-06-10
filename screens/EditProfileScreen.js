import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

// Yup validation schema
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name is too long')
    .required('Name is required'),
  bio: Yup.string()
    .max(200, 'Bio cannot exceed 200 characters')
    .required('Bio is required'),
});

export default function EditProfileScreen({ navigation, route }) {
  const { theme } = useTheme();

  const formik = useFormik({
    initialValues: {
      name: route.params?.name || '',
      bio: route.params?.bio || '',
    },
    validationSchema,
    onSubmit: (values) => {
      navigation.navigate('Profile', {
        updatedName: values.name,
        updatedBio: values.bio,
      });
    },
  });

  const styles = StyleSheet.create({
    flex: {
      flex: 1,
      backgroundColor: theme.background,
    },
    scrollContent: {
      padding: 20,
      paddingTop: 28,
    },
    headerText: {
      fontSize: 22,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 6,
    },
    headerSubText: {
      fontSize: 14,
      color: theme.textSecondary,
      marginBottom: 28,
    },
    fieldContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 8,
    },
    required: {
      color: theme.danger,
    },
    input: {
      backgroundColor: theme.inputBg,
      borderRadius: 10,
      borderWidth: 1.5,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontSize: 15,
      color: theme.text,
    },
    inputError: {
      borderColor: theme.danger,
    },
    inputValid: {
      borderColor: theme.border,
    },
    errorText: {
      fontSize: 12,
      color: theme.danger,
      marginTop: 6,
      marginLeft: 2,
    },
    counterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 6,
    },
    counter: {
      fontSize: 12,
      color: theme.textSecondary,
    },
    counterWarning: {
      color: theme.danger,
    },
    buttonContainer: {
      marginTop: 8,
      gap: 10,
    },
    button: {
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 12,
      alignItems: 'center',
      width: '100%',
      marginVertical: 4,
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
    divider: {
      height: 1,
      backgroundColor: theme.border,
      marginVertical: 20,
    },
  });

  const bioLength = formik.values.bio.length;
  const isFormValid = formik.isValid && formik.dirty;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.headerText}>Edit Your Profile</Text>
        <Text style={styles.headerSubText}>
          Update your personal information below.
        </Text>

        {/* Name Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            Display Name <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={[
              styles.input,
              formik.errors.name && formik.touched.name
                ? styles.inputError
                : styles.inputValid,
            ]}
            placeholder="Enter your name"
            placeholderTextColor={theme.textSecondary}
            value={formik.values.name}
            onChangeText={formik.handleChange('name')}
            onBlur={formik.handleBlur('name')}
            autoCapitalize="words"
            returnKeyType="next"
          />
          {formik.errors.name && formik.touched.name && (
            <Text style={styles.errorText}>⚠️ {formik.errors.name}</Text>
          )}
        </View>

        {/* Bio Field */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            Bio <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={[
              styles.input,
              { height: 100, textAlignVertical: 'top', paddingTop: 12 },
              formik.errors.bio && formik.touched.bio
                ? styles.inputError
                : styles.inputValid,
            ]}
            placeholder="Tell us about yourself..."
            placeholderTextColor={theme.textSecondary}
            value={formik.values.bio}
            onChangeText={formik.handleChange('bio')}
            onBlur={formik.handleBlur('bio')}
            multiline
            numberOfLines={4}
          />
          <View style={styles.counterContainer}>
            <Text style={styles.errorText}>
              {formik.errors.bio && formik.touched.bio
                ? `⚠️ ${formik.errors.bio}`
                : ''}
            </Text>
            <Text
              style={[
                styles.counter,
                bioLength > 180 ? styles.counterWarning : null,
              ]}
            >
              {bioLength}/200
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor:
                  !isFormValid || formik.isSubmitting
                    ? theme.border
                    : theme.primary,
              },
            ]}
            onPress={formik.handleSubmit}
            activeOpacity={0.8}
            disabled={!isFormValid || formik.isSubmitting}
          >
            <Ionicons
              name="save-outline"
              size={18}
              color={!isFormValid || formik.isSubmitting ? theme.textSecondary : '#FFFFFF'}
            />
            <Text
              style={[
                styles.buttonText,
                {
                  color:
                    !isFormValid || formik.isSubmitting
                      ? theme.textSecondary
                      : '#FFFFFF',
                },
              ]}
            >
              Save Changes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.outlineButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Ionicons name="close-outline" size={18} color={theme.primary} />
            <Text style={styles.outlineButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
