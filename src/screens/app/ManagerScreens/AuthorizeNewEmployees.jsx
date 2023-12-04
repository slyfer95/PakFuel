import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { supabase } from 'src/services/supabaseClient';
import {
  Box,
  Text,
  Spinner,
  FlatList,
  HStack,
  Switch,
} from '@gluestack-ui/themed';

export const AuthorizeNewEmployees = () => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [authorizeEmployeeList, setAuthorizeEmployeeList] =
    React.useState(null);
  React.useEffect(() => {
    getAuthorizeEmployees();
  }, []);

  const getAuthorizeEmployees = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('authorized', 'false');
    if (error) {
      setLoading(false);
      setError(true);
    } else {
      setLoading(false);
      setAuthorizeEmployeeList(data);
    }
  };
  const FragmentedScreen = () => {
    if (error) {
      return <Text>Database Error!</Text>;
    }
    if (loading) {
      return <Spinner mt="$5" size="large" />;
    }
    if (authorizeEmployeeList) {
      return (
        <FlatList
          data={authorizeEmployeeList}
          w="95%"
          renderItem={({ item }) => (
            <Box
              borderBottomWidth="$1"
              w="100%"
              borderColor="$trueGray800"
              py="$2">
              <HStack space="md" justifyContent="space-between">
                <Text color="$coolGray800" fontWeight="$bold" p="$5">
                  {item.first_name}
                </Text>
                <Switch size="md" isDisabled={false} />
              </HStack>
            </Box>
          )}
          keyExtractor={item => item.id}
        />
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
