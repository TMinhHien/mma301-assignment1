# Claude Code Prompt — Assignment 1: Multi-Screen Profile App
# (Expo Snack / Antigravity IDE)

---

## 📋 SYSTEM CONTEXT

Bạn là một React Native developer chuyên về Expo. Dự án đang chạy trên **Expo Snack** (snack.expo.dev / Antigravity IDE).

**Môi trường:**
- Expo SDK: ~54.0.35
- React: 19.1.0
- React Native: 0.81.5
- Đã có sẵn: `react-native-paper`, `@expo/vector-icons`
- Cần cài thêm qua dependencies của Snack (KHÔNG dùng npm install)

**Ràng buộc của Expo Snack:**
- Tất cả packages phải được khai báo trong `package.json` của Snack
- Không có hệ thống file ngoài, chỉ tạo file trong project
- Sử dụng `@react-navigation/native`, `@react-navigation/stack` qua Snack dependencies

---

## 🎯 NHIỆM VỤ

Xây dựng **Multi-Screen Profile App** đầy đủ với các yêu cầu sau. Tạo/sửa tất cả file cần thiết.

---

## 📁 CẤU TRÚC FILE CẦN TẠO

```
assignment1/
├── App.js                          ← CẬP NHẬT (entry point + Navigator setup)
├── package.json                    ← CẬP NHẬT (thêm dependencies)
├── index.js                        ← GIỮ NGUYÊN
├── context/
│   └── ThemeContext.js             ← TẠO MỚI
├── screens/
│   ├── HomeScreen.js               ← TẠO MỚI
│   ├── ProfileScreen.js            ← TẠO MỚI
│   ├── EditProfileScreen.js        ← TẠO MỚI
│   └── SettingsScreen.js           ← TẠO MỚI
└── components/
    ├── ProfileCard.js              ← TẠO MỚI
    └── ThemeToggleSwitch.js        ← TẠO MỚI
```

---

## 📦 CẬP NHẬT package.json

Cập nhật `package.json` với các dependencies sau:

```json
{
  "license": "0BSD",
  "main": "index.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~54.0.35",
    "expo-status-bar": "~3.0.9",
    "react": "19.1.0",
    "react-native": "0.81.5",
    "react-native-paper": "4.9.2",
    "@expo/vector-icons": "^15.0.3",
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/stack": "^6.3.20",
    "react-native-screens": "~4.4.0",
    "react-native-safe-area-context": "4.12.0",
    "@react-native-masked-view/masked-view": "^0.3.1",
    "formik": "^2.4.5",
    "yup": "^1.3.3"
  },
  "private": true
}
```

---

## 🎨 THEME DESIGN TOKENS

Sử dụng 2 theme sau cho toàn app:

```js
// LIGHT THEME
const lightTheme = {
  mode: 'light',
  background: '#F5F7FA',
  surface: '#FFFFFF',
  primary: '#4A90D9',
  primaryDark: '#2C6FAC',
  accent: '#7BC8A4',
  text: '#1A1A2E',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  card: '#FFFFFF',
  inputBg: '#F9FAFB',
  danger: '#EF4444',
  success: '#10B981',
  headerBg: '#FFFFFF',
  headerText: '#1A1A2E',
  shadow: '#00000015',
};

// DARK THEME
const darkTheme = {
  mode: 'dark',
  background: '#0F172A',
  surface: '#1E293B',
  primary: '#60A5FA',
  primaryDark: '#3B82F6',
  accent: '#34D399',
  text: '#F1F5F9',
  textSecondary: '#94A3B8',
  border: '#334155',
  card: '#1E293B',
  inputBg: '#0F172A',
  danger: '#F87171',
  success: '#34D399',
  headerBg: '#1E293B',
  headerText: '#F1F5F9',
  shadow: '#00000040',
};
```

---

## 📄 NỘI DUNG CHI TIẾT TỪNG FILE

---

### 1. `context/ThemeContext.js`

```jsx
import React, { createContext, useContext, useState } from 'react';

// Define theme tokens
const lightTheme = { /* dùng lightTheme ở trên */ };
const darkTheme = { /* dùng darkTheme ở trên */ };

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  
  const toggleTheme = () => setIsDark(prev => !prev);
  const theme = isDark ? darkTheme : lightTheme;
  
  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook để dùng theme dễ hơn
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
```

**Yêu cầu:** Export cả `ThemeContext`, `ThemeProvider`, và `useTheme`.

---

### 2. `App.js` — Navigation Root

```jsx
// Wrap toàn app trong ThemeProvider + NavigationContainer
// Dùng createStackNavigator
// Stack gồm 4 screens: Home, Profile, EditProfile, Settings
// Header style dựa theo theme (dynamic, đổi theo light/dark)
// Dùng React.useContext(ThemeContext) để lấy theme cho header options
```

**Cấu trúc navigation:**
- `Home` → title: "Welcome"
- `Profile` → title: "My Profile"  
- `EditProfile` → title: "Edit Profile"
- `Settings` → title: "Settings"

**Header styling:** background = `theme.headerBg`, tint = `theme.primary`, title color = `theme.headerText`

**Lưu ý:** Vì `NavigationContainer` không có access context bên ngoài, cần tạo component wrapper `AppNavigator` bên trong `ThemeProvider` để đọc theme rồi set `screenOptions` động.

---

### 3. `screens/HomeScreen.js`

**Layout:**
```
┌─────────────────────────────────┐
│                                 │
│    🌿  (icon plant hoặc emoji)  │
│                                 │
│   Welcome to ProfileApp         │  ← fontSize 28, fontWeight bold
│                                 │
│   Your personal space to        │
│   manage and share your         │  ← textSecondary color
│   profile with the world.       │
│                                 │
│  ┌───────────────────────────┐  │
│  │     View My Profile  →    │  │  ← primary button, navigate('Profile')
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │        ⚙️ Settings        │  │  ← outline button, navigate('Settings')
│  └───────────────────────────┘  │
│                                 │
└─────────────────────────────────┘
```

**Yêu cầu kỹ thuật:**
- `useTheme()` để lấy theme
- Background = `theme.background`
- Dùng Flexbox: `flex: 1`, `alignItems: 'center'`, `justifyContent: 'center'`
- Icon từ `@expo/vector-icons` (Ionicons "leaf" hoặc "person-circle")
- 2 TouchableOpacity styled buttons (primary + outline)
- Hiện greeting text dựa theo giờ: "Good morning/afternoon/evening, Explorer! 👋"

---

### 4. `screens/ProfileScreen.js`

**Hiển thị:**
- Avatar (dùng `https://ui-avatars.com/api/?name=YOUR_NAME&background=4A90D9&color=fff&size=128`)
- Name (lớn, bold)
- Bio (italic, textSecondary)
- Badge "Active Member 🌟"
- Nút "✏️ Edit Profile" → navigate('EditProfile', { name, bio, setName, setBio }) 
- Nút "⚙️ Settings" → navigate('Settings')

**State quản lý:**
```js
// Dùng useState LOCAL tại ProfileScreen
const [name, setName] = useState('Nguyen Van A');
const [bio, setBio] = useState('React Native enthusiast | FPT University student | Building cool apps 🚀');
```

**Nhận data từ EditProfileScreen qua route.params:**
```js
// Trong useEffect hoặc useFocusEffect:
useEffect(() => {
  if (route.params?.updatedName) setName(route.params.updatedName);
  if (route.params?.updatedBio) setBio(route.params.updatedBio);
}, [route.params]);
```

**Sử dụng component:** `<ProfileCard name={name} bio={bio} theme={theme} />`

---

### 5. `screens/EditProfileScreen.js`

**Form với Formik + Yup validation:**

```js
// Validation schema Yup:
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name is too long')
    .required('Name is required'),
  bio: Yup.string()
    .max(200, 'Bio cannot exceed 200 characters')
    .required('Bio is required'),
});
```

**Formik setup:**
```js
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
```

**UI Layout:**
```
┌─────────────────────────────────┐
│  Edit Your Profile              │
│                                 │
│  Display Name *                 │  ← label
│  ┌───────────────────────────┐  │
│  │ Nguyen Van A              │  │  ← TextInput (controlled)
│  └───────────────────────────┘  │
│  Name must be at least 2...     │  ← error (đỏ, chỉ hiện khi touched)
│                                 │
│  Bio *                          │
│  ┌───────────────────────────┐  │
│  │ React Native enthusiast   │  │  ← multiline TextInput, 4 dòng
│  │ ...                       │  │
│  └───────────────────────────┘  │
│  Bio cannot exceed 200...       │  ← error
│  150/200                        │  ← character counter
│                                 │
│  ┌───────────────────────────┐  │
│  │      💾 Save Changes      │  │  ← primary button, disabled nếu invalid
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │         Cancel            │  │  ← outline button, goBack()
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

**Input styling:**
- Border đỏ nếu có lỗi: `borderColor: formik.errors.name && formik.touched.name ? theme.danger : theme.border`
- Background = `theme.inputBg`
- Text = `theme.text`
- Placeholder color = `theme.textSecondary`

---

### 6. `screens/SettingsScreen.js`

**Layout:**
```
┌─────────────────────────────────┐
│  Preferences                    │
│                                 │
│  ┌───────────────────────────┐  │
│  │ 🎨 Appearance             │  │  ← section header
│  │                           │  │
│  │  Dark Mode    [toggle]    │  │  ← ThemeToggleSwitch component
│  │  ☀️ Light / 🌙 Dark       │  │  ← sub-label
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │ ℹ️ About                  │  │  ← section header
│  │  Version: 1.0.0           │  │
│  │  Assignment 1 - FPT Uni   │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │  ← Back to Home           │  │  ← navigate('Home')
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

---

### 7. `components/ProfileCard.js`

**Props:** `{ name, bio, theme, avatarUrl? }`

```jsx
// Hiển thị card với:
// - Avatar tròn (width: 100, height: 100, borderRadius: 50)
// - Tên người dùng (bold, lớn)
// - Bio (italic)
// - Badge "Active Member 🌟"
// - Shadow/elevation dựa theo theme.mode
// Background = theme.card
// Border = theme.border
// Text = theme.text
```

**Style mẫu cho card:**
```js
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
}
```

---

### 8. `components/ThemeToggleSwitch.js`

**Props:** `{ isDark, onToggle, theme }`

```jsx
// Hiện Switch (React Native built-in) với label
// isDark = false → hiện "☀️ Light Mode"
// isDark = true → hiện "🌙 Dark Mode"
// trackColor={{ false: '#CBD5E1', true: theme.primary }}
// thumbColor = isDark ? theme.accent : '#FFFFFF'
// Wrap trong TouchableOpacity với Row layout
```

---

## ✅ CHECKLIST YÊU CẦU

Đảm bảo đáp ứng **TẤT CẢ** các điểm sau:

### Navigation
- [x] Stack Navigator với 4 screens
- [x] Navigate Home → Profile → EditProfile (và ngược lại)
- [x] Navigate từ bất kỳ screen nào đến Settings
- [x] Header động theo theme

### State Management
- [x] `useState` tại ProfileScreen cho name và bio
- [x] Pass data từ EditProfile về Profile qua `navigation.navigate('Profile', { updatedName, updatedBio })`
- [x] ThemeContext với `useState` cho isDark

### Context API
- [x] ThemeContext được tạo và export
- [x] ThemeProvider wrap toàn app trong App.js
- [x] `useTheme()` custom hook
- [x] Tất cả screens dùng `useTheme()` để lấy theme

### Form Validation
- [x] Formik cho EditProfileScreen
- [x] Yup schema với min/max/required
- [x] Hiển thị lỗi khi touched
- [x] Character counter cho bio
- [x] Disable nút Save khi form invalid hoặc đang submit

### Styling
- [x] StyleSheet.create() cho mọi component
- [x] Responsive Flexbox layout
- [x] Tất cả colors dùng từ theme (KHÔNG hardcode màu)
- [x] Dark mode đổi toàn bộ màu app
- [x] Thống nhất padding/margin/borderRadius

### Components
- [x] `ProfileCard` reusable component
- [x] `ThemeToggleSwitch` reusable component

---

## 🚫 NHỮNG THỨ CẦN TRÁNH

1. **KHÔNG** dùng `expo install` hay `npm install` — thêm vào `package.json` của Snack
2. **KHÔNG** import từ `react-native-gesture-handler` trực tiếp (Snack đã bundle)
3. **KHÔNG** dùng `AsyncStorage` (không yêu cầu trong assignment này)
4. **KHÔNG** hardcode màu sắc — luôn dùng `theme.xxx`
5. **KHÔNG** dùng `class components` — chỉ functional components + hooks
6. **KHÔNG** để `console.error` uncaught — wrap navigation param access cẩn thận
7. **KHÔNG** quên `KeyboardAvoidingView` ở EditProfileScreen (để keyboard không che input)

---

## 🔧 XỬ LÝ LỖI THƯỜNG GẶP TRONG EXPO SNACK

### Lỗi "Unable to resolve module @react-navigation/stack"
→ Kiểm tra package.json đã có đúng version chưa. Trong Snack cần **lưu file** để trigger re-install.

### Lỗi "createStackNavigator is not a function"
→ Import đúng: `import { createStackNavigator } from '@react-navigation/stack';`

### Header không đổi theme khi toggle
→ Dùng `navigation.setOptions()` trong `useEffect` watch `theme`:
```js
useEffect(() => {
  navigation.setOptions({
    headerStyle: { backgroundColor: theme.headerBg },
    headerTintColor: theme.primary,
    headerTitleStyle: { color: theme.headerText },
  });
}, [theme]);
```

### Formik types với React 19
→ Nếu có TypeScript warning, bỏ qua (Snack dùng JS).

---

## 📝 VÍ DỤ HOÀN CHỈNH: App.js

```jsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import SettingsScreen from './screens/SettingsScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  const { theme } = useTheme();
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.headerBg,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: theme.primary,
          headerTitleStyle: {
            fontWeight: 'bold',
            color: theme.headerText,
            fontSize: 18,
          },
          cardStyle: { backgroundColor: theme.background },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Welcome' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'My Profile' }} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Edit Profile' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
```

---

## 🎨 VÍ DỤ: Button Component Pattern (dùng lại ở mọi nơi)

```jsx
// Primary Button
<TouchableOpacity
  style={[styles.button, { backgroundColor: theme.primary }]}
  onPress={handlePress}
  activeOpacity={0.8}
>
  <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Button Label</Text>
</TouchableOpacity>

// Outline Button
<TouchableOpacity
  style={[styles.outlineButton, { borderColor: theme.primary }]}
  onPress={handlePress}
  activeOpacity={0.8}
>
  <Text style={[styles.outlineButtonText, { color: theme.primary }]}>Button Label</Text>
</TouchableOpacity>

// Trong StyleSheet:
const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginVertical: 6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  outlineButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    width: '100%',
    marginVertical: 6,
  },
  outlineButtonText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
```

---

## 🏁 THỨ TỰ TẠO FILE

Tạo theo thứ tự sau để tránh import error:

1. `context/ThemeContext.js`
2. `components/ProfileCard.js`
3. `components/ThemeToggleSwitch.js`
4. `screens/HomeScreen.js`
5. `screens/ProfileScreen.js`
6. `screens/EditProfileScreen.js`
7. `screens/SettingsScreen.js`
8. `App.js` (cập nhật cuối cùng)
9. `package.json` (cập nhật dependencies)

---

*Prompt này được tối ưu cho Claude Code trong Antigravity IDE (Expo Snack). Sau khi tạo xong tất cả file, lưu project và chờ Snack tải lại dependencies (~30 giây).*
