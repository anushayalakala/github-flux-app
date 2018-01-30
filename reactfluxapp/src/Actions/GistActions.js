import dispatcher from '../dispatcher';

export function getGists() {
    dispatcher.dispatch({
        type: "GET_GISTS",
    });
}
export function getGistFiles(Id) {
    dispatcher.dispatch({
        type: "GET_GIST_FILES",
        Id  : Id
    });
}

