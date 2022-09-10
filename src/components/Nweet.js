import React, { useState } from 'react';
import { dbService, storageService } from 'fbase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const Nweet = ({ nweetObj, isOwner }) => {
	// <수정> 버튼을 클릭했을 때, 입력란과 버튼이 나타나는 기준점
	const [editing, setEditing] = useState(false);
	// 입력란과 버튼이 나타날 때, 입력란에 기존 트윗이 보이도록 초깃값을 관리하기 위한 상태
	const [newNweet, setNewNweet] = useState(nweetObj.text);

	const onDeleteClick = async () => {
		const ok = window.confirm('삭제하시겠습니까?');
		// console.log(ok);

		if (ok) {
			// console.log(nweetObj.id);
			// 해당 id의 문서를 얻어와서 data에 담음
			await dbService.doc(`nweets/${nweetObj.id}`).delete();
			if (nweetObj.attachmentUrl !== '')
				await storageService.refFromURL(nweetObj.attachmentUrl).delete();
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
		await dbService.doc(`nweets/${nweetObj.id}`).update({ text: newNweet });
		setEditing(false);
	};

	return (
		<div className='nweet'>
			{editing ? (
				<>
					<form onSubmit={onSubmit} className='container nweetEdit'>
						<input
							onChange={onChange}
							value={newNweet}
							required
							placeholder='Edit your nweet'
							autoFocus
							className='formInput'
						/>
						<input type='submit' value='Update Nweet' className='formBtn' />
					</form>
					<button onClick={toggleEditing} className='formBtn cancelBtn'>
						Cancel
					</button>
				</>
			) : (
				<>
					<h4>{nweetObj.text}</h4>
					{nweetObj.attachmentUrl && (
						<img
							src={nweetObj.attachmentUrl}
							width='50px'
							height='50px'
							alt='attachment'
						/>
					)}
					{isOwner && (
						<div className='nweet__actions'>
							<span onClick={onDeleteClick}>
								<FontAwesomeIcon icon={faTrash} />
							</span>
							<span onClick={toggleEditing}>
								<FontAwesomeIcon icon={faPencilAlt} />
							</span>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default Nweet;
