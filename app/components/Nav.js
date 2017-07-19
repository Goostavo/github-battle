var React = require('react');
var NavLink = require('react-router-dom').NavLink;

function Nav() {
  return (
    <ul className='nav'>
      <li>
        <NavLink exact activeClassName='activeClass' to='/'>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink exact activeClassName='activeClass' to='/battle'>
          Battle
        </NavLink>
      </li>
      <li>
        <NavLink exact activeClassName='activeClass' to='/popular'>
          Popular
        </NavLink>
      </li>
    </ul>
  )
}

module.exports = Nav;
