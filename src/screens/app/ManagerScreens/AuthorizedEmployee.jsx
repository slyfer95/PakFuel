import React from 'react';
import { useCurrentUser } from 'src/contexts/AuthProvider';
import { StyleSheet } from 'react-native';
import { supabase } from 'src/services/supabaseClient';
import { Box, Text, Spinner } from '@gluestack-ui/themed';
import { FlatListAuthorized } from 'src/components/atoms/FlatListAuthorized';

export const AuthorizedEmployee = () => {
  const user = useCurrentUser();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [authorizedEmployeeList, setAuthorizedEmployeeList] =
    React.useState(null);
  React.useEffect(() => {
    getAuthorizedEmployees();
  }, []);

  const getAuthorizedEmployees = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('authorized', 'true')
      .eq('firm', user.firm);
    if (error) {
      setLoading(false);
      setError(true);
    } else {
      setLoading(false);
      setAuthorizedEmployeeList(data);
    }
  };
  const FragmentedScreen = () => {
    if (error) {
      return <Text>Database Error!</Text>;
    }
    if (loading) {
      return <Spinner mt="$5" size="large" />;
    }
    if (authorizedEmployeeList) {
      return <FlatListAuthorized data={authorizedEmployeeList} />;
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
