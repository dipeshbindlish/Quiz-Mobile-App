import { getDatabase, ref, onValue, set } from 'firebase/database';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity,TextInput,StyleSheet, Text, View,Alert, SafeAreaView,ToastAndroid,Platform } from 'react-native';
export default function QuizInfo(props) {
  

  const [quizId,setQuizId]= React.useState('');
	const [numOfQues, setNumOfQues]=React.useState('');
	const [time, setTime]=React.useState('');
  return (
	<View style={styles.container}>
	  <TextInput style={styles.inputCss} placeholder='Enter QuizID or Use default' value={quizId} onChangeText={setQuizId}></TextInput>
	  <TextInput style={styles.inputCss} placeholder='Num of Ques' value={numOfQues} onChangeText={setNumOfQues} keyboardType='numeric'></TextInput>
	  <TextInput style={styles.inputCss} placeholder='Num of mins to solve Quiz' value={time} onChangeText={setTime} keyboardType='numeric'></TextInput>
	  <TouchableOpacity style={styles.buttonBack} onPress={()=>{
      if(numOfQues=='')
      {
        if(Platform.OS!='android')
          Alert.alert( '','Enter Num Of Qustions', [{ text: 'OK' },]);
        else
          ToastAndroid.show("Enter Num Of Qustions", ToastAndroid.SHORT);
      }
      else if(numOfQues!=(parseInt(numOfQues)))
      {
        if(Platform.OS!='android')
          Alert.alert( '','Enter Right value for Num Of Qustions', [{ text: 'OK' },]);
        else
          ToastAndroid.show("Enter Right value for Num Of Qustions", ToastAndroid.SHORT);
      }
      else if(quizId=='')
      {
        console.log('jljljlk');
        var idd;
        //while(true){
              console.log('whle');
             idd='quiz'+Math.floor(Math.random() * 1000000);
              setQuizId(idd);
              var check=0;
              onValue(ref(getDatabase(), 'QuizInfo/'+quizId), (snapshot) => {
              if(snapshot.val()==undefined)
              {
                check=1; 
              }
          });
            //if(check==1)
            //  break
          //}
        Alert.alert( '','Set '+idd+' as QuizId', [
          { text: 'OK', onPress:()=>{
            
            } 
          },
          {text:'No', onPress:()=>{ToastAndroid.show('Enter Valid ID',ToastAndroid.SHORT)} }]);
      }
      else if(time=='')
      {
        if(Platform.OS!='android')
          Alert.alert( '','Enter Time Limit', [{ text: 'OK' },]);
        else
          ToastAndroid.show("Enter Time limit", ToastAndroid.SHORT);
      }
      else if(time!=parseInt(time))
      {
        if(Platform.OS!='android')
          Alert.alert( '','Time cannot contain any symbol or character', [{ text: 'OK' },]);
        else
          ToastAndroid.show("Time cannot contain any symbol or character", ToastAndroid.SHORT);
      }
      else if(quizId.length<7)
      {
        if(Platform.OS!='android')
          Alert.alert( '','QuizId Should be of minimum 7 length', [{ text: 'OK' },]);
        else
          ToastAndroid.show("QuizId Should be of minimum 7 length", ToastAndroid.SHORT);
      }
      else 
      {
        var check=0;
        onValue(ref(getDatabase(), 'QuizInfo/'+quizId), (snapshot) => {
        if(snapshot.val()==null)
          check=1; 
        });
        if(check==1)
        props.navigation.push('QuizSet',{quizId:quizId, numOfQues:numOfQues, time:time});     
        else if(Platform.OS!='android')
          Alert.alert( '','QuizId Allready in use', [{ text: 'OK' },]);
        else
          ToastAndroid.show("Set uniques quizId", ToastAndroid.SHORT);
     
      }

		}}><Text style={styles.buttonText}>Next</Text></TouchableOpacity>

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
		width:250,
		paddingLeft:10,
		borderRadius:10
	}, 
	buttonText:{
		paddingLeft:20,
		fontSize:18,
	}
	,
	buttonBack:{
		backgroundColor:'orange',
		marginTop:20,
		width:90,
		borderWidth:.5,
		borderRadius:5
	}
});
