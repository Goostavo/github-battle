var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');

function SelectLanguage(props) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <ul className='languages'>
      {languages.map((lang)=>{
        return (
          <li
          style={lang === props.selectedLanguage ? {color: '#D0021B'}: null}
          onClick={props.onSelect.bind(null, lang)}
          key={lang}>
            {lang}
          </li>
        )
      })}
    </ul>
  )
}

SelectLanguage.propTypes = {
  selectedLanguage : PropTypes.string.isRequired,
  onSelect : PropTypes.func.isRequired
}

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }
  componentDidMount(){
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang){
    this.setState(function(){
      return {
        selectedLanguage: lang
      }
    });

    api.fetchPopularRepos(this.state.selectedLanguage)
    .then(function(repos){
      this.setState(function(){
        return {
          'repos': repos
        }
      });
    }.bind(this));
  }
  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {JSON.stringify(this.state.repos, 2, null)}
      </div>
    )
  }
}

module.exports = Popular;
