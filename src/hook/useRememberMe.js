import { useState, useEffect, useCallback } from "react";

export default function useRememberMe(loginFormRef) {

    const [rememberMeChecked, setRememberMeChecked] = useState(false);

    useEffect(() => {
        if (loginFormRef.current === null) {
            return
        } else {
            const loginForm = loginFormRef.current;
            if (localStorage.getItem('username')) {
                setRememberMeChecked(true)
                loginForm.username.focus()
                loginForm.username.value = localStorage.getItem('username') || '';
            }
        }
    }, [loginFormRef]);

    const rememberMeStorageSetter = useCallback((username) => {
        if (rememberMeChecked) {
            localStorage.setItem('username', username);
        } else {
            localStorage.removeItem('username');
        }
    }, [rememberMeChecked])

    return { rememberMeChecked, setRememberMeChecked, rememberMeStorageSetter }
}
