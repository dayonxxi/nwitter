import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { dbService, storageService } from 'fbase';
import Nweet from 'components/Nweet';

const Home = ({ userObj }) => {
	// console.log(userObj);
	const [nweet, setNweet] = useState('');
	const [nweets, setNweets] = useState([]);
	const [attachment, setAttachment] = useState('');
	const [file, setFile] = useState('');

	useEffect(() => {
		dbService
			.collection('nweets')
			// .orderBy('createdAt', 'desc')
			.onSnapshot((onSnapshot) => {
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
		/* await dbService.collection('nweets').add({
			text: nweet,
			createdAt: Date.now(),
			creatorId: userObj.uid,
		});
		// nweet 상태를 다시 빈 문자열로 초기화
		setNweet(''); */

		// 스토리지, 레퍼런스를 순서대로 호출한 다음
		// child함수에 사용자 아이디를 폴더 이름으로, 파일 이름을 uuid4로 처리함
		let attachmentUrl = '';
		if (attachment !== '') {
			const attachmentRef = storageService
				.ref()
				.child(`${userObj.uid}/${uuidv4()}`);
			const response = await attachmentRef.putString(attachment, 'data_url');
			// console.log(await response.ref.getDownloadURL());
			attachmentUrl = await response.ref.getDownloadURL();
			console.log(attachmentUrl);
		}

		await dbService.collection('nweets').add({
			text: nweet,
			createdAt: Date.now(),
			creatorId: userObj.uid,
			attachmentUrl,
		});
		setNweet('');
		setAttachment('');
		setFile('');
	};

	const onChange = (event) => {
		event.preventDefault();
		// event 안에 있는 target 안에 있는 value를 달라는 의미
		const {
			target: { value },
		} = event;
		setNweet(value);
	};

	const onFileChange = (event) => {
		// console.log(event.target.files);
		const {
			target: { files, value },
		} = event;
		const theFile = files[0];
		const reader = new FileReader();
		setFile(value);
		// onloadend는 파일이 함수로 들어간 이후 결괏값이 나온 다음 상황을 감지하는데,
		// 그때 생긴 이벤트값을 사용할 수 있게 해줌 (이벤트값에는 우리가 원하는 파일 URL이 있음)
		reader.onloadend = (finishedEvent) => {
			const {
				currentTarget: { result },
			} = finishedEvent;
			setAttachment(result);
		};
		// readAsDataURL 함수는 파일 정보를 인자로 받아서 파일 위치를 URL로 반환함
		reader.readAsDataURL(theFile);
	};

	const onClearAttachment = () => {
		setAttachment('');
		setFile('');
	};

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
				<input
					type='file'
					accept='image/*'
					onChange={onFileChange}
					value={file}
				/>
				<input type='submit' value='Nweet' />
				{attachment && (
					<div>
						<img src={attachment} alt='nweet_img' width='50px' height='50px' />
						<button onClick={onClearAttachment}>Clear</button>
					</div>
				)}
			</form>
			{nweets.map((nweet) => (
				<Nweet
					key={nweet.id}
					nweetObj={nweet}
					isOwner={nweet.creatorId === userObj.uid}
				/>
			))}
		</div>
	);
};

export default Home;
