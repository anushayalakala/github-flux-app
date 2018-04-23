import React from 'react';
import '../Styles/Repositories.css';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RepositoryStore from '../Stores/RepositoryStore'
import * as RepositoryActions from '../Actions/RepositoryActions';

export default class Repositories extends React.Component {
  constructor() {
    super();
    this.state = { username: localStorage.getItem('USER_NAME'), repositories: [] };
    this.onReposFetch = this.onReposFetch.bind(this);
  }

  componentWillMount() {
    RepositoryStore.addChangeListener(this.onReposFetch);
  }

  componentWillUnmount() {
    RepositoryStore.removeChangeListener(this.onReposFetch);
  }

  componentDidMount() {
    this.getRepositories();
  }

  getRepositories() {
    RepositoryActions.getRepositories();
  }

  onReposFetch() {
    this.setState({
      repositories: RepositoryStore.getUserRepositories(),
  });
  }

  render() {
    const style1 = {
      color: 'black',
      fontSize: 20,
      padding: 10,
    };
    const style2 = {
      fontSize: 12,
      padding: 10,
      color: 'gray'
    };
    return (
      <MuiThemeProvider>
        <div className="userrepos">
          <List className="repo-list">
            <div >
              {
                this.state.repositories.map((obj) => {
                  const date = new Date(obj.updated_at).toDateString();
                  return <div>
                    <ListItem style={{ height: 120 }} key={obj.id} >
                      <div style={style1} className="repo-listitem"><Link to={{ pathname: `repos/${obj.name}` }}>{obj.name}</Link></div>
                      <div style={style2}>{obj.description}</div>
                      <div style={style2}>Updated on {date}</div>
                      <Divider></Divider>
                    </ListItem>
                  </div>
                })
              }
            </div>
          </List>
        </div>
      </MuiThemeProvider>
    );
  }
}

