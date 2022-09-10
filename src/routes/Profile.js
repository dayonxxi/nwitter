import React, { useState } from 'react';
import { authService } from 'fbase';
import { useNavigate } from 'react-router-dom';

const Profile = ({ userObj, refreshUser }) => {
	const navigate = useNavigate();
	const [newDisplayName, setNewDisplayName] = useState(userObj.newDisplayName);

	const onLogOutClick = () => {
		authService.signOut();
		navigate('/');
	};

	const onChange = (event) => {
		const {
			target: { value },
		} = event;
		setNewDisplayName(value);
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		if (userObj.displayName !== newDisplayName) {
			await userObj.updateProfile({ displayName: newDisplayName });
			refreshUser();
		}
	};

	/* 내가 쓴 nweets만 보이도록 filtering하는 코드
	const getMyNweets = async () => {
		const nweets = await dbService
			.collection('nweets')
			.where('creatorId', '==', userObj.uid)
			.orderBy('createdAt', 'asc')
			.get(); // get함수는 쿼리 문을 통해 얻은 결과문을 가져옴

		// console.log(nweets.docs.map((doc) => doc.data()));
	};

	// Profile 컴포넌트가 렌더링된 이후 useEffect의 첫번째 인자로 넘겨준 함수가 실행됨
	useEffect(() => {
		getMyNweets();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userObj]);
*/

	return (
		<>
			<form onSubmit={onSubmit}>
				<input
					onChange={onChange}
					type='text'
					placeholder='display name'
					value={newDisplayName}
				/>
				<input type='submit' placeholder='Update Profile' />
			</form>
			<button onClick={onLogOutClick}>Log Out</button>
		</>
	);
};

export default Profile;
