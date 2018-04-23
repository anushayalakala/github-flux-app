import dispatcher from '../dispatcher';

export function getRepositories(){
    dispatcher.dispatch({
        type:"GET_REPOSITORIES",
    });
}
export function getRepoCommits(reponame){
    dispatcher.dispatch({
        type:"GET_REPOSITORY_COMMITS",
        reponame :reponame
    });
}
