import { React, useState } from 'react';
import { useAuth, useCurrentUser } from 'src/contexts/AuthProvider';
import { supabase } from 'src/services/supabaseClient';
import { StyleSheet, Alert, ImageBackground } from 'react-native';

import {
  Box,
  VStack,
  FormControl,
  FormControlError,
  FormControlErrorText,
  Image,
  Input,
  InputField,
  Button,
  ButtonText,
  Pressable,
  Divider,
  ScrollView,
  Text,
  Heading,
  Avatar,
  AvatarFallbackText,
  Spinner,
} from '@gluestack-ui/themed';

export const UpdateProfile = ({ navigation }) => {
  const user = useCurrentUser();
  const { loading } = useAuth();
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [cnic, setCnicNumber] = useState('0');

  const [profile, setProfile] = useState(user.cnic === '0' ? false : true);

  const handleFragment = flag => {
    setProfile(!flag);
  };

  const handleComplete = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ first_name, last_name, cnic })
        .eq('id', user.id);
      if (error) {
        setError(error);
      } else {
        handleFragment(profile);
        Alert.alert(`Profile Updated!`);
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert(`Error: ${error}`);
      navigation.goBack();
    }
  };

  const CompleteProfileFragment = profile => {
    if (loading) {
      return <Spinner size="large" />;
    } else {
      return (
        <ImageBackground
          source={require('src/assets/background.png')}
          resizeMode="cover"
          style={{ flex: 1, width: '100%', alignItems: 'center' }}>
          <ScrollView h="$80" w="$72">
            {/* <Image
              alt="Logo"
              size={'2xl'}
              source={require('src/assets/logo.png')}
            /> */}

            <Avatar
              bgColor="$amber600"
              size="2xl"
              mt="$20"
              alignSelf="center"
              borderRadius="$full">
              <AvatarFallbackText>{user.first_name}</AvatarFallbackText>
            </Avatar>

            <VStack style={styles.vstack} space="lg" reversed={false}>
              {/* First Name */}
              <Box w="$72">
                <FormControl
                  size="md"
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                  isRequired={true}>
                  <Input variant="underlined" size="lg" isRequired={true}>
                    <InputField
                      type="text"
                      onChangeText={text => setFirstName(text)}
                      placeholder="First Name"
                    />
                  </Input>
                  <FormControlError>
                    <FormControlErrorText>
                      Please Enter First Name.
                    </FormControlErrorText>
                  </FormControlError>
                </FormControl>
              </Box>
              {/* Last Name */}
              <Box w="$72">
                <Input variant="underlined" size="lg">
                  <InputField
                    type="text"
                    onChangeText={text => setLastName(text)}
                    placeholder="Last Name"
                  />
                </Input>
              </Box>
              {/* CNIC */}
              <Box w="$72">
                <Input variant="underlined" size="lg">
                  <InputField
                    keyboardType="numeric"
                    onChangeText={text => setCnicNumber(text)}
                    placeholder="CNIC without dashes"
                  />
                </Input>
              </Box>
              {/* Update */}
              <Box w="$72" style={styles.login}>
                <Pressable onPress={handleComplete}>
                  <Box
                    py="$3"
                    mt="$3"
                    alignItems="center"
                    w="$72"
                    style={{ borderRadius: 50, backgroundColor: '#0077E6' }}>
                    <ButtonText fontSize={18} fontWeight="bold">
                      Update
                    </ButtonText>
                  </Box>
                </Pressable>
              </Box>
            </VStack>
          </ScrollView>
        </ImageBackground>
      );
    }
  };

  return <Box style={styles.container}>{CompleteProfileFragment(profile)}</Box>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',

    alignItems: 'center',
  },
  vstack: {
    alignItems: 'center',
    marginTop: '7%',
    flex: 1,
  },
  login: {
    justifyContent: 'flex-end',
  },
});
