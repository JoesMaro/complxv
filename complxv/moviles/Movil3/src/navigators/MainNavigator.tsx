import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import { LoginScreen } from '../screens/Login';
import { RegistroScreen } from '../screens/Registro';
import { HomeScreen } from '../screens/Home';

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator initialRouteName='Login' >
            <Stack.Screen name="Iniciar Sesion" component={LoginScreen} />
            <Stack.Screen name='Registro' component={RegistroScreen} />
            <Stack.Screen name='Home' component={HomeScreen} />            
        </Stack.Navigator>
    )
}


export const MainNavigator = () => {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}
