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
      padding: 24,
    },
    headerText: {
      fontSize: 26,
      fontWeight: '800',
      color: theme.text,
      marginBottom: 8,
      letterSpacing: -0.5,
    },
    headerSubText: {
      fontSize: 15,
      color: theme.textSecondary,
      marginBottom: 32,
      lineHeight: 22,
    },
    fieldContainer: {
      marginBottom: 24,
    },
    label: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.text,
      marginBottom: 10,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    required: {
      color: theme.danger,
    },
    inputWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.inputBg,
      borderRadius: 14,
      borderWidth: 1.5,
      borderColor: theme.border,
      paddingHorizontal: 16,
    },
    inputWrapError: {
      borderColor: theme.danger,
      backgroundColor: theme.danger + '0A',
    },
    inputIcon: {
      marginRight: 10,
    },
    input: {
      flex: 1,
      paddingVertical: 14,
      fontSize: 16,
      color: theme.text,
    },
    errorText: {
      fontSize: 13,
      color: theme.danger,
      marginTop: 8,
      fontWeight: '500',
    },
    counterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 8,
    },
    counter: {
      fontSize: 13,
      fontWeight: '500',
      color: theme.textSecondary,
    },
    counterWarning: {
      color: theme.danger,
    },
    actionSection: {
      marginTop: 16,
      gap: 12,
    },
    saveBtn: {
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
    saveBtnDisabled: {
      backgroundColor: theme.border,
      shadowOpacity: 0,
    },
    saveBtnText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '700',
    },
    saveBtnTextDisabled: {
      color: theme.textSecondary,
    },
    cancelBtn: {
      paddingVertical: 16,
      borderRadius: 14,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cancelBtnText: {
      color: theme.textSecondary,
      fontSize: 16,
      fontWeight: '600',
    },
  });

  const bioLength = formik.values.bio.length;
  const isFormValid = formik.isValid && Object.keys(formik.values).every(k => formik.values[k] !== '');

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
        <Text style={styles.headerText}>Edit Profile</Text>
        <Text style={styles.headerSubText}>
          Make changes to your personal information and bio.
        </Text>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            Display Name <Text style={styles.required}>*</Text>
          </Text>
          <View style={[styles.inputWrap, formik.errors.name && formik.touched.name && styles.inputWrapError]}>
            <Ionicons name="person-outline" size={20} color={theme.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor={theme.textSecondary}
              value={formik.values.name}
              onChangeText={formik.handleChange('name')}
              onBlur={formik.handleBlur('name')}
              autoCapitalize="words"
            />
          </View>
          {formik.errors.name && formik.touched.name && (
            <Text style={styles.errorText}>{formik.errors.name}</Text>
          )}
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>
            Bio <Text style={styles.required}>*</Text>
          </Text>
          <View style={[styles.inputWrap, { alignItems: 'flex-start' }, formik.errors.bio && formik.touched.bio && styles.inputWrapError]}>
            <Ionicons name="document-text-outline" size={20} color={theme.textSecondary} style={[styles.inputIcon, { marginTop: 14 }]} />
            <TextInput
              style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
              placeholder="Tell us about yourself..."
              placeholderTextColor={theme.textSecondary}
              value={formik.values.bio}
              onChangeText={formik.handleChange('bio')}
              onBlur={formik.handleBlur('bio')}
              multiline
            />
          </View>
          <View style={styles.counterContainer}>
            <Text style={styles.errorText}>
              {formik.errors.bio && formik.touched.bio ? formik.errors.bio : ''}
            </Text>
            <Text style={[styles.counter, bioLength > 180 && styles.counterWarning]}>
              {bioLength}/200
            </Text>
          </View>
        </View>

        <View style={styles.actionSection}>
          <TouchableOpacity
            style={[styles.saveBtn, (!isFormValid || formik.isSubmitting) && styles.saveBtnDisabled]}
            onPress={formik.handleSubmit}
            activeOpacity={0.85}
            disabled={!isFormValid || formik.isSubmitting}
          >
            <Ionicons
              name="checkmark"
              size={20}
              color={!isFormValid || formik.isSubmitting ? theme.textSecondary : '#FFFFFF'}
            />
            <Text style={[styles.saveBtnText, (!isFormValid || formik.isSubmitting) && styles.saveBtnTextDisabled]}>
              Save Changes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
