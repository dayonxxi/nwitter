import React, { useEffect } from 'react';
import { authService, dbService } from 'fbase';
import { useNavigate } from 'react-router-dom';

const Profile = ({ userObj }) => {
	const navigate = useNavigate();

	const onLogOutClick = () => {
		authService.signOut();
		navigate('/');
	};

	const getMyNweets = async () => {
		const nweets = await dbService
			.collection('nweets')
			.where('creatorId', '==', userObj.uid)
			.orderBy('createdAt', 'asc')
			.get(); // get함수는 쿼리 문을 통해 얻은 결과문을 가져옴

		console.log(nweets);
		console.log(nweets.docs.map((doc) => doc.data()));
	};

	// Profile 컴포넌트가 렌더링된 이후 useEffect의 첫번째 인자로 넘겨준 함수가 실행됨
	useEffect(() => {
		getMyNweets();
	});

	return (
		<>
			<button onClick={onLogOutClick}>Log Out</button>
		</>
	);
};

export default Profile;
