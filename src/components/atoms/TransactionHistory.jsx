import React from 'react';
import { StyleSheet } from 'react-native';
import { useCurrentUser } from 'src/contexts/AuthProvider';
import { supabase } from 'src/services/supabaseClient';
import {
  Box,
  Text,
  Spinner,
  FlatList,
  HStack,
  Divider,
} from '@gluestack-ui/themed';

export const TransactionHistory = () => {
  const [error, setError] = React.useState(undefined);
  const [loading, setLoading] = React.useState(false);
  const user = useCurrentUser();
  const [transactionList, setTransactionList] = React.useState(null);
  React.useEffect(() => {
    user.role === 'employee'
      ? getTransactionsForRefueler()
      : getTransactionsForManager();
  }, []);

  const getTransactionsForRefueler = async () => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('refueler_id', user.id);
    if (error) {
      setError(true);
    } else {
      setTransactionList(data);
    }
  };

  const getTransactionsForManager = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('firm', user.firm);
    if (error) {
      setLoading(false);
      setError(true);
    } else {
      setLoading(false);
      setTransactionList(data);
    }
  };
  const FragmentedScreen = () => {
    if (error) {
      return <Text>Database Error!</Text>;
    }
    if (loading) {
      return <Spinner mt="$5" size="large" />;
    }
    if (transactionList) {
      return (
        <FlatList
          data={transactionList}
          w="95%"
          renderItem={({ item }) => (
            <Box
              borderTopWidth="$1"
              borderBottomWidth="$1"
              w="100%"
              borderColor="$trueGray200"
              py="$2">
              <HStack space="md" justifyContent="space-between">
                <Text color="$coolGray800" p="$3">
                  {item.customer}
                </Text>
                <Text color="$coolGray800" p="$3">
                  {item.amount}
                </Text>
              </HStack>
            </Box>
          )}
          keyExtractor={item => item.id}
        />
      );
    }
  };

  return (
    <Box style={styles.container}>
      <HStack justifyContent="space-between" w="100%" px="$3">
        <Text color="$coolGray800" fontWeight="$bold">
          Customer
        </Text>
        <Text color="$coolGray800" fontWeight="$bold">
          Amount
        </Text>
      </HStack>
      {FragmentedScreen()}
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
});
