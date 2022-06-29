import { getDatabase, ref, set} from 'firebase/database';
import React from 'react';
import {useNavigation} from '@react-navigation/core';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,ToastAndroid, Platform, TouchableOpacity,TextInput , Alert} from 'react-native';
import RadioButtonGroup , {RadioButtonItem} from 'expo-radio-button';
import {auth} from '../firebase';
export default function QuizSet({route} ,props) {

	const navigation = useNavigation(); 
	const quizId=route.params.quizId;
	const numOfQues=route.params.numOfQues;
	const timeSolve=route.params.time;
	const [AllQues,setAllQues]=React.useState([]);
	const [quesNo,setQuesNo]= React.useState(1);
	const [optionA,setOptionA]= React.useState('');
	const [optionB,setOptionB]= React.useState('');
	const [optionC,setOptionC]= React.useState('');
	const [optionD,setOptionD]= React.useState('');
	const [rightOpt,setRightOpt]= React.useState('');
	const [ques,setQues]=React.useState('');
	console.log(numOfQues);
	if(quesNo>numOfQues)
	{
		set(ref(getDatabase(), 'QuizInfo/'+ quizId), {
			createdBy : auth.currentUser.uid,
			numOfQues : numOfQues,
			time : timeSolve,
			ques : AllQues
			}).then(()=>{
				//   back to first screen

			}).catch((error)=>{
				console.log(error.code);
				console.log(error.message);
				
			
			});
	}
	return (
	<View style={styles.container}>
			<Text style={styles.QuesNum}>Ques {quesNo}</Text>
			<TextInput style={styles.input} placeholder={'Question '} value={ques} onChangeText={setQues}></TextInput>
			<TextInput style={styles.input} placeholder='Option A' value={optionA} onChangeText={setOptionA}></TextInput>
			<TextInput  style={styles.input} placeholder='Option B' value={optionB} onChangeText={setOptionB}></TextInput>
			<TextInput style={styles.input} placeholder='Option C' value={optionC} onChangeText={setOptionC}></TextInput>
			<TextInput style={styles.input} placeholder='Option D' value={optionD} onChangeText={setOptionD}></TextInput>
			<Text>Right Option</Text>
			<RadioButtonGroup style={styles.radioButton} selected={rightOpt} onSelected={(value)=>{setRightOpt(value)}}  >
				<RadioButtonItem style={styles.radioItem} value="A" label={'A'}></RadioButtonItem>
				<RadioButtonItem style={styles.radioItem} value="B" label={'B'}></RadioButtonItem>
				<RadioButtonItem style={styles.radioItem} value="C" label={'C'}></RadioButtonItem>
				<RadioButtonItem style={styles.radioItem} value="D" label={'D'}></RadioButtonItem>
			</RadioButtonGroup>
			<TouchableOpacity style={styles.touchAble} onPress={()=>{
				if(quesNo>1)
				{
					setQues(AllQues[quesNo-2][0].ques);
					setOptionA(AllQues[quesNo-2][0].optionA);
					setOptionB(AllQues[quesNo-2][0].optionB);
					setOptionC(AllQues[quesNo-2][0].optionC);
					setOptionD(AllQues[quesNo-2][0].optionD);
					setRightOpt(AllQues[quesNo-2][0].rightOpt);
					setQuesNo(quesNo-1);

				}

			}} ><Text style={styles.nextButton}>Back</Text></TouchableOpacity>
			<TouchableOpacity style={styles.touchAble} onPress={()=>{
				if(ques=='')
				{
					if(Platform.OS!='android')
						Alert.alert( '','Enter Question', [{ text: 'OK' },]);
					else
						ToastAndroid.show("Enter Question", ToastAndroid.SHORT);
				} else if(optionA=='')
				{
					if(Platform.OS!='android')
						Alert.alert( '','Enter Option A', [{ text: 'OK' },]);
					else
						ToastAndroid.show("Enter Option A", ToastAndroid.SHORT);
				} else if(optionB=='')
				{
					if(Platform.OS!='android')
						Alert.alert( '','Enter Option B', [{ text: 'OK' },]);
					else
						ToastAndroid.show("Enter Option B", ToastAndroid.SHORT);
				} else if(optionC=='')
				{
					if(Platform.OS!='android')
						Alert.alert( '','Enter Option C', [{ text: 'OK' },]);
					else
						ToastAndroid.show("Enter Option C", ToastAndroid.SHORT);
				} else if(optionD=='')
				{
					if(Platform.OS!='android')
						Alert.alert( '','Enter Option D', [{ text: 'OK' },]);
					else
						ToastAndroid.show("Enter Option D", ToastAndroid.SHORT);
				} else if(rightOpt=='')
				{
					if(Platform.OS!='android')
						Alert.alert( '','Select Right Option', [{ text: 'OK' },]);
					else
						ToastAndroid.show("Select Right Option", ToastAndroid.SHORT);
				} else
				{
					if((AllQues.length+1)==quesNo)
					{
						setQuesNo(quesNo+1);
						var oneQues=[{ques: ques, optionA:optionA, optionB:optionB,optionC:optionC, optionD:optionD,rightOpt:rightOpt}];
						setAllQues([...AllQues,oneQues]);
						setOptionA('');
						setOptionB('');
						setOptionC('');
						setOptionD('');
						setQues('');
						setRightOpt('');
					}
					else {
						var oneQues=[{ques: ques, optionA:optionA, optionB:optionB,optionC:optionC, optionD:optionD,rightOpt:rightOpt}];
						AllQues[quesNo-1]=oneQues;
						if(AllQues.length==quesNo)
						{
							setOptionA('');
							setOptionB('');
							setOptionC('');
							setOptionD('');
							setQues('');
							setRightOpt('');
						}
						else{
							setQues(AllQues[quesNo][0].ques);
							setOptionA(AllQues[quesNo][0].optionA);
							setOptionB(AllQues[quesNo][0].optionB);
							setOptionC(AllQues[quesNo][0].optionC);
							setOptionD(AllQues[quesNo][0].optionD);
							setRightOpt(AllQues[quesNo][0].rightOpt);
						}
						setQuesNo(quesNo+1);
					}

					
				}
			}}><Text style={styles.nextButton}>Next</Text></TouchableOpacity>
			
	  <StatusBar style="auto" />
	</View>
  );
}

const styles = StyleSheet.create({
  container: {
		paddingLeft:20,
		paddingTop:20,
	flex: 1,
	backgroundColor: '#fff',
	alignItems: 'flex-start',
	justifyContent: 'flex-start',
  },
	radioButton:{
		backgroundColor:'red',
		paddingBottom:10,
		marginBottom:10
	},
	radioItem:{
		marginBottom:10
	},
	QuesNum:{
		paddingLeft:25,
		marginBottom:10
	},
	input:{
		borderWidth:0.5,
		borderRadius:10,
		paddingLeft:10,
		width:250,
		marginBottom:10
	},
	nextButton:
	{
		marginTop:10,
		width:100,
		borderWidth:.5,
		backgroundColor:'orange',
		paddingLeft:40
		
	},
	touchAble:{
		alignContent:'center',
		justifyContent:'center',
		paddingLeft:50
	}
});
