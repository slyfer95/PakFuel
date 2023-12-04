import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { CompleteProfileScreen } from 'src/screens/app/CompleteProfileScreen';
import { Employee } from 'src/screens/app/EmployeeScreens/Employee';
import { Manager } from 'src/screens/app/ManagerScreens/Manager';
import { Admin } from 'src/screens/app/AdminScreens/Admin';
import { useCurrentUser } from 'src/contexts/AuthProvider';
import { AuthorizedEmployee } from 'src/screens/app/ManagerScreens/AuthorizedEmployee';
import { AuthorizeNewEmployees } from 'src/screens/app/ManagerScreens/AuthorizeNewEmployees';
import { DeleteEmployee } from 'src/screens/app/ManagerScreens/DeleteEmployee';
import { UpdateProfile } from 'src/screens/app/UpdateProfile';
import { Scanner } from 'src/screens/app/EmployeeScreens/Scanner';

export type AppStackParamList = {
  Home: undefined;
};

// use this with the hook useNavigation like this:
// const navigation = useNavigation<AppNavProps<'Home'>>();
// to have access to the navigation prop
export type AppNavProps<T extends keyof AppStackParamList> =
  NativeStackNavigationProp<AppStackParamList, T>;

const Stack = createNativeStackNavigator<AppStackParamList>();

const completeProfileCheck = () => {
  const user = useCurrentUser();
  if (user) {
    if (user.cnic === '0') {
      return (
        <Stack.Screen
          name="CompleteProfile"
          component={CompleteProfileScreen}
        />
      );
    }
    if (user.role === 'manager') {
      return (
        <Stack.Screen
          name={'Manager'}
          component={Manager}
          options={{
            headerShown: false,
          }}
        />
      );
    } else if (user.role === 'admin') {
      return (
        <Stack.Screen
          name={'Admin'}
          component={Admin}
          options={{
            headerShown: false,
          }}
        />
      );
    } else {
      return (
        <Stack.Screen
          name={'Employee'}
          component={Employee}
          options={{
            headerShown: false,
          }}
        />
      );
    }
  }
};

export const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      {completeProfileCheck()}
      <Stack.Screen name="AuthorizedEmployee" component={AuthorizedEmployee} />
      <Stack.Screen
        name="AuthorizeNewEmployees"
        component={AuthorizeNewEmployees}
      />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
      <Stack.Screen name="Scanner" component={Scanner} />
      <Stack.Screen name="DeleteEmployee" component={DeleteEmployee} />
    </Stack.Navigator>
  );
};
