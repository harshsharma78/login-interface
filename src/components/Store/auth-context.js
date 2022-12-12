import React, { useState, useEffect } from 'react';

/* we create context to directly links the props or related props functions to the components that needed it without making a prop chain of functions in the components that doesn't need that certain prop functions. E.g., if a prop Login from Login Component is needed in the Cart Component  then it will have to go to its upper parent and again another parent and again from the head parent to the Cart Component, so to remove this the Context is created.

 And it is  preferred to create context in different Component Folder.
 */
const AuthContext = React.createContext({
	isLoggedIn: false,
	onLogout: () => {}, // For IDE auto-Completion
	onLogin: (email, password) => {},
});


// Must Check Index component after this 

export const AuthContextProvider = props => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const userLoggedIn = localStorage.getItem('isLoggedIn');
		if (userLoggedIn === '1') {
			setIsLoggedIn(true);
		}
	}, []);

	const logoutHandler = () => {
		localStorage.removeItem('isLoggedIn');
		setIsLoggedIn(false);
	};

	const loginHandler = () => {
		localStorage.setItem('isLoggedIn', '1');
		setIsLoggedIn(true);
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				onLogout: logoutHandler,
				onLogin: loginHandler,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};
export default AuthContext;
