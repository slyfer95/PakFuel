import { React, useState, useCallback } from 'react';
import { useAuth } from 'src/contexts/AuthProvider';
import {
  StyleSheet,
  RefreshControl,
  Alert,
  ImageBackground,
} from 'react-native';
import { Eye, EyeOff, Mail } from 'lucide-react-native';

import {
  Box,
  VStack,
  Image,
  Input,
  InputField,
  InputSlot,
  InputIcon,
  Button,
  ButtonText,
  Divider,
  ScrollView,
  Pressable,
  Text,
  Link,
  LinkText,
  ButtonSpinner,
  HStack,
} from '@gluestack-ui/themed';

export const LoginScreen = ({ navigation }) => {
  const { loginWithEmailAndPassword, loading } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [show, setShow] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      console.log(`loading: ${loading}`);
    }, 2000);
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await loginWithEmailAndPassword(email, password);
    } catch (error) {
      Alert.alert(`Error: ${error}`);
    }
  };

  return (
    <Box style={styles.container}>
      <ImageBackground
        source={require('src/assets/background.png')}
        resizeMode="cover"
        style={{ flex: 1, width: '100%', alignItems: 'center' }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Image
            alt="Logo"
            size={'2xl'}
            source={require('src/assets/logo.png')}
          />
          <Box mt="$10" style={styles.login}>
            <VStack style={styles.vstack} space="sm" reversed={false}>
              <Input
                variant="underlined"
                size="xl"
                mb="$5"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                isRequired={true}>
                <InputSlot mr="$3">
                  <InputIcon as={Mail} />
                </InputSlot>
                <InputField
                  onChangeText={text => setEmail(text)}
                  type="email"
                  placeholder="Enter Email"
                />
              </Input>
              <Input
                variant="underlined"
                size="xl"
                mb="$5"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                isRequired={true}>
                <InputField
                  onChangeText={text => setPassword(text)}
                  type={show ? 'text' : 'password'}
                  placeholder="Enter Password"
                />
                <InputSlot>
                  {show ? (
                    <Pressable
                      onPress={() => {
                        setShow(false);
                      }}>
                      <InputIcon as={EyeOff} />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => {
                        setShow(true);
                      }}>
                      <InputIcon as={Eye} />
                    </Pressable>
                  )}
                </InputSlot>
              </Input>
              <Pressable onPress={handleLogin}>
                <Box
                  py="$3"
                  mt="$3"
                  alignItems="center"
                  w="$72"
                  style={{ borderRadius: 50, backgroundColor: '#10b981' }}>
                  {loading ? (
                    <ButtonSpinner mr="$1" />
                  ) : (
                    <ButtonText fontSize={20} fontWeight="bold">
                      Login
                    </ButtonText>
                  )}
                </Box>
              </Pressable>
              <Divider my="$5" />
              <HStack w="$72">
                <Text size="md">Don't have an account? </Text>
                <Link onPress={() => navigation.navigate('Register')}>
                  <LinkText size="md">Sign Up!</LinkText>
                </Link>
              </HStack>
            </VStack>
          </Box>
        </ScrollView>
      </ImageBackground>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  login: {
    flex: 1,
  },
  image: {
    justifyContent: 'center',
  },
  vstack: {
    alignItems: 'center',
    flex: 1,
  },
  login: {
    justifyContent: 'flex-end',
  },
});
