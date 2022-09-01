import { dbService } from 'fbase';
import React, { useState } from 'react';

const Home = () => {
	const [nweet, setNweet] = useState('');

	const onSubmit = (event) => {
		event.preventDefault();
		// 컬렉션 생성 후, add()로 해당 컬렉션에 문서 생성 및 값 저장
		dbService
			.collection('nweets')
			.add({
				text: nweet,
				createdAt: Date.now(),
			})
			.then((docRef) => {
				console.log('Document written with ID', docRef.id);
			})
			.catch((error) => {
				console.error('Error adding document: ', error);
			});
		// nweet 상태를 다시 빈 문자열로 초기화
		setNweet('');
	};

	const onChange = (event) => {
		event.preventDefault();
		const {
			target: { value },
		} = event;
		setNweet(value);
	};

	return (
		<form onSubmit={onSubmit}>
			<input
				value={nweet}
				onChange={onChange}
				type='text'
				placeholder="what's on your mind?"
				maxLength={120}
			/>
			{/* <button type='submit'>Nweet</button> */}
			<input type='submit' value='Nweet' />
		</form>
	);
};

export default Home;
