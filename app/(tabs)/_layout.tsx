import Logo from '@/components/Logo/Logo';
import { Colors } from '@/constants/colors/colors';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import { setBackgroundColorAsync } from 'expo-system-ui';
import React, { useEffect } from 'react';
import { Pressable, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Layout() {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    setBackgroundColorAsync('#041026');
  }, []);
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.DARK_BLUE}
        translucent={false}
      />
      <Tabs
        screenOptions={{
          headerShown: true,
          tabBarStyle: {
            backgroundColor: Colors.DARK_BLUE,
            paddingBottom: insets.bottom,
            height: 60 + insets.bottom,
          },

          animation: 'fade',
          tabBarActiveTintColor: Colors.YELLOW_GOAL,
          tabBarInactiveTintColor: Colors.GRAY_LIGHT,
          headerStyle: {
            backgroundColor: Colors.DARK_BLUE,
          },
          headerTitle: () => <Logo />,
          headerTintColor: Colors.WHITE_GRAY,
          tabBarItemStyle: {
            backgroundColor: 'transparent',
          },

          tabBarButton: (props) => (
            // @ts-ignore
            <Pressable
              {...props}
              android_ripple={{ color: 'transparent' }}
            ></Pressable>
          ),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Hoy',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" size={32} color={color} />
            ),
            tabBarLabelStyle: {
              fontSize: 16,
              fontWeight: 'bold',
            },
          }}
        />
        <Tabs.Screen
          name="leagues"
          options={{
            title: 'Ligas',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="soccer" size={24} color={color} />
            ),
            tabBarLabelStyle: {
              fontSize: 16,
              fontWeight: 'bold',
            },
          }}
        />
        <Tabs.Screen
          name="favoritesteam"
          options={{
            title: 'Mis Equipos',
            tabBarIcon: ({ color }) => (
              <Fontisto name="favorite" size={24} color={Colors.WHITE_GRAY} />
            ),
            tabBarLabelStyle: {
              fontSize: 16,
              fontWeight: 'bold',
            },
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Ajustes',
            tabBarIcon: ({ color }) => (
              <Fontisto name="player-settings" size={24} color="white" />
            ),
            tabBarLabelStyle: {
              fontSize: 16,
              fontWeight: 'bold',
            },
          }}
        />
      </Tabs>
    </>
  );
}
