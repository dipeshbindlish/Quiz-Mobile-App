import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView , View,TouchableOpacity , TextInput , StyleSheet , Text , Alert } from 'react-native';
import { ToastAndroid, Platform } from "react-native";

export default function SetQues({route}) {
	const quizId="quiz147852";
	const password="";
	const numOfQues=10;
	const timeSolve=14;
	const [AllQues,setAllQues]=React.useState([]);
	const [quesNo,setQuesNo]= React.useState(1);
	const [optionA,setOptionA]= React.useState('');
	const [optionB,setOptionB]= React.useState('');
	const [optionC,setOptionC]= React.useState('');
	const [optionD,setOptionD]= React.useState('');
	const [rightOpt,setRightOpt]= React.useState('');
	const [ques,setQues]=React.useState('');
  console.log(route.params);


  return (
    <SafeAreaView style={styles.container}>
      <Text>Se</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
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
