import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import ContentSave from 'material-ui/svg-icons/content/save';
import '../Styles/Userprofile.css';
import UserStore from '../Stores/UserStore';
import * as UserActions from '../Actions/UserActions';

class Userprofile extends React.Component {

  constructor() {
    super();
    this.state = {
      userData: {},
      isEdit: localStorage.getItem('USER_NAME') ? false : true,
      error: ''
    };
    this.getUser = this.getUser.bind(this);
    this.onUserInput = this.onUserInput.bind(this);
    this.onUserChange = this.onUserChange.bind(this);
  }

  componentWillMount() {
    UserStore.addChangeListener(this.onUserChange);
  }

  componentWillUnmount() {
    UserStore.removeChangeListener(this.onUserChange);
  }

  componentDidMount() {
    this.getUser();
  }

  onUserChange() {
    this.setState({
      userData: UserStore.getUserData(),
      error: UserStore.getError(),
      isEdit: UserStore.getEditStatus()
    });
  }

  onUserInput(event) {
    const gitUserName = event.target.value;
    localStorage.setItem('USER_NAME', gitUserName);
  }

  getUser(isEdit = false) {
    UserActions.getUser(isEdit);
  }

  renderUserEditField(login = '') {
    return (
      <div>
        <TextField id="usersearch" floatingLabelText="Enter the User"
          defaultValue={login} onBlur={this.onUserInput} />
        <IconButton tooltip="Save" onClick={() => this.getUser()}><ContentSave /></IconButton>
      </div>
    )
  }

  renderUserReadOnly(login = '') {
    return (
      <div>
        <span style={{ fontSize: 20 }}>{login}</span>
        <IconButton tooltip="Edit User Name" onClick={() => this.getUser(true)}><EditorModeEdit /></IconButton>
      </div>
    )
  }

  render() {
    const { id, avatar_url, name, login } = this.state.userData;
    const error = this.state.error;
    return (
      <MuiThemeProvider>
        <div className="userprofile">
          {error ? <div class="errormsg"> <label> User Not Found </label> </div> : ""}
          <div className="userdata" >
            {(!error && id) ?
              <div>
                <div className="avatar" key={id}>
                  <Avatar size={150} src={avatar_url} />
                </div>
                <div style={{ fontSize: 26 }}>
                  <span>{name}</span>
                </div>
                {
                  this.state.isEdit ? this.renderUserEditField(login) : this.renderUserReadOnly(login)
                }
              </div>
              : <div>
                <span> Please enter github username</span>
                {this.renderUserEditField()}
              </div>
            }
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Userprofile;
