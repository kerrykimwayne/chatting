import { Menu } from '@mui/icons-material'
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const redirection = useNavigate()
    const redirige = () => {
        localStorage.removeItem("utilisateur")
        redirection('/connexion', { replace: true, state: { form: '/connexion' } })
        toast('vous etes déconnecter')
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton size='large' edge="start" color='inherit' aria-label='menu' sx={{ mr: 2 }}> <Menu /></IconButton>
                    <Typography variant='h6' component={"div"} sx={{ flexGrow: 1 }}>
                        My App
                    </Typography>
                    <Button color='inherit' onClick={redirige}>Deconnexion</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
