import authService from '@/service/auth.service';

const user = JSON.parse(localStorage.getItem('user'));

const initalState = user ? { status: { loggedIn: true }, user } : { status: { loggedIn: false }, user: null };

export const auth = {
   
    state: initalState,
    actions: {
        login({ commit }, user) {
            return authService.funcLogin(user).then(
                (user) => {
                    commit('loginSuccess', user);
                    let message = `Chào mừng ${user.metadata.user.name} quay trở lại!`;
                    const data = {
                        status: 1,
                        type: 'Login',
                        user: user,
                        message: message
                    };
                    return Promise.resolve(data);
                },
                (error) => {
                    commit('loginFail');
                    const data = {
                        status: 0,
                        type: 'Login',
                        message: error
                    };
                    return Promise.resolve(data);
                }
            );
        }
    },
    mutations: {
        loginSuccess(state, user) {
            console.log();
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFail(state) {
            state.status.loggedIn = true;
            state.user = null;
        }
    }
};
