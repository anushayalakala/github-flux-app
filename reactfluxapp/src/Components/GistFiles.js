import React from 'react';
import PropTypes from 'prop-types';
import '../Styles/GistFiles.css';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import GistStore from '../Stores/GistStore';
import * as GistActions from '../Actions/GistActions';


class Gistfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { gistfiles: {} };
    this.getUserGistFiles = this.getUserGistFiles.bind(this);
    this.getGistfiles = this.getGistfiles.bind(this);
    this.styles = {
      name_style: {
        paddingLeft: 30,
        paddingRight: 30 
      },
      content_style: {
        paddingLeft: 30,
        paddingRight: 30
      }
    }
  }
  componentWillMount() {
    GistStore.addChangeListener(this.getUserGistFiles);
  }
  componentDidMount() {
    this.getGistfiles();
  }
  getGistfiles() {
    const { fileId: Id } = this.props.match.params;
    GistActions.getGistFiles(Id);
  }
  getUserGistFiles() {
    this.setState({
      gistfiles: GistStore.getGistFiles()
    });
  }f
  goBack() {
    this.props.history.goBack();
  }
  render() {
    const { gistfiles : { files = {} } } = this.state;
    const { goBack } = this.props;
    const filelist = Object.keys(files).map(name => <div>
      <div style={this.styles.name_style}><h3 >{name}</h3></div>
      <div style={this.styles.content_style}><p style={{ color: 'gray', border: '1px solid black', padding: 15 }}>{files[name].content}</p></div>
      <Divider></Divider>
    </div>);
    return (
      <MuiThemeProvider>
        <div className="content">
          <IconButton onClick={this.goBack.bind(this)} tooltip="go back and hold see the history"><NavigationArrowBack /></IconButton>
          <div>{filelist}</div>
        </div>
      </MuiThemeProvider>
    );
  }
}
Gistfile.propTypes = {
  match: PropTypes.object.isRequired,
  state: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  goBack: PropTypes.func.isRequired
};
export default Gistfile;
