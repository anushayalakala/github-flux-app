import BaseStore from './BaseStore';
import dispatcher from '../dispatcher';

class UserStore extends BaseStore {

    constructor() {
        super();
        this.userdata = {};
        this.error = "";
        this.isEdit = localStorage.getItem('USER_NAME') ? false : true;
    }

    fetchUserData() {
        const userName = localStorage.getItem('USER_NAME');
        if (userName) {
            fetch(`https://api.github.com/users/${userName}`)
                .then((response) => {
                    if (response.ok) {
                        response.json().then(data => {
                            this.userdata = data;
                            this.error = ''
                            this.emitChange();
                        })
                    } else {
                        throw Error(response.statusText)
                    }
                }).catch(error => {
                    this.error = error.message;
                    this.emitChange();
                })
        }
    }

    getError() {
        return this.error;
    }

    getUserData() {
        return this.userdata;
    }

    getEditStatus() {
        return this.isEdit;
    }
    
    handelActions(action) {
        switch (action.type) {
            case "GET_USER": {
                this.fetchUserData();
                this.isEdit = action.isEdit;
            }
            default:
                return true;
        }
    }
}

const userStore = new UserStore;
dispatcher.register(userStore.handelActions.bind(userStore));
export default userStore;

