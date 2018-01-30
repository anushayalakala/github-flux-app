import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Link } from 'react-router-dom';

class MainTabs extends React.Component {
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
      <Tabs >
        <Tab label="Userprofile" containerElement={<Link to='/user' />} style={styles.headline}></Tab>
        <Tab label="Repositories" containerElement={<Link to='/repos' />} style={styles.headline}></Tab>
        <Tab label="Gists" containerElement={<Link to='/gists' />} style={styles.headline}></Tab>
      </Tabs>
    );
  }
}
export default MainTabs;