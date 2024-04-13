import { AccountCircle, Home, Message, People } from '@mui/icons-material'
import { BottomNavigation, BottomNavigationAction } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import User from './User'
import Messageperso from './Messageperso'
import Mymessage from './Mymessage'

export default function Buttonnavbar() {
    const [value, setvalue] = useState('home')
    const change = (event, newvalue) => {
        setvalue(newvalue)
    }
    return (
        <div>
            {value === 'home' && <p>Bonojur</p>}
            {value === 'message' && <Mymessage />}
            {value === 'people' && <User />}
            <BottomNavigation showLabel sx={{ width: "100%", position: "fixed", bottom: 0 }} value={value} onChange={change}>
                <BottomNavigationAction label="Acceuil" icon={<Home />} value={'home'} />
                <BottomNavigationAction label="Message" icon={<Message />} value={'message'} />
                <BottomNavigationAction label="Profiles" icon={<AccountCircle />} value={'account'} />
                <BottomNavigationAction label="Amis" icon={<People />} value={'people'} />
            </BottomNavigation>
        </div>
    )
}
