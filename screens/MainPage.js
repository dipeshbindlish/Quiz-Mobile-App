import React from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { useNavigation} from '@react-navigation/core';
import { Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {ToastAndroid,Platform , Image, SafeAreaView, StyleSheet, Text, View , TouchableOpacity , TextInput } from 'react-native';
import { auth } from '../firebase';
export default function MainPage(props) {
   const [quizId, EnterQuizId]=React.useState('2018quiz');
  const navigation= useNavigation();
  //console.log(auth.currentUser.uid);
  return (
    <SafeAreaView style={styles.wholeView}>
    <View>
    
      <TextInput style={styles.search} placeholder='Enter QuizId' value={quizId} onChangeText={EnterQuizId} ></TextInput>
      <TouchableOpacity onPress={()=>{
        console.log(quizId);
        if(quizId!='')
        {
          var check=-1;
         onValue(ref(getDatabase(), 'QuizInfo/'+quizId), (snapshot) => {
          if(snapshot.val()==null)
            check=1; 
          else 
          check=0;
          });
          console.log(check);
          if(check==0)
            props.navigation.push('QuizSubmit',{quizId:quizId});     
          else 
          {
            EnterQuizId('');
            if(Platform.OS!='android')
              Alert.alert( '','Wrong Quiz Id', [{ text: 'OK' },]);
            else
              ToastAndroid.show("Wrong Quiz Id", ToastAndroid.SHORT);
          } 
        }




      }}><Text>Search</Text></TouchableOpacity>
    </View>
        
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>{
        props.navigation.navigate('QuizInfo');
      }} ><Text>Create Quiz</Text></TouchableOpacity>
      <TouchableOpacity onPress={()=>{
        
    //  console.log(auth.currentUser?.email)
      auth.signOut().then(()=>{ navigation.replace('Login') }).catch((error)=>{
        console.log(error.code)
				console.log(error.message)});
      
      }}><Text>Sign Out</Text></TouchableOpacity>
    </View>
    <StatusBar style='auto' />

    </SafeAreaView>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  search:
  {
    paddingLeft:5,
    borderWidth:.5,
    width: Dimensions.get('window').width-50,
    borderRadius:1,
    borderTopLeftRadius:10,
    borderBottomLeftRadius:10,
    },
    wholeView:{
    flex:1,
    paddingTop:40

  }
});