/*ec
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, View, TouchableOpacity, Modal, Button, Text, Dimensions, StatusBar,  } from 'react-native';
import { Icon, Overlay } from '@rneui/themed';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import { useDispatch } from 'react-redux'
import { clear } from '../features/transactions/transactionsSlice'

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const RStack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <RStack.Navigator>
      <RStack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <RStack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <RStack.Group screenOptions={{ presentation: 'modal' }}>
        <RStack.Screen name="Modal" component={ModalScreen} />
      </RStack.Group>
    </RStack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

export type Params = {
  Transaktionen: undefined;
};

const Stack = createNativeStackNavigator<Params>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const [settingsVisible, setSettingsVisible] = React.useState<boolean>(false)
  const dispatch = useDispatch()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Transaktionen"
        component={TabOneScreen}
        options={{
          headerRight: (props) => (
            <View>
              <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                <TouchableOpacity style={{ margin: 4 }}><Icon name='search' /></TouchableOpacity>
                <TouchableOpacity style={{ margin: 4 }}  onPress={() => setSettingsVisible(true)} ><Icon name='more-vert'/></TouchableOpacity>
              </View>
              <Overlay
                isVisible={settingsVisible}
                onBackdropPress={() => setSettingsVisible(false)}
                overlayStyle={{ position: 'absolute', top: 100, right: 5 }}
              >
                <Button title="clear" onPress={() => dispatch(clear())}></Button>
              </Overlay>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
