import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
};

firebase.initializeApp(firebaseConfig);
// 소셜로그인에 필요한 provider가 들어있는 firebase를 firebaseInstance라는 이름으로 export함
export const firebaseInstance = firebase;
export const authService = firebase.auth();
// Initialize Cloud Firestore and get a reference to the service
export const dbService = firebase.firestore();
// 사진, 동영상 같은 파일을 저장하기 위해 파이어베이스 스토리지
// 스토리지는 파이어스토어와 달리 문서에 아이디를 자동으로 만들어주지 않기 때문에
// 고유 십결자를 만들어서 스토리지에 저장할 데이터에 짝을 지어줘야 함 => uuid 라이브러리 사용하기
export const storageService = firebase.storage();
