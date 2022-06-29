import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React,{useEffect} from 'react';
import { useNavigation} from '@react-navigation/core';
import { ToastAndroid, Platform } from "react-native";
import { getAuth } from 'firebase/auth';
import { auth } from '../firebase';
import MainPage from './MainPage';
import { signInWithEmailAndPassword } from 'firebase/auth';
export default function Login(props) {
	
useEffect(()=>{const unsubscribe= auth.onAuthStateChanged(user=>{
	if(user){
		navigation.replace('MainPage');
	}
}
	)
return unsubscribe},[])
	const [emailId, setEmailId]= React.useState('');
	const navigation= useNavigation();
	const [pswd, getPswd]= React.useState('');
  return (
	  
    <View style={styles.container}>
        <TextInput style={styles.inputCss} placeholder='Registered Mail Id'  value={emailId} onChangeText={setEmailId}/>
		<TextInput style={styles.inputCss} secureTextEntry={true} placeholder='Password' value={pswd} onChangeText={getPswd} />
		<TouchableOpacity style={styles.loginButtonCss} onPress={()=>{   
        	if(emailId=='')  
				if(Platform.OS!='android')
					Alert.alert( '','Enter Registered Email Id', [{ text: 'OK' },]);
				else
					ToastAndroid.show("Enter Registered Email Id", ToastAndroid.SHORT);
			else if(pswd=='')
				if(Platform.OS!='android')
					Alert.alert( '','Enter Password', [{ text: 'OK' },]);
				else
					ToastAndroid.show("Enter Password", ToastAndroid.SHORT);
			else{
				signInWithEmailAndPassword(auth,emailId,pswd).then((userCredential)=>{

					if(Platform.OS!='android')
						ToastAndroid.show("Loged in", ToastAndroid.SHORT);

				}).catch((error)=>{console.log(error.code)
				console.log(error.message)});
				}
				
		}}><Text style={styles.loginButtonMsg}>Login</Text></TouchableOpacity>
		
		<TouchableOpacity style={styles.buttonCss} onPress={  ()=>{   
			navigation.replace('SignUp');
			
			  }}>
			<Text style={styles.buttonMsg}>Register MMe</Text>
		</TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  inputCss:{
	paddingVertical:1,
	marginBottom:10,
	borderWidth:1,
	borderRadius:10,
	width:250,
	paddingLeft:10,
	alignContent:'center',
	justifyContent:'center',
  }
  ,
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonMsg:
  {
	  justifyContent:'space-around',
	  alignContent:'center',
	  paddingLeft:35,
	  paddingBottom:5
  }
  ,
  buttonCss:{
	paddingTop:4,
	borderWidth:1,
	width:150,
	backgroundColor:'red',
	borderRadius:10,
	justifyContent:'center',
	alignContent:'center'

  },
  loginButtonMsg:
  {
	  justifyContent:'center',
	  alignContent:'center',
	  paddingLeft:50,
	  paddingBottom:5
  }
  ,
  loginButtonCss:{
	  marginBottom:10,
	paddingTop:4,
	borderWidth:1,
	width:150,
	backgroundColor:'orange',
	borderRadius:10,
	justifyContent:'center',
	alignContent:'center'

  }
});