import { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import R from 'ramda'
import GitHubActions from '../../redux/GitHubRedux'
import './GitHubScreen.scss'

class GitHubScreen extends Component {
  componentWillMount() {
    this.props.getRepos('octocat')
  }

  renderRepos(repos) {
    return R.pipe(
      R.defaultTo([]),
      R.addIndex(R.map)((repo, index) => (
        <li key={index}>
          <h2>{repo.name}</h2>
          <p>{repo.description}</p>
        </li>
      ))
    )(repos)
  }

  render() {
    return (
      <div>
        <h1>GitHub</h1>
        <ul>
          {this.renderRepos(this.props.repos)}
        </ul>
      </div>
    )
  }
}

GitHubScreen.propTypes = {
  repos: PropTypes.array,
  getRepos: PropTypes.func
}

function mapStateToProps(state) {
  return {
    repos: state.github.repos
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getRepos: (username) => dispatch(GitHubActions.githubGetRepos(username))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GitHubScreen)
)