import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import Nweet from 'components/Nweet';

const Home = ({ userObj }) => {
	// console.log(userObj);
	const [nweet, setNweet] = useState('');
	const [nweets, setNweets] = useState([]);

	useEffect(() => {
		dbService.collection('nweets').onSnapshot((onSnapshot) => {
			const newArray = onSnapshot.docs.map((document) => ({
				id: document.id,
				...document.data(),
			}));
			setNweets(newArray);
		});
	}, []);

	const onSubmit = async (event) => {
		event.preventDefault();
		// 컬렉션 생성 후, add()로 해당 컬렉션에 문서 생성 및 값 저장
		await dbService.collection('nweets').add({
			text: nweet,
			createdAt: Date.now(),
			createdID: userObj.uid,
		});
		// nweet 상태를 다시 빈 문자열로 초기화
		setNweet('');
	};

	const onChange = (event) => {
		event.preventDefault();
		// event 안에 있는 target 안에 있는 value를 달라는 의미
		const {
			target: { value },
		} = event;
		setNweet(value);
	};

	// console.log(nweets);

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input
					value={nweet}
					onChange={onChange}
					type='text'
					placeholder="what's on your mind?"
					maxLength={120}
				/>
				<input type='submit' value='Nweet' />
			</form>
			{nweets.map((nweet) => (
				<Nweet
					key={nweet.id}
					nweetObj={nweet}
					isOwner={nweet.createdID === userObj.uid}
				/>
			))}
		</div>
	);
};

export default Home;
