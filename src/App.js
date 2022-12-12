// import React, { useState, useEffect } from 'react';
import React, { useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './components/Store/auth-context';

function App() {
	const ctx = useContext(AuthContext);
	return (
		<React.Fragment>
			<MainHeader />
			<main>
				{!ctx.isLoggedIn && <Login  />}
				{ctx.isLoggedIn && <Home  />}
			</main>
		</React.Fragment>
	);
}

// Without using Context API and Context Hook

/* 
  "useEffect" ---> helps in retaining the state as the code inside the "useEffect arrow function" runs only when the dependencies "changes in []" and the dependencies changes and it executed for the first time when the react app launches for the first time (No dependencies to Some dependencies) and after that react app runs again and only if the dependencies changed then the code inside the arrow function will be executed.
  */

/* function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const userLoggedIn = localStorage.getItem('isLoggedIn');
		if (userLoggedIn === '1') {
			setIsLoggedIn(true);
		}
	}, []);

	const loginHandler = (email, password) => {
		// We should of course check email and password
		// But it's just a dummy/demo anyways
		localStorage.setItem('isLoggedIn', '1');
		setIsLoggedIn(true);
	};

	const logoutHandler = () => {
		localStorage.removeItem('isLoggedIn');
		setIsLoggedIn(false);
	};

	return (
		// <React.Fragment>
		// use a provider if a value can change otherwise its not needed
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				onLogout: logoutHandler,
			}}
		>
			<MainHeader
			// isAuthenticated={isLoggedIn}
			// onLogout={logoutHandler}
			/>
			<main>
				{!isLoggedIn && <Login onLogin={loginHandler} />}
				{isLoggedIn && <Home onLogout={logoutHandler} />}
			</main>
		</AuthContext.Provider>
		// </React.Fragment>
	);
} */

export default App;
