import React, {useEffect} from 'react';
import { createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import { useNavigation} from '@react-navigation/core';
import { getApps, app ,getApp} from 'firebase/app';
import { ToastAndroid, Platform } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { getDatabase, ref, set, onValue} from 'firebase/database';
import { auth } from '../firebase';

import { Text, View, StyleSheet , SafeAreaView , TextInput, TouchableOpacity , Alert } from 'react-native';
export default function SignUp() {


    const [name, getName]=React.useState('');
		const [code, setCode] = React.useState('');
    const [pswd, getPswd]=React.useState('');
		const navigation= useNavigation();  
    const [repswd, getRePswd]=React.useState('');
    const [mailId, setMailId] = React.useState('');
     return (

  <View style={styles.container}>

    {/* All Inputs  */}
    <TextInput style={styles.inputCss} placeholder='Name' value={name} onChangeText={getName}></TextInput>
    <TextInput style={styles.inputCss} placeholder='Mail Id'  value={mailId} onChangeText={setMailId}></TextInput>
    <TextInput style={styles.inputCss} placeholder='Password' val ue={pswd} onChangeText={getPswd}></TextInput>
    <TextInput style={styles.inputCss} placeholder='Enter Password again' value={repswd} onChangeText={getRePswd}></TextInput>
		<TextInput  style={styles.inputCss} value={code} onChangeText={setCode}></TextInput>
		
    {/* Register Button   */}
    <TouchableOpacity style={styles.buttonCss} onPress={()=>{
      if(name=='')  
        if(Platform.OS!='android')
          Alert.alert( '','Enter Name', [{ text: 'OK' },]);
        else
          ToastAndroid.show("Enter Name", ToastAndroid.SHORT);
      else if(pswd=='')
        if(Platform.OS!='android')
          Alert.alert( '','Enter Password', [{ text: 'OK' },]);
        else
          ToastAndroid.show("Enter Password", ToastAndroid.SHORT);
      else if(repswd=='')
        if(Platform.OS!='android')
          Alert.alert( '','Enter Password Again', [{ text: 'OK' },]);
        else
          ToastAndroid.show("Enter Password Again", ToastAndroid.SHORT);
      else if(pswd!=repswd){
        if(Platform.OS!='android')
          Alert.alert( '','Password does not match', [{ text: 'OK' },]);
        else
          ToastAndroid.show("password does not match", ToastAndroid.SHORT);
          getRePswd('');
      }
      else if(mailId=='')
      {
        if(Platform.OS!='android')
          Alert.alert( '','Enter a email-id', [{ text: 'OK' },]);
        else
          ToastAndroid.show("Enter a email-id", ToastAndroid.SHORT);
      }
      else if(pswd.length<6)
      {
        if(Platform.OS!='android')
          Alert.alert( '','Passsword must be of length 6', [{ text: 'OK' },]);
        else
          ToastAndroid.show("Passsword must be of length 6", ToastAndroid.SHORT);
      }
      else
      {  
        createUserWithEmailAndPassword(auth, mailId, pswd)
        .then((userCredential)=>{

          set(ref(getDatabase(), 'userDetails/'+ userCredential.user.uid), {
            name: name,
            password:pswd
            
            });

          if(Platform.OS=='android')
              ToastAndroid.show("Account Created", ToastAndroid.SHORT);
           navigation.replace('MainPage');
        
        })
        .catch((error)=>{
          if(error.code=='auth/email-already-in-use')
          {
            if(Platform.OS!='android')
              Alert.alert( '','Entered mail id is allready in use', [{ text: 'OK' },]);
            else
              ToastAndroid.show("Entered mail id is allready in use", ToastAndroid.SHORT);
          }
          if(error.code=='auth/invalid-email')
          {
            if(Platform.OS!='android')
              Alert.alert( '','Wrong mail', [{ text: 'OK' },]);
            else
              ToastAndroid.show("Wrong mail id", ToastAndroid.SHORT);
          }
        })
      	
        console.log('registered');
      }
    }}><Text style={styles.buttonMsg}> Register Me</Text></TouchableOpacity>
    {/* Register Button Finish  */}
    
    {/* Login Button  */}
    <TouchableOpacity style={styles.buttonCss} onPress={()=>{
			navigation.replace('Login');
		}}><Text style={styles.buttonMsg}>Login</Text></TouchableOpacity>
    
    
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
      inputCss:{
          marginBottom:10,
          borderWidth:0.5,
          borderRadius:10,
          width:250,
          paddingLeft:5
          
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
			marginTop:10,
      paddingTop:4,
      borderWidth:1,
      width:150,
      backgroundColor:'orange',
      borderRadius:10,
      justifyContent:'center',
      alignContent:'center'
  
    }
  });