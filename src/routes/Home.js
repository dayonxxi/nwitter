import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';

const Home = () => {
	const [nweet, setNweet] = useState('');
	const [nweets, setNweets] = useState([]);

	const getNweets = async () => {
		const dbNweets = await dbService.collection('nweets').get();
		// document에 있는 각각의 모든 dbNweets에 대해 setNweets()를 실행함
		dbNweets.forEach((document) => {
			const nweetObject = {
				...document.data(),
				id: document.id,
			};
			// set이 붙는 함수를 쓸 때, 값 대신 함수를 전달할 수 있음
			// 그리고, 함수를 전달할 때, React는 이전 값에 접근하게 해줌
			// 첫번째 요소는 가장 최근 document의 data이고, 그 뒤로 이전 document를 붙인 배열을 return함
			setNweets((prev) => [nweetObject, ...prev]);
		});
	};
	useEffect(() => {
		getNweets();
	}, []);

	const onSubmit = async (event) => {
		event.preventDefault();
		// 컬렉션 생성 후, add()로 해당 컬렉션에 문서 생성 및 값 저장
		await dbService.collection('nweets').add({
			text: nweet,
			createdAt: Date.now(),
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

	console.log(nweets);

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
			<div>
				{nweets.map((nweet) => (
					<div key={nweet.id}>
						<h4>{nweet.text}</h4>
					</div>
				))}
			</div>
		</form>
	);
};

export default Home;
