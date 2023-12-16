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
import { EmployeeManagementList } from 'src/screens/app/ManagerScreens/EmployeeManagementList';
import { EmployeeManagement } from 'src/screens/app/ManagerScreens/EmployeeManagement';
import { UpdateProfile } from 'src/screens/app/UpdateProfile';
import { Scanner } from 'src/screens/app/EmployeeScreens/Scanner';
import { TransactionHistory } from 'src/components/atoms/TransactionHistory';
import { LoyaltyProgramsList } from 'src/screens/app/ManagerScreens/LoyaltyProgramsList';
import { LoyaltyManagement } from 'src/screens/app/ManagerScreens/LoyaltyManagement';
import { AddProgram } from 'src/screens/app/ManagerScreens/AddProgram';

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
      <Stack.Screen name="Employee List" component={EmployeeManagementList} />
      <Stack.Screen name="Employee Management" component={EmployeeManagement} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
      <Stack.Screen name="Scanner" component={Scanner} />
      <Stack.Screen name="Transaction History" component={TransactionHistory} />
      <Stack.Screen name="Loyalty Programs" component={LoyaltyProgramsList} />
      <Stack.Screen name="Loyalty Program" component={LoyaltyManagement} />
      <Stack.Screen name="Add Loyalty Program" component={AddProgram} />
    </Stack.Navigator>
  );
};
