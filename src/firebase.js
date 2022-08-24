import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDQELOKCL-k2U1zLOA92QdvmIc7_Auy1pY',
	authDomain: 'nwitter-6832e.firebaseapp.com',
	projectId: 'nwitter-6832e',
	storageBucket: 'nwitter-6832e.appspot.com',
	messagingSenderId: '1082889606422',
	appId: '1:1082889606422:web:df87d4891b9d586c0eec37',
};

export default firebase.initializeApp(firebaseConfig);
