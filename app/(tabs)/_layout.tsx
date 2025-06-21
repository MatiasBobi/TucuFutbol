import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Tabs } from 'expo-router';
import React from 'react';
import { Pressable, StatusBar } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

const queryClient = new QueryClient();
export default function Layout() {
  const insets = useSafeAreaInsets();
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#1b450e"
          translucent={false}
        />
        <Tabs
          screenOptions={{
            tabBarStyle: {
              backgroundColor: '#427130',
              borderTopWidth: 0,
              paddingBottom: insets.bottom,
              height: 60 + insets.bottom,
              elevation: 0,
              shadowOpacity: 0,
            },
            animation: 'shift',
            tabBarActiveTintColor: '#d6c277',
            tabBarInactiveTintColor: '#e4e7ef',
            headerStyle: {
              backgroundColor: '#427130',
            },
            headerTintColor: '#ffffff',
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
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
