import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Link } from 'react-router-dom';
import NavStore from '../Stores/NavStore';
import * as navActions from '../Actions/NavActions';

class NavLinks extends React.Component {
  constructor(props) {
    super(props);
    this.state = { slideIndex: localStorage.getItem('TAB_INDEX') };
    this.handleChange = this.handleChange.bind(this);
    this.setTabIndex = this.setTabIndex.bind(this);
  }
  handleChange() {
    this.setState({
      slideIndex: NavStore.getSelectedTabIndex()
    });
  };
  setTabIndex(e) {
    const tabindex = e.props.value;
    localStorage.setItem('TAB_INDEX', tabindex);
    navActions.setActiveTab(tabindex);
  }
  render() {
    const styles =
      {
        headline: {
          fontSize: 15,
          paddingTop: 16,
          marginBottom: 12,
          fontWeight: 200,
        }
      };

    return (
      <Tabs onChange={this.handleChange} value={localStorage.getItem('TAB_INDEX')} >
        <Tab label="Userprofile" onActive={this.setTabIndex} value="0" containerElement={<Link to='/user' />} style={styles.headline}></Tab>
        <Tab label="Repositories" onActive={this.setTabIndex} value="1" containerElement={<Link to='/repos' />} style={styles.headline}></Tab>
        <Tab label="Gists" onActive={this.setTabIndex} value="2" containerElement={<Link to='/gists' />} style={styles.headline}></Tab>
      </Tabs>
    );
  }
}
export default NavLinks;