import  {initializeApp, getApps, getApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';
const firebaseConfig ={

  apiKey: "AIzaSyBTCul8bF8KL-K1SPQUCRDXq8gOuc7PL34",
  authDomain: "quiz-7f6c5.firebaseapp.com",
  databaseURL: "https://quiz-7f6c5-default-rtdb.firebaseio.com",
  projectId: "quiz-7f6c5",
  storageBucket: "quiz-7f6c5.appspot.com",
  messagingSenderId: "532636194804",
  appId: "1:532636194804:web:3289d6d2b553abf029cba1",
  measurementId: "G-8VN22X1NQR",
};


let app;
if(getApps().length===0)
{
  app=initializeApp(firebaseConfig);
}
else
{
	app=getApp();
}

const auth=getAuth();
export {auth};

