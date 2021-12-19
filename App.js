import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login.js';
import SignUp from './screens/SignUp.js';
import Dashboard from './screens/Dashboard.js';
import BranchManager from './screens/BranchManager.js';
import Form from './screens/Form.js';
import Scanner from './screens/Scanner.js';
import LoginBM from './screens/LoginBM'
import QrCode from './screens/QrCode.js';


const Stack = createNativeStackNavigator();

// function Register ({ navigation }) {
//       const [isSignedIn, setIsSignedIn] = useState(false)
//       const [email, setEmail] = useState('');
//       const [password, setPassword] = useState('')
      
//       const RegisterUser =() => {
//         createUserWithEmailAndPassword(auth, email, password)
//         .then((re)=>
//         {
//           console.log(re)
//         })
//         .catch(error => alert(error.message))
//       }
//             return (
//             <View style={styles.container}>
//                 <TextInput placeholder='Email' value={email} onChangeText={text=>{setEmail(text)}}/>
//                 <TextInput placeholder='password ' value={password} secureTextEntry={true} onChangeText={text=>{setPassword(text)}}/>
//                 <Button title="Register" onPress={RegisterUser}/>

//                 <Text>Already have an account?</Text>
//                 <Text style={{ color: "blue"}} onPress={() => navigation.navigate('Login')}>LOG IN</Text>
//             </View>
//       );
// }

// function Login( {navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>LOG IN</Text>
//       <Text>Don't have an account?</Text>
//       <Button title="Register" onPress={() => navigation.navigate('Register')}/>

//     </View>
//   );
// }

export default function App() {

  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="BranchManager" component={BranchManager} />
      <Stack.Screen name="Form" component={Form} />
      <Stack.Screen name="Scanner" component={Scanner} />
      <Stack.Screen name="LoginBM" component={LoginBM} />
      <Stack.Screen name="QrCode" component={QrCode} />
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
