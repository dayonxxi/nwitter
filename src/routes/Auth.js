import React, { useState } from 'react';

const Auth = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [newAccount, setNewAccount] = useState(true);

	const onChange = (event) => {
		// console.log(event.target.name);
		const {
			target: { name, value },
		} = event;

		if (name == 'email') {
			setEmail(value);
		} else if (name == 'password') {
			setPassword(value);
		}
	};

	const onSubmit = (event) => {
		event.preventDefault(); // onSubmit 함수에서 event의 기본값(새로고침+상태초기화)을 막는 역할

		if (newAccount) {
			// create newAccount
		} else {
			//log in
		}
	};

	return (
		<div>
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
			</form>
			<div>
				<button>Continue with Google</button>
				<button>Continue with Github</button>
			</div>
		</div>
	);
};

export default Auth;
