import { Tabs } from 'expo-router';
import { useBoundStore } from '@/store/store';
import { Colors } from '@/constants/colors';
import { Feather } from '@expo/vector-icons';

export default function TabLayout() {
  const theme = useBoundStore((state) => state.theme);

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: Colors[theme].tabBarActiveTint,
        tabBarInactiveTintColor: Colors[theme].tabBarInactiveTint,
        tabBarStyle: {
          height: 80,
          backgroundColor: Colors[theme].background,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Feather name="home" color={color} size={28} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Feather name="settings" color={color} size={28} />,
        }}
      />
    </Tabs>
  );
}
