import React from 'react';
import { useAuth, useCurrentUser } from 'src/contexts/AuthProvider';

import { Box, Button, ButtonText } from '@gluestack-ui/themed';

export const SettingsPage = ({ isActive }) => {
  const { logout } = useAuth();
  const user = useCurrentUser();
  return (
    <Box
      style={{
        display: isActive ? 'flex' : 'none',
        alignItems: 'center',
        width: '100%',
        flex: 1,
      }}>
      <Button
        size="md"
        w="$72"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
        onPress={logout}>
        <ButtonText>Logout</ButtonText>
      </Button>
    </Box>
  );
};
