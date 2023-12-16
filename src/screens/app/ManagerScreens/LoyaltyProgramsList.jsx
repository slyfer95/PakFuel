import React from 'react';
import { useCurrentUser } from 'src/contexts/AuthProvider';
import { StyleSheet } from 'react-native';
import { supabase } from 'src/services/supabaseClient';
import {
  Box,
  Text,
  Spinner,
  HStack,
  FlatList,
  Heading,
  Pressable,
  Button,
  ButtonText,
  ButtonIcon,
  VStack,
} from '@gluestack-ui/themed';
import { Plus } from 'lucide-react-native';

export const LoyaltyProgramsList = ({ navigation }) => {
  const user = useCurrentUser();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [ProgramList, setProgramList] = React.useState(null);
  React.useEffect(() => {
    getPrograms();
  }, []);

  const getPrograms = async () => {
    const { data, error } = await supabase
      .from('loyalty_programs')
      .select('*')
      .eq('firm', user.firm);
    if (error) {
      setLoading(false);
      setError(true);
    } else {
      setLoading(false);
      setProgramList(data);
    }
  };
  const FragmentedScreen = () => {
    if (error) {
      return <Text>Database Error!</Text>;
    }
    if (loading) {
      return <Spinner mt="$5" size="large" />;
    }
    if (ProgramList) {
      return (
        <Box>
          <FlatList
            data={ProgramList}
            w="100%"
            renderItem={({ item }) => (
              <Pressable
                style={{ alignItems: 'center' }}
                bgColor={'$borderDark100'}
                onPress={() => {
                  navigation.navigate('Loyalty Program', { item });
                }}
                w="100%"
                borderColor="$trueGray800"
                py="$2"
                px="$4">
                <HStack
                  w="100%"
                  space="md"
                  justifyContent="space-between"
                  alignItems="center">
                  <VStack>
                    <Heading color="$coolGray800" fontWeight="$bold">
                      {item.category}
                    </Heading>
                    <Text color="$coolGray800">{item.reward_type}</Text>
                  </VStack>
                  <Text>
                    Spend <Text color="$error500">{item.reward_condition}</Text>{' '}
                    Rs
                  </Text>
                  <Text>
                    Get{' '}
                    {item.type === 'discount'
                      ? `${item.reward_value} % OFF`
                      : `${item.reward_value} Cashback`}
                  </Text>
                </HStack>
              </Pressable>
            )}
            keyExtractor={item => item.id}
          />
          <Button
            onPress={() => navigation.navigate('Add Loyalty Program')}
            size="lg"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}>
            <ButtonText>Add </ButtonText>
            <ButtonIcon as={Plus} />
          </Button>
        </Box>
      );
    }
  };

  return <Box style={styles.container}>{FragmentedScreen()}</Box>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
});
