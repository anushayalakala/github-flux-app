import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import '../Styles/Gists.css';
import GistStore from '../Stores/GistStore'; 
import * as GistActions from '../Actions/GistActions';

export default class Gists extends React.Component {
  constructor() {
    super();
    this.state = { gists: [] };
    this.getUserGists = this.getUserGists.bind(this);
    this.userGists = this.userGists.bind(this);
  }
  componentWillMount() {
    GistStore.addChangeListener(this.getUserGists);
  }
  componentDidMount() {
    this.userGists();
  }
  userGists() {
    GistActions.getGists();
  }
  getUserGists() {
    this.setState({
      gists:GistStore.getUserGists()
    });
  }
  render() {
    const div_styles = {
      height: 80,
      padding: 10 
    }
    const list_styles = {
      padding: 20,
      fontSize: 20 
    }
    const filenames = this.state.gists.map((obj) => {
      const { files, id } = obj;
      if (typeof obj !== "undefined" && obj !== null) {
        return { filename: Object.keys(files)[0], fileId: id };
      }
      else {
        return { filename: "", fileId: 0 };
      }
    });
    return (
      <MuiThemeProvider>
        <div className="usergists">
          <List className="gists-ul">
            {filenames.map(obj =>
              <div style={div_styles} className='gists-li' key={obj.fileId}>
                <ListItem style={list_styles} containerElement={<Link id="filelink" to={{ pathname: `gists/${obj.fileId}`, state: { username: this.state.username } }} />}>{obj.filename}</ListItem>
                <Divider></Divider>
              </div>)
            }
          </List>
        </div>
      </MuiThemeProvider>
    );
  }
}

