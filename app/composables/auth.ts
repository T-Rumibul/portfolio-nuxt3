import type { IContact, IResumeLocalized, TurnstileScript, APIResponse, IAuthVerifyResponse } from "~/../typing"

export const useAuth = () => {
    const token = useCookie<string>('accessToken', {
        path: '/admin',
        maxAge: 60 * 60 * 24 * 30,
        sameSite: 'strict'
    });
    const refreshToken = useCookie<string>('refreshToken', {path: '/admin', maxAge: 60 * 60 * 24 * 30, sameSite: 'strict'});
    const username = useCookie<string>('username', { path: '/admin', maxAge: 60 * 60 * 24 * 30, sameSite: 'strict'});
    const isLoggedIn = useState('isLoggedIn', () => false);
    const lastUpdated = useState('lastUpdated', () => 0);
    const login = async (username: string, password: string, turnstileToken: string) => {
        try {
            const response = await $fetch('/api/admin/login', {
                method: 'POST',
                body: {
                    username,
                    password,
                    token: turnstileToken,
                },
            });
          
            if (response && response.success) {
                const auth = {
                    accessToken: response.result.accessToken,
                    refreshToken: response.result.refreshToken,
                    username: response.result.username,
                }
                setAuth(auth);
                
                
                return true;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    }
    const verifyAuth = async () => {
        try {
            const response = await useAdminAPI<APIResponse<IAuthVerifyResponse>>('/verify-auth', {
                method: 'POST',
            });
            if (response.data.value && response.data.value.success) {
                lastUpdated.value = Date.now();
                isLoggedIn.value = true;
                return true;
            } else {
                isLoggedIn.value = false;
                return false;
            }
        } catch (e) {
            console.error(e);
            return false;
        }
    }
    const setAuth = (auth: { accessToken: string, refreshToken: string, username: string }) => {
        lastUpdated.value = Date.now();
        token.value = auth.accessToken;
        refreshToken.value = auth.refreshToken;
        username.value = auth.username;
        isLoggedIn.value = true;
    }
    const setAccessToken = (newToken: string) => {
        token.value = newToken;
        lastUpdated.value = Date.now();
    }
    const logout = () => {
        token.value = '';
        refreshToken.value = '';
        username.value = '';
        isLoggedIn.value = false;
    }

    return {
        token,
        refreshToken,
        username,
        isLoggedIn,
        lastUpdated,
        login,
        verifyAuth,
        logout,
        setAuth,
        setAccessToken,
    }
};