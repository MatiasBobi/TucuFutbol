import { Colors } from '@/constants/colors/colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Pressable, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Layout() {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.DARK_BLUE}
        translucent={false}
      />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: Colors.DARK_BLUE,
            borderTopWidth: 0,
            paddingBottom: insets.bottom,
            height: 60 + insets.bottom,
            elevation: 0,
            shadowOpacity: 0,
          },
          animation: 'fade',
          tabBarActiveTintColor: Colors.YELLOW_GOAL,
          tabBarInactiveTintColor: Colors.GRAY_LIGHT,
          headerStyle: {
            backgroundColor: Colors.DARK_BLUE,
          },
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
      </Tabs>
    </>
  );
}
