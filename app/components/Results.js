var React = require('react');
const QueryString = require('query-string');
const api = require('../utils/api');
const Link = require('react-router-dom').Link;

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
      return (<p>Loading...</p>)
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
      <div>{JSON.stringify(this.state, null, 2)}</div>
    )
  }
}

module.exports = Results;
