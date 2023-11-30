import { React, useState } from 'react';
import {
  useAuth,
  useCurrentUser,
  updateCurrentUser,
} from 'src/contexts/AuthProvider';
import { supabase } from 'src/services/supabaseClient';
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
  Heading,
  Spinner,
  Select,
  SelectTrigger,
  SelectInput,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
  SelectIcon,
  Icon,
  Radio,
  RadioGroup,
  RadioIndicator,
  RadioIcon,
  CircleIcon,
  RadioLabel,
} from '@gluestack-ui/themed';
import { ChevronDownIcon } from 'lucide-react-native';

export const CompleteProfileScreen = ({ navigation }) => {
  const user = useCurrentUser();
  const { loading } = useAuth();
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [cnic, setCnicNumber] = useState('0');
  const [role, setRole] = useState('');
  const [firm, setFirm] = useState('');
  const [error, setError] = useState(undefined);

  const [profile, setProfile] = useState(user.cnic === '0' ? false : true);

  const handleFragment = flag => {
    console.log(profile);
    setProfile(!flag);
  };

  const handleSelectChange = value => {
    setFirm(value);
  };

  const handleRadioChange = value => {
    setRole(value);
  };

  const handleComplete = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ first_name, last_name, cnic, firm, role })
        .eq('id', user.id);
      if (error) {
        setError(error);
      } else {
        updateCurrentUser({ first_name, last_name, cnic, firm, role });
        handleFragment(profile);
        Alert.alert(t('profileUpdated'));
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const CompleteProfileFragment = profile => {
    if (loading) {
      return <Spinner size="large" />;
    }
    if (error) {
      return <Text>Error: {error.message}</Text>;
    }
    if (profile) {
      if (user.role === 'manager') {
        navigation.navigate('Manager');
      } else {
        navigation.navigate('Employee');
      }
    } else {
      return (
        <ScrollView h="$80" w="$72">
          <Image
            alt="Logo"
            size={'2xl'}
            source={require('src/assets/logo.png')}
          />
          <VStack style={styles.vstack} space="sm" reversed={false}>
            <Heading>Complete User Profile</Heading>
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
            {/* Firm */}
            <Box w="$72">
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger variant="outline" size="md">
                  <SelectInput placeholder="Select Firm" />
                  <SelectIcon mr="$3">
                    <Icon as={ChevronDownIcon} />
                  </SelectIcon>
                </SelectTrigger>
                <SelectPortal>
                  <SelectBackdrop />
                  <SelectContent>
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    <SelectItem label="PSO" value="pso" />
                    <SelectItem label="Caltex" value="caltex" />
                    <SelectItem label="Byco" value="byco" />
                    <SelectItem label="Shell" value="shell" />
                    <SelectItem label="Hascol" value="hascol" />
                  </SelectContent>
                </SelectPortal>
              </Select>
            </Box>
            {/* Role */}
            <Box w="$72">
              <RadioGroup onChange={handleRadioChange}>
                <Radio
                  value="manager"
                  size="md"
                  isInvalid={false}
                  isDisabled={false}>
                  <RadioIndicator mr="$2">
                    <RadioIcon as={CircleIcon} strokeWidth={1} />
                  </RadioIndicator>
                  <RadioLabel>Loyalty Program Manager</RadioLabel>
                </Radio>
                <Radio
                  value="employee"
                  size="md"
                  isInvalid={false}
                  isDisabled={false}>
                  <RadioIndicator mr="$2">
                    <RadioIcon as={CircleIcon} strokeWidth={1} />
                  </RadioIndicator>
                  <RadioLabel>Station Employee</RadioLabel>
                </Radio>
              </RadioGroup>
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
