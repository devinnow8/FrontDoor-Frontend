import './App.css';
import { useState, useMemo } from 'react';
import ExtensionToggle from './components/ExtensionToggle';
import Signup from './components/SignUp';
import Signin from './components/SignIn';
import History from './components/History';
import AuthProvider from './components/AuthProvider';

export type Page = 'Signin' | 'Signup' | 'History';

function App() {
	const [currentPage, setCurrentPage] = useState<Page>('Signin');

	const getComponent = (currentPage: Page) => {
		switch (currentPage) {
			case 'Signin':
				return Signin;
			case 'Signup':
				return Signup;
			case 'History':
				return History;
			default:
				return Signin;
		}
	};

	const Component = useMemo(() => getComponent(currentPage), [currentPage]);

	return (
		<AuthProvider setCurrentPage={setCurrentPage}>
			<div className="app">
				<div className="ext_main_div">
					<div className="toggle">
						<p>Frontdoor chrome extension</p>
						<ExtensionToggle />
					</div>
				</div>
				<Component onSetCurrentPage={setCurrentPage} />
			</div>
		</AuthProvider>
	);
}

export default App;
