import BaseStore from './BaseStore';
import dispatcher from '../dispatcher'

class GistStore extends BaseStore {
    constructor() {
        super();
        this.usergists = [];
        this.gistfiles= {};
    }
    fetchUserGists() {
        const username = localStorage.getItem('USER_NAME');
        if (username) {
            fetch(`https://api.github.com/users/${username}/gists`)
                .then(data => data.json())
                .then((data) => {
                    this.usergists = data;
                    this.emitChange()
                });
        }
    }
    getUserGists() {
        return this.usergists;
    }
    fetchGistFiles(Id) {
        fetch(`https://api.github.com/gists/${Id}`)
        .then(data =>data.json())
        .then(data => {
            this.gistfiles= data;
            this.emitChange()
        });
    }
    getGistFiles() {
        return this.gistfiles;
    }
    handelActions(action) {
        switch (action.type) {
            case "GET_GISTS": {
                this.fetchUserGists();
                break;
            }
            case "GET_GIST_FILES": {
                this.fetchGistFiles(action.Id);
                break;
            }
            default:
                return true;
        }
    }
}

const giststore = new GistStore;
dispatcher.register(giststore.handelActions.bind(giststore));
export default giststore;
