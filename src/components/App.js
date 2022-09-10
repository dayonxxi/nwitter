import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase';

function App() {
	const [init, setInit] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userObj, setUserObj] = useState(null);

	useEffect(() => {
		authService.onAuthStateChanged((user) => {
			// authService.currentUser 함수는 처음에 null을 반환하므로 user에 값이 있는지 확인하여 불확실성 제거.
			if (user) {
				setUserObj({
					uid: user.uid,
					displayName: user.displayName,
					updateProfile: (args) => user.updateProfile(args),
				});
			} else {
				setIsLoggedIn(false);
			}
			setInit(true);
		});
	}, []); // 2번째 인자에 []을 넣은 이유는 컴포넌트가 최초로 렌더링이 완료되었을 때, 1회만 동작하도록 하기 위함.

	const refreshUser = () => {
		setUserObj(authService.currentUser);
	};

	return (
		<>
			{init ? (
				<AppRouter
					refreshUser={refreshUser}
					isLoggedIn={Boolean(userObj)}
					userObj={userObj}
				/>
			) : (
				'initializing...'
			)}
		</>
	);
}

export default App;
