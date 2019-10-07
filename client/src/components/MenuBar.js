import React, { useState , useContext } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { AuthContext } from '../context/auth'

const MenuBar = () => {
    const { user, logout } = useContext(AuthContext)
    const pathname = window.location.pathname
    const path = pathname === '/' ? 'home' : pathname.substr(1)

    console.log(path)

    const [activeItem , setActiveItem] = useState(path) 

    const  handleItemClick = (e, { name }) => setActiveItem( name )

    const menu = user ? (
      <Menu pointing secondary>
        <Menu.Item
          name={user.username}
          active
          as = {Link}
          to = "/"
        />
      <Menu.Menu position='right'>
        <Menu.Item
          name='logout'
          onClick={logout}
          as = {Link}
          to = "/"
        />
        </Menu.Menu>
      
      </Menu>) : (

        <Menu pointing secondary>
          <Menu.Item
            name='Home'
            active={activeItem === 'Home'}
            onClick={handleItemClick}
            as = {Link}
            to = "/"
          />
        <Menu.Menu position='right'>
        <Menu.Item
            name='Login'
            active={activeItem === 'Login'}
            onClick={handleItemClick}
            as = {Link}
            to = "/login"
          />
          <Menu.Item
            name='Register'
            active={activeItem === 'Register'}
            onClick={handleItemClick}
            as = {Link}
            to = "/register"
          />
          </Menu.Menu>
        
        </Menu>

       
    )

    return menu
  }


export default MenuBar
