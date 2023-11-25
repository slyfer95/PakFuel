import { React, useState } from 'react';
import { useAuth } from 'src/contexts/AuthProvider';
import { StyleSheet } from 'react-native';

import {
  Box,
  VStack,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Image,
  Input,
  InputField,
  Button,
  ButtonText,
  Divider,
  ScrollView,
  Text,
  Link,
  LinkText,
  HStack,
  Spinner,
} from '@gluestack-ui/themed';

export const LoginScreen = () => {
  const { loginWithEmailAndPassword, registerWithEmailAndPassword, loading } =
    useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signup, setSignUp] = useState(false);
  const [errorOccur, setErrorOccur] = useState(undefined);

  const handleFragment = flag => {
    if (flag) {
      setSignUp(true);
    } else {
      setSignUp(false);
    }
  };

  const handleSelectChange = value => {
    setFirm(value);
  };

  const handleRadioChange = value => {
    setRole(value);
  };

  const handleSignUp = () => {
    try {
      registerWithEmailAndPassword(email, password);
    } catch (error) {
      setErrorOccur(error);
    }
  };

  const handleLogin = () => {
    try {
      loginWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
      setErrorOccur(error);
    }
  };

  const SignUpFragment = signup => {
    if (loading) {
      return <Spinner mt="$25" size="large" />;
    }
    if (errorOccur) {
      return (
        <Box>
          <Text color="red.500" textAlign="center">
            {errorOccur.message}
          </Text>
        </Box>
      );
    }
    if (signup) {
      return (
        <ScrollView h="$80" w="$72">
          <VStack style={styles.vstack} space="sm" reversed={false}>
            {/* Email */}
            <Box w="$72">
              <FormControl
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                isRequired={true}>
                <FormControlLabel mb="$2">
                  <FormControlLabelText>Email</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    type="email"
                    onChangeText={text => setEmail(text)}
                    placeholder="Enter your Email Address!"
                  />
                </Input>
              </FormControl>
            </Box>
            {/* Password */}
            <Box w="$72">
              <FormControl
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                isRequired={true}>
                <FormControlLabel mb="$1">
                  <FormControlLabelText>Password</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    type="password"
                    onChangeText={text => setPassword(text)}
                    placeholder="Enter Password"
                  />
                </Input>
              </FormControl>
            </Box>
            {/* SignUp */}
            <Box w="$72" style={styles.login}>
              <Button
                size="md"
                variant="solid"
                action="primary"
                isDisabled={false}
                isFocusVisible={false}
                onPress={handleSignUp}>
                <ButtonText>Sign Up</ButtonText>
              </Button>
              <Divider my="$2" />
            </Box>
            <HStack w="$72">
              <Text size="sm">Already have an account? </Text>
              <Link onPress={() => handleFragment(false)}>
                <LinkText size="sm">Login!</LinkText>
              </Link>
            </HStack>
          </VStack>
        </ScrollView>
      );
    } else {
      return (
        <VStack style={styles.vstack} space="sm" reversed={false}>
          <Box w="$72">
            <FormControl
              size="md"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
              isRequired={true}>
              <FormControlLabel mb="$2">
                <FormControlLabelText>Email</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  onChangeText={text => setEmail(text)}
                  type="email"
                  placeholder="Enter your Email!"
                />
              </Input>
            </FormControl>
          </Box>
          <Box w="$72">
            <FormControl
              size="md"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
              isRequired={true}>
              <FormControlLabel mb="$1">
                <FormControlLabelText>Password</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type="password"
                  onChangeText={text => setPassword(text)}
                  placeholder="Enter Password"
                />
              </Input>
            </FormControl>
          </Box>
          <Box w="$72" style={styles.login}>
            <Button
              size="md"
              variant="solid"
              action="primary"
              isDisabled={false}
              isFocusVisible={false}
              onPress={handleLogin}>
              <ButtonText>Login </ButtonText>
            </Button>
            <Divider my="$2" />
          </Box>
          <HStack w="$72">
            <Text size="sm">Don't have an account? </Text>
            <Link onPress={() => handleFragment(true)}>
              <LinkText size="sm">Sign Up!</LinkText>
            </Link>
          </HStack>
        </VStack>
      );
    }
  };

  return (
    <Box style={styles.container}>
      <Image alt="Logo" size={'2xl'} source={require('src/assets/logo.png')} />
      <Box style={styles.signup}>{SignUpFragment(signup)}</Box>
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
