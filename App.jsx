import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// /////////////////////////////////////////////////////////////////////
import { GluestackUIProvider, Spinner } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config'; // Optional if you want to use default theme

import { ThemeProvider } from 'src/themes';
import { AuthProvider, useAuth } from 'src/contexts/AuthProvider';
import { Layout } from 'src/components';

import { AppNavigator } from 'src/navigators/AppNavigator';
import { AuthNavigator } from 'src/navigators/AuthNavigator';
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
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <Spinner size="large" alignSelf="center" />;
  }

  return (
    <NavigationContainer>
      {currentUser !== null ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
