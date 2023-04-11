import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

interface LoginState {
	password: string;
	email: string;
	isLoading: boolean;
	error: string;
	isLoggedIn: boolean;
}

type LoginAction =
	| { type: 'login' | 'success' | 'error' | 'logout' }
	| { type: 'field'; fieldName: string; payload: string };

const loginReducer = (state: LoginState, action: LoginAction): LoginState => {
	switch (action.type) {
		case 'field': {
			return {
				...state,
				[action.fieldName]: action.payload,
			};
		}
		case 'login': {
			return {
				...state,
				error: '',
				isLoading: true,
			};
		}
		case 'success': {
			return { ...state, error: '', isLoading: false, isLoggedIn: true };
		}
		case 'error': {
			return {
				...state,
				isLoading: false,
				isLoggedIn: false,
				email: '',
				password: '',
				error: 'Incorrect email or password!',
			};
		}
		case 'logout': {
			return {
				...state,
				isLoggedIn: false,
			};
		}
		default:
			return state;
	}
};

type Page = 'Signin' | 'Signup' | 'History';

interface SigninPropsType {
	onSetCurrentPage: (input: Page) => void;
}

const initialState: LoginState = {
	password: '',
	email: '',
	isLoading: false,
	error: '',
	isLoggedIn: false,
};

const Signin: React.FC<SigninPropsType> = ({
	onSetCurrentPage,
}: SigninPropsType) => {
	const [state, dispatch] = React.useReducer(loginReducer, initialState);
	const { email, password, isLoading, error } = state;

	const { handleSignIn }: any = useContext(AuthContext);

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch({ type: 'login' });
		try {
			await handleSignIn(email, password);

			dispatch({ type: 'success' });
		} catch (error) {
			dispatch({ type: 'error' });
		}
	};

	const handleNavigateToSignup = () => {
		onSetCurrentPage('Signup');
	};

	return (
		<>
			<div className="signup_form">
				<div>
					<h1 className="title">Sign In</h1>
					<h4 className="sub-title">
						Please fill in this form to login an account.
					</h4>
					<form className="form" onSubmit={onSubmit}>
						{error && <p className="error">{error}</p>}
						<div className="signup-details">
							<div className="form-label">
								<label>Email</label>
							</div>
							<div>
								<input
									value={email}
									onChange={(e) =>
										dispatch({
											type: 'field',
											fieldName: 'email',
											payload: e.currentTarget.value,
										})
									}
									type="text"
									placeholder="Enter Email"
									name="email"
									required
								/>
							</div>
						</div>
						<div className="signup-details">
							<div className="form-label">
								<label>Password</label>
							</div>
							<input
								onChange={(e) =>
									dispatch({
										type: 'field',
										fieldName: 'password',
										payload: e.currentTarget.value,
									})
								}
								value={password}
								type="password"
								placeholder="Enter Password"
								name="psw"
								required
							/>
						</div>
						<button
							type="submit"
							className="primary-solid"
							disabled={isLoading}
						>
							Sign In
						</button>
					</form>
					<p>
						<a
							href="#"
							style={{ color: 'dodgerblue' }}
							onClick={handleNavigateToSignup}
						>
							SignUp
						</a>
					</p>
				</div>
			</div>
		</>
	);
};

export default Signin;
