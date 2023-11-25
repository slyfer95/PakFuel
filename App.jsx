import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// /////////////////////////////////////////////////////////////////////
import { GluestackUIProvider, Text, Box } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config'; // Optional if you want to use default theme

import { ThemeProvider, useTheme, getNavigatorTheme } from 'src/themes';
import { AuthProvider, useAuth } from 'src/contexts/AuthProvider';
import { Layout, Spinner } from 'src/components';

import { AppNavigator } from 'src/navigators/AppNavigator';
import { AuthNavigator } from 'src/navigators/AuthNavigator';
import './src/translations/i18n';
/* polyfills */
/** URL polyfill */
import 'react-native-url-polyfill/auto';

const App = () => {
  return (
    <GluestackUIProvider config={config}>
      <ThemeProvider>
        <AuthProvider>
          <Layout>
            <Root />
          </Layout>
        </AuthProvider>
      </ThemeProvider>
    </GluestackUIProvider>
  );
};
export default App;

const Root = () => {
  const { theme } = useTheme();
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <NavigationContainer theme={getNavigatorTheme(theme)}>
        <AuthNavigator />
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer theme={getNavigatorTheme(theme)}>
      {currentUser !== null ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
