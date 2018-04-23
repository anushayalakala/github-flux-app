import BaseStore from './BaseStore';
import dispatcher from '../dispatcher';

class RepositoryStore extends BaseStore {
    constructor() {
        super();
        this.repositories = [];
        this.commits = [];
    }
    fetchUserRepos() {
        const userName = localStorage.getItem('USER_NAME');
        if (userName) {
            fetch(`https://api.github.com/users/${userName}/repos`)
                .then(data => data.json())
                .then((data) => {
                    this.repositories = data;
                    this.emitChange();
                })
        }
    }

    getUserRepositories() {
        return this.repositories;
    }

    fetchRepositoryCommits(reponame) {
        const userName = localStorage.getItem('USER_NAME');
        fetch(`https://api.github.com/repos/${userName}/${reponame}/commits`)
        .then(data =>
            data.json())
        .then((data) => {
           this.commits = data;
           this.emitChange();
        }
        ) 
    }

    getRepositoryCommits() {
        return this.commits;
    }
    
    handelActions(action) {
        switch (action.type) {
            case "GET_REPOSITORIES": {
                this.fetchUserRepos();
                break;
            }
            case "GET_REPOSITORY_COMMITS": {
                this.fetchRepositoryCommits(action.reponame);
                break;
            }
            default:
                return true;
        }
    }
}
const repositoryStore = new RepositoryStore();
dispatcher.register(repositoryStore.handelActions.bind(repositoryStore));

export default repositoryStore;