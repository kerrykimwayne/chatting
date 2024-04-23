import { People } from '@mui/icons-material'
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Buttonnavbar from '../coposant/Buttonnavbar'
import toast from 'react-hot-toast'
import axios from 'axios'

export default function Connexion() {
    const redirection = useNavigate()
    const { handleSubmit, register, reset, formState: { errors } } = useForm()
    let id = 0
    const submiting = (data) => {
        axios.get("http://127.0.0.1:8000/listandcreat/", { params: { 'username': data.username, 'password': data.password } }).then((res) => {
            console.log(res)
            if (res.data.length != 0) {
                id = res.data[0].pk
                console.log(res)
                reset()
                toast.success("connecter")
                localStorage.setItem('connecter', id)
                redirection('/', { replace: true, state: { form: '/' } })

            }
            else {
                toast.error("nom d'utisateur ou mot de passe incorrect")
            }
        }).catch((err) => {
            toast.error("erreur lors de la création")
        })
    }
    useEffect(() => {
        if (localStorage.getItem("connecter")) {
            redirection('/', { replace: true, state: { form: '/' } })
        }
    })
    return (
        <Stack width={'100%'}>
            <Stack alignItems={'center'} height={'100vh'} justifyContent={'center'} direction={'column'} gap={2}>
                <div>
                    <Typography variant='h2'><People sx={{ color: '#0000ff' }} fontSize='40' /> Connexion</Typography>
                </div>
                <Box>
                    <form action="" onSubmit={handleSubmit(submiting)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <TextField id='outlined-basic' className={() => "errorclass"} label="Nom d'utilisateur" variant='outlined' size='small' fullWidth {...register("username", { required: true, minLength: { value: 5, message: "entrer votre nom" } })} />
                                {errors.username ? "nom d'utilisateur inexistant" : <p>salut</p>}
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField id='outlined-basic' label="Mot de passe" variant='outlined' size='small' fullWidth type='password' {...register("password", { required: true, minLength: { value: 5, message: "entrer votre nom" } })} />
                            </Grid>
                        </Grid>

                        <Button type="submit">se connecter</Button>
                    </form>

                </Box>
                <h3><Link to={'/inscription'}>créer un compte</Link></h3>
            </Stack>
        </Stack>
    )
}
