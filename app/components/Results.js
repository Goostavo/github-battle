var React = require('react');
var PropTypes = require('prop-types');
const QueryString = require('query-string');
const api = require('../utils/api');
const Link = require('react-router-dom').Link;
const PlayerPreview = require('./PlayerPreview');
var Loading = require('./Loading');

function Profile (props) {
  var info = props.info;
  return (
    <PlayerPreview avatar={info.avatar_url} username={info.login}>
      <ul className='space-list-items'>
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public repos: {info.public_repos}</li>
        {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}

function Player (props) {
  return (
    <div>
      <h1 className='header'>{props.label}</h1>
      <h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
      <Profile info={props.profile} />
    </div>
  )
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
}

class Results extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }
  componentDidMount() {
    let players = QueryString.parse(this.props.location.search);
    api.battle([
      players.playerOneName,
      players.playerTwoName]
    ).then((results) => {
      if (results === null){
        return this.setState(() => {
          return {
            error: 'Looks like there was an error!\nCheck that both users exist on github.',
            loading: false
          }
        });
      }

      return this.setState(() => {
        return {
          error: null,
          loading: false,
          winner: results[0],
          loser: results[1]

        }
      });
    });
  }
  render() {
    let error = this.state.error;
    let winner = this.state.winner;
    let loser = this.state.loser;
    let loading = this.state.loading;

    if (loading === true){
      return (<Loading />)
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      )
    }

    return (
      <div className='row'>
        <Player
          label='winner'
          score={winner.score}
          profile={winner.profile}
        />
        <Player
          label='loser'
          score={loser.score}
          profile={loser.profile}
        />
      </div>
    )
  }
}

module.exports = Results;
