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
  Pressable,
  ButtonText,
  ScrollView,
} from '@gluestack-ui/themed';

export const SignUpScreen = () => {
  const { registerWithEmailAndPassword, loading } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [show, setShow] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      registerWithEmailAndPassword(email, password);
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
          <Box style={styles.signup}>
            <ScrollView h="$80" w="$72">
              <VStack style={styles.vstack} space="sm" reversed={false}>
                <Input
                  variant="underlined"
                  size="xl"
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                  isRequired={true}>
                  <InputSlot mr="$3">
                    <InputIcon as={Mail} />
                  </InputSlot>
                  <InputField
                    type="email"
                    onChangeText={text => setEmail(text)}
                    placeholder="Enter your Email Address!"
                  />
                </Input>
                <Input
                  variant="underlined"
                  size="xl"
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                  isRequired={true}>
                  <InputField
                    type="password"
                    onChangeText={text => setPassword(text)}
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
                <Pressable onPress={handleSignUp}>
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
                        Sign Up
                      </ButtonText>
                    )}
                  </Box>
                </Pressable>
              </VStack>
            </ScrollView>
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
  },
  signup: {
    flex: 1,
  },
  vstack: {
    alignItems: 'center',
    flex: 1,
  },
  login: {
    justifyContent: 'flex-end',
  },
});
