import { getDatabase, ref, onValue, set } from 'firebase/database';
import React from 'react';
import RadioButtonGroup, { RadioButtonItem } from 'expo-radio-button';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , TouchableOpacity } from 'react-native';
import {ThemeProvider} from '@react-navigation/native';
export default function QuizSubmit({route}) {
	let quessSet;
	let n;
		onValue(ref(getDatabase(), 'QuizInfo/'+route.params.quizId), (snapshot) => {
		n= snapshot.val().numOfQues;
		quessSet=snapshot.val().ques;
		});
//		console.log(quessSet[4][0].ques); 
		const [min, setMin]= React.useState(5);
	const [sec, setSec]= React.useState(0);
	
	
	
	
	var gg=function (){console.log('hkkhk')}
	gg();
	
	
	
	
	const check = function (){
		for (let index = 0; index < allRightOpt.length; index++) {
			if(allRightOpt[index]==quessSet[index][0].rightOpt)
				rightAns++;			
		}
		console.log(rightAns);


	}
	let rightAns=0;
	const [ques, setQues]=React.useState(quessSet[0][0].ques);
	const [optionA, setOptionA]=React.useState(quessSet[0][0].optionA);
	const [optionB, setOptionB]=React.useState(quessSet[0][0].optionB);
	const [optionC, setOptionC]=React.useState(quessSet[0][0].optionC);
	const [optionD, setOptionD]=React.useState(quessSet[0][0].optionD);
	const [allRightOpt, setAllRightOpt]= React.useState([]);
	const [quesNo, SetQuesNo]=React.useState(1);
	const [rightOpt , chaRightOpt]= React.useState('');
	const [buttonText,setButtonText]=React.useState('Next');
	if(allRightOpt.length==5)
	{
		check();
	}
	return (
		<View style={styles.container}>
			<Text style={styles.question}>{quesNo}:  {ques}</Text>
			<RadioButtonGroup selected={rightOpt} onSelected={chaRightOpt}>
				<RadioButtonItem label={optionA} value='A'></RadioButtonItem>
				<RadioButtonItem label={optionB} value='B'></RadioButtonItem>
				<RadioButtonItem label={optionC} value='C'></RadioButtonItem>
				<RadioButtonItem label={optionD} value='D'></RadioButtonItem>
			</RadioButtonGroup>  
					{/* previous button */}
		<TouchableOpacity style={styles.button} onPress={()=>{
			

			if(quesNo>1)
			{
				
				setButtonText('Next');
				setOptionA(quessSet[quesNo-2][0].optionA);
				setOptionB(quessSet[quesNo-2][0].optionB);
				setOptionC(quessSet[quesNo-2][0].optionC);
				setOptionD(quessSet[quesNo-2][0].optionD);
				setQues(quessSet[quesNo-2][0].ques);
				chaRightOpt(allRightOpt[quesNo-2]);
				SetQuesNo(quesNo-1);
			}		

		}}><Text >Previous</Text></TouchableOpacity>	

		{/* next button */}
		<TouchableOpacity style={styles.button} onPress={()=>{
			if(rightOpt!='')
			{
			if(allRightOpt.length==(quesNo-1)){
				chaRightOpt('');
				setAllRightOpt([... allRightOpt, rightOpt]);
				
			}
			else{	
				allRightOpt[quesNo-1]=rightOpt;
				chaRightOpt(allRightOpt[quesNo]);
			}
			if(quesNo<n){
				if(quesNo==(n-1))
					setButtonText('Finish');
				setOptionA(quessSet[quesNo][0].optionA);
				setOptionB(quessSet[quesNo][0].optionB);
				setOptionC(quessSet[quesNo][0].optionC);
				setOptionD(quessSet[quesNo][0].optionD);
				setQues(quessSet[quesNo][0].ques);
				SetQuesNo(quesNo+1);
			}
			}

		}}><Text>{buttonText}</Text></TouchableOpacity>	
		<Text>{min} : {sec}</Text>
		 <StatusBar style="auto" />

		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingLeft:10,
		paddingTop:15,
	},
	question:{
		padding:5,
		paddingBottom:15,
	}
	,button:
	{
		borderWidth:0.5,
		width:150,
		justifyContent:'center',
		alignContent:'center',
		paddingLeft:50,
		backgroundColor:'orange',
		marginTop:10
	},
	timer:{
		alignContent:'space-between',
		justifyContent:'flex-end',
		marginTop:50
	},
	view1:{
		flex:1
	}

});