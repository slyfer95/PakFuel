import { React, useState } from 'react';
import { useAuth, useCurrentUser } from 'src/contexts/AuthProvider';
import { supabase } from 'src/services/supabaseClient';
import { StyleSheet, Alert } from 'react-native';

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
  Heading,
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
        <ScrollView h="$80" w="$72">
          <Image
            alt="Logo"
            size={'2xl'}
            source={require('src/assets/logo.png')}
          />
          <VStack style={styles.vstack} space="sm" reversed={false}>
            <Heading>Update User Profile</Heading>
            {/* First Name */}
            <Box w="$72">
              <FormControl
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                isRequired={true}>
                <FormControlLabel mb="$2">
                  <FormControlLabelText>First Name</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    type="text"
                    onChangeText={text => setFirstName(text)}
                    placeholder="Enter your First Name!"
                  />
                </Input>
              </FormControl>
            </Box>
            {/* Last Name */}
            <Box w="$72">
              <FormControl
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                isRequired={true}>
                <FormControlLabel mb="$2">
                  <FormControlLabelText>Last Name</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    type="text"
                    onChangeText={text => setLastName(text)}
                    placeholder="Enter your Last Name!"
                  />
                </Input>
              </FormControl>
            </Box>
            {/* CNIC */}
            <Box w="$72">
              <FormControl
                size="md"
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                isRequired={true}>
                <FormControlLabel mb="$2">
                  <FormControlLabelText>CNIC</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    keyboardType="numeric"
                    onChangeText={text => setCnicNumber(text)}
                    placeholder="xxxxxxxxxxxxxxxx"
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
                onPress={handleComplete}>
                <ButtonText>Complete</ButtonText>
              </Button>
              <Divider my="$2" />
            </Box>
          </VStack>
        </ScrollView>
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
    flex: 1,
  },
  login: {
    justifyContent: 'flex-end',
  },
});
