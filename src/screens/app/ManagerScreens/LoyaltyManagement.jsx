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
  Input,
  InputField,
  Button,
  ButtonText,
  Divider,
  Text,
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
} from '@gluestack-ui/themed';
import { ChevronDownIcon, Coins } from 'lucide-react-native';

export const LoyaltyManagement = ({ route }) => {
  const { item } = route.params;
  const user = useCurrentUser();
  const { loading } = useAuth();
  const [category, setCategory] = useState('');
  const [reward_type, setRewardType] = useState('');
  const [reward_condition, setRewardCondition] = useState(item.reward_value);
  const [reward_value, setRewardValue] = useState('');
  const [error, setError] = useState(undefined);

  const handleSelectChange = value => {
    setRewardType(value);
  };

  return (
    <Box style={styles.container}>
      <VStack style={styles.vstack} mt="$10" space="sm" reversed={false}>
        <Icon as={Coins} size={150} />
        <Box w="$72">
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger variant="outline" size="md">
              <SelectInput placeholder="Select Category" />
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
                <SelectItem label="Petrol" value="petrol" />
                <SelectItem label="Super Unleashed" value="superunleashed" />
                <SelectItem label="CNG" value="CNG" />
                <SelectItem label="Diesel" value="Diesel" />
                <SelectItem label="H-Octane Diesel" value="hoctane" />
              </SelectContent>
            </SelectPortal>
          </Select>
        </Box>

        <Box w="$72" mt="$5">
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger variant="outline" size="md">
              <SelectInput placeholder="Select Reward Type" />
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
                <SelectItem label="Discount" value="discount" />
                <SelectItem label="Cashback" value="cashback" />
              </SelectContent>
            </SelectPortal>
          </Select>
        </Box>

        <Box w="$72">
          <FormControl
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
            isRequired={true}>
            <FormControlLabel mb="$2">
              <FormControlLabelText>Threshold Amount</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                keyboardType="numeric"
                onChangeText={text => setRewardCondition(text)}
                placeholder="Enter Amount"
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
            <FormControlLabel mb="$2">
              <FormControlLabelText>Reward Amount</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                keyboardType="numeric"
                onChangeText={text => setRewardValue(text)}
                placeholder="Enter Reward Amount"
              />
            </Input>
          </FormControl>
        </Box>

        <Box w="$72" style={styles.login}>
          <Button
            size="md"
            variant="outline"
            action="negative"
            isDisabled={false}
            isFocusVisible={false}
            onPress={() => Alert.alert('Are you sure you want to delete?')}>
            <ButtonText>Delete</ButtonText>
          </Button>
        </Box>

        <Box w="$72" style={styles.login}>
          <Button
            size="md"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}
            onPress={() => Alert.alert('Are you sure you want to update?')}>
            <ButtonText>Update</ButtonText>
          </Button>
        </Box>
      </VStack>
    </Box>
  );
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
