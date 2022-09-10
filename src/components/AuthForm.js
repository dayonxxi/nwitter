import React, { useState } from 'react';
import { authService } from 'fbase';

const AuthForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [newAccount, setNewAccount] = useState(true);
	const [error, setError] = useState('');

	const onChange = (event) => {
		// console.log(event.target.name);
		const {
			target: { name, value },
		} = event;

		if (name === 'email') {
			setEmail(value);
		} else if (name === 'password') {
			setPassword(value);
		}
	};

	const onSubmit = async (event) => {
		// onSubmit 함수에서 event의 기본값(새로고침+상태초기화)을 막는 역할
		event.preventDefault();

		try {
			let data;
			if (newAccount) {
				// create newAccount
				data = await authService.signWithEmailAndPassword(email, password);
			} else {
				//log in
				data = await authService.signInWithEmailAndPassword(email, password);
			}
			// console.log(data);
		} catch (error) {
			// console.log(error);
			setError(error.message);
		}
	};

	// 로그인 여부에 따라 로그인, 회원가입이 전환되도록 함
	const toggleAccount = () => setNewAccount((prev) => !prev);

	return (
		<>
			<form onSubmit={onSubmit}>
				<input
					name='email'
					type='email'
					placeholder='Email'
					required
					value={email}
					onChange={onChange}
				/>
				<input
					name='password'
					type='password'
					placeholder='Password'
					required
					value={password}
					onChange={onChange}
				/>
				<input type='submit' value={newAccount ? 'Create Account' : 'Log In'} />
				{error}
			</form>
			<span onClick={toggleAccount}>
				{newAccount ? 'Sign In' : 'Create Account'}
			</span>
		</>
	);
};

export default AuthForm;
