import React, { useState } from 'react';
import { dbService } from 'fbase';

const Nweet = ({ nweetObj, isOwner }) => {
	// <수정> 버튼을 클릭했을 때, 입력란과 버튼이 나타나는 기준점
	const [editing, setEditing] = useState(false);
	// 입력란과 버튼이 나타날 때, 입력란에 기존 트윗이 보이도록 초깃값을 관리하기 위한 상태
	const [newNweet, setNewNweet] = useState(nweetObj.text);

	const onDeleteClick = async () => {
		const ok = window.confirm('삭제하시겠습니까?');
		console.log(ok);

		if (ok) {
			console.log(nweetObj.id);
			// 해당 id의 문서를 얻어와서 data에 담음
			const data = await dbService.doc(`nweets/${nweetObj.id}`).delete();
			console.log(data);
		}
	};

	const toggleEditing = () => setEditing((prev) => !prev);

	const onChange = (event) => {
		const {
			target: { value },
		} = event;
		setNewNweet(value);
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		// console.log(nweetObj.id, newNweet);
		await dbService.doc(`nweets/${nweetObj.id}`).update({ test: newNweet });
		setEditing(false);
	};

	return (
		<div>
			{editing ? (
				<>
					<form onSubmit={onSubmit}>
						<input onChange={onChange} value={newNweet} required />
						<input type='submit' value='Update Nweet' />
					</form>
					<button onClick={toggleEditing}>Cancel</button>
				</>
			) : (
				<>
					<h4>{nweetObj.text}</h4>
					{isOwner && (
						<>
							<button onClick={onDeleteClick}>Delete Nweet</button>
							<button onClick={toggleEditing}>Edit Nweet</button>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default Nweet;
