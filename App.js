import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import QuizSubmit from './screens/QuizSubmit';
import First from './First';
import QuizSet from './screens/QuizSet';
import Second from './Second';
import Login from './screens/Login';
import SetQues from './screens/SetQues';
import MainPage from './screens/MainPage';
import SignUp from './screens/SignUp';
import QuizInfo from './screens/QuizInfo';
const Stack= createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="SignUp" component={SignUp}/>
      <Stack.Screen name='QuizSubmit' component={QuizSubmit}/>
      <Stack.Screen name="MainPage" component={MainPage} options={{headerShown:false}}/>
      <Stack.Screen name='QuizInfo'  component={QuizInfo}/>
      <Stack.Screen name='QuizSet' component={QuizSet}/>
      <Stack.Screen name='SetQues' component={SetQues} options={{headerShown:false}}/>
      <Stack.Screen name="First" component={First}/>
      <Stack.Screen name="second" component={Second}/>

    </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});