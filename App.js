import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import SkinsListScreen from './screens/SkinListScreen';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ProfileScreen from './screens/ProfileScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{
            drawerStyle: {
              backgroundColor: '#121212',
              width: 240,
            },
            drawerActiveTintColor: '#FFD700',
            drawerInactiveTintColor: 'rgba(255, 215, 0, 0.6)',
            drawerLabelStyle: {
              fontSize: 16,
              fontWeight: 'bold',
            },
            headerStyle: {
              backgroundColor: '#1E1E1E',
            },
            headerTintColor: '#FFD700',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Drawer.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="home" size={24} color={color} />
              ),
            }}
          />
          <Drawer.Screen 
            name="AWP" 
            component={SkinsListScreen} 
            initialParams={{ weaponType: 'AWP' }}
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="target" size={24} color={color} /> 
              ),
            }}
          />
          <Drawer.Screen 
            name="Knife" 
            component={SkinsListScreen} 
            initialParams={{ weaponType: 'Knife' }}
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="knife" size={24} color={color} /> 
              ),
            }}
          />
          <Drawer.Screen 
            name="AK-47" 
            component={SkinsListScreen} 
            initialParams={{ weaponType: 'AK-47' }}
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="pistol" size={24} color={color} /> 
              ),
            }}
          />
          <Drawer.Screen 
            name="Notificações" 
            component={NotificationsScreen} 
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="bell" size={24} color={color} />
              ),
            }}
          />
          <Drawer.Screen 
            name="Perfil" 
            component={ProfileScreen} 
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="account" size={24} color={color} />
              ),
            }}
          />
          <Drawer.Screen 
            name="Configurações" 
            component={SettingsScreen} 
            options={{
              drawerIcon: ({ color }) => (
                <Icon name="cog" size={24} color={color} />
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}