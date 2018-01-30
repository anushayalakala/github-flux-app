import React from 'react';
import { List, ListItem } from 'material-ui/List';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import IconButton from 'material-ui/IconButton';
import '../Styles/RepoInfo.css';
import RepositoryStore from '../Stores/RepositoryStore';
import * as RepositoryActions from '../Actions/RepositoryActions';

export default class RepoInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { commits: []  }
        this.getRepositoryCommits = this.getRepositoryCommits.bind(this);
        this.onReposCommitsFetch = this.onReposCommitsFetch.bind(this);
        this.goBack = this.goBack.bind(this);
        this.styles = {
            div_style : {
                paddingLeft: 50,
                paddingRight: 50
            }, 
            h3_style: {
                paddingLeft: 50,
                paddingRight: 50,
                color: 'gray'
            }, 
            msg_style : {
                padding: 5
            },
            name_style : {
                padding: 5,
                color: 'gray',
                fontSize: 12
            },
            hcode_style : {
                padding: 5,
                color: 'blue',
                alignself: 'flex-end'
            },
            list_div_style : {
                backgroundColor: 'white',
                border: '1px solid gray'
            },
            listitem_style: {
                display: 'flex'
            }

        }
    }
    componentWillMount() {
        RepositoryStore.addChangeListener(this.onReposCommitsFetch);
    }
    componentDidMount() {
        this.getRepositoryCommits();
    }
    getRepositoryCommits() {
        const reponame= this.props.match.params.reponame;
        RepositoryActions.getRepoCommits(reponame);
    }
    onReposCommitsFetch() {
        this.setState({
            commits: RepositoryStore.getRepositoryCommits(),
        });
    }
    goBack() {
        this.props.history.goBack();
    }
    render() {
        return (
            <MuiThemeProvider>
                <div className="repoinfo">
                    <IconButton onClick={this.goBack}><NavigationArrowBack/></IconButton>
                    <h3 style={this.styles.h3_style}>commits</h3>
                    <div style={this.styles.div_style}>
                        <List>
                            {
                                this.state.commits.map(obj => {
                                    const { commit } = obj;
                                    const {committer} = commit;
                                    const commitdate = new Date(committer.date).toDateString();
                                    const hcode = (obj.sha).slice(0, 6);
                                    return <div style={this.styles.list_div_style}><ListItem style={this.styles.listitem_style}>
                                        <div style={this.styles.msg_style}>{commit.message}</div>
                                        <div style={this.styles.name_style}>{committer.name} commited on {commitdate}</div>
                                        <div style={this.styles.hcode_style}>{hcode}</div>
                                    </ListItem></div>
                                })
                            }
                        </List>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}
