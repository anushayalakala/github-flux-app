import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.css';
import App from './Components/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Userprofile from './Components/Userprofile';
import Repositories from './Components/Repositories';
import Gists from './Components/Gists';
import Gistfile from './Components/GistFiles';
import RepoInfo from './Components/RepoInfo';


ReactDOM.render((<Router>
    <div>
        <App />
        <Switch>
            <Route path="/user" component={Userprofile} />
            <Route path="/repos/:reponame" component={RepoInfo} />
            <Route path="/repos" component={Repositories} />
            <Route path="/gists/:fileId" component={Gistfile} />
            <Route path="/gists" component={Gists} />
        </Switch>
    </div>
</Router>)
    , document.getElementById('root'));

registerServiceWorker();
