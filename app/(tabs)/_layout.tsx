import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
				headerShown: false
			}}>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Home',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon name={focused ? 'sunny' : 'sunny-outline'} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="articles"
				options={{
					title: 'Articles',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon name={focused ? 'newspaper' : 'newspaper-outline'} color={color} />
					),
				}}
			/>
		</Tabs>
	)
}