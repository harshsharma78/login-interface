import React, {
	useState,
	useEffect,
	useReducer,
	useContext,
	useRef,
} from 'react';
import Card from '../UI/Card/Card';
import AuthContext from '../Store/auth-context';
import Input from '../UI/Input/Input';

import classes from './Login.module.css';
import Button from '../UI/Button/Button';

/* Reducer function is defined outside the component as it doesn't have anything to do with the component elements and the values are added automatically to it when the react executed it. */
const emailReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return { value: action.val, isValid: action.val.includes('@') };
	}
	if (action.type === 'INPUT_BLUR') {
		return {
			value: state.value /* checks previous snapshot */,
			isValid: state.value.includes('@'),
		};
	}
	return { value: '', isValid: false };
};
const passwordReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return { value: action.val, isValid: action.val.trim().length > 6 };
	}
	if (action.type === 'INPUT_BLUR') {
		return {
			value: state.value /* checks previous snapshot */,
			isValid: state.value.trim().length > 6,
		};
	}
	return { value: '', isValid: false };
};

// COMPONENTS
const Login = props => {
	// const [enteredEmail, setEnteredEmail] = useState('');
	// const [emailIsValid, setEmailIsValid] = useState();

	// const [enteredPassword, setEnteredPassword] = useState('');
	// const [passwordIsValid, setPasswordIsValid] = useState();

	const [formIsValid, setFormIsValid] = useState(false);

	/* 
  useReducer ---> It is like a useState BUT is used when there are related states like enteredEmail, emailIsValid or when one state depends on the other states or when there are multiple states to be handle 
  */
	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: '',
		// isValid: false,
		isValid: null,
	});

	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: '',
		// isValid: false,
		isValid: null,
	});

	////////////////////////////////////////////////////////////////////////////////
	// This is done to stop checking the validity and stop the unnecessary useEffect execution after the requirements for validity is met.
	const { isValid: emailIsValid } = emailState;
	const { isValid: passwordIsValid } = passwordState;

	const authCtx = useContext(AuthContext);

	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	useEffect(() => {
		const identifier = setTimeout(() => {
			// setFormIsValid(
			// 	enteredEmail.includes('@') && enteredPassword.trim().length > 6
			// );
			setFormIsValid(emailIsValid && passwordIsValid);
			return () => {
				clearTimeout(identifier);
			};
			/*
	   This is a cleanup function which will be executed after the first execution and before the next side-effect i.e. whenever there is change in input values (side-effect), etc. and this is used to restrict the continuous request like the validation of form happens at every keystroke and to limit it to a certain time-limit i.e. whenever there is a pause of 1s or 2s after the user has enetered the details then the validation of form happens and not at every keystroke as it increases traffic badly. Implements DEBOUNCING (forces a function to wait for a certain amount of time to run again)
	    */
		}, 500);
	}, [setFormIsValid, emailIsValid, passwordIsValid]);

	const emailChangeHandler = event => {
		// This is when we are using useReducer
		dispatchEmail({
			type: 'USER_INPUT',
			val: event.target.value,
		}); // Object here is an 'action' which we passed in the emailReducer
		// setFormIsValid(
		// 	event.target.value.includes('@') && passwordState.value.trim().length > 6
		// );

		// This is when we are using useState or useEffect
		// setEnteredEmail(event.target.value);

		// This is when we are using useState
		// setFormIsValid(
		// 	event.target.value.includes('@') && enteredPassword.trim().length > 6
		// );
	};

	const passwordChangeHandler = event => {
		dispatchPassword({
			type: 'USER_INPUT',
			val: event.target.value,
		});

		// setEnteredPassword(event.target.value);

		// setFormIsValid(
		// 	event.target.value.trim().length > 6 && enteredEmail.includes('@')
		// );

		// This is when we are using useReducer
		// setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
	};

	const validateEmailHandler = () => {
		dispatchEmail({
			type: 'INPUT_BLUR',
		});
		// setEmailIsValid(emailState.isValid);

		// setEmailIsValid(enteredEmail.includes('@'));
		/* Violation ---> as we are updating one state depending on the value of other state and react doesn't have any defined way of executing states and here may be the states value that we are passing is older and not updated.
     We are not using any reference to previous values here  */
	};

	const validatePasswordHandler = () => {
		dispatchPassword({
			type: 'INPUT_BLUR',
		});
		// setPasswordIsValid(enteredPassword.trim().length > 6);
	};

	const submitHandler = event => {
		event.preventDefault();
		// props.onLogin(enteredEmail, enteredPassword);
		// props.onLogin(emailState.value, passwordState.value);
		if (formIsValid) {
			authCtx.onLogin(emailState.value, passwordState.value);
		} else if (!emailIsValid) {
			emailInputRef.current.focus();
		} else {
			passwordInputRef.current.focus();
		}
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<Input
					ref={emailInputRef}
					id='email'
					label='E-mail'
					type='email'
					isValid={emailIsValid}
					value={emailState.value}
					onChange={emailChangeHandler}
					onBlur={validateEmailHandler}
				/>
				<Input
					ref={passwordInputRef}
					id='password'
					label='Password'
					type='password'
					isValid={passwordIsValid}
					value={passwordState.value}
					onChange={passwordChangeHandler}
					onBlur={validatePasswordHandler}
				/>
				{/* <div
					className={`${classes.control} ${
						// emailIsValid === false
						emailState.isValid === false ? classes.invalid : ''
					}`}
				>
					<label htmlFor='email'>E-Mail</label>
					<input
						type='email'
						id='email'
						// value={enteredEmail}

						// This is when we are using useReducer
						value={emailState.value}
						onChange={emailChangeHandler}
						onBlur={validateEmailHandler}
					/>
				</div> */}

				{/* <div
					className={`${classes.control} ${
						// passwordIsValid === false 
						passwordState.isValid === false ? classes.invalid : ''
					}`}
				>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						// value={enteredPassword}
						value={passwordState.value}
						onChange={passwordChangeHandler}
						onBlur={validatePasswordHandler}
					/>
				</div> */}
				<div className={classes.actions}>
					<Button
						type='submit'
						className={classes.btn}
						// disabled={!formIsValid}
					>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;
