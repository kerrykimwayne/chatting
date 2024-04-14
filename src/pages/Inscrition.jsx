import { People } from '@mui/icons-material'
import { Box, Grid, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

export default function Inscrition() {
    let message = ""
    const redirection = useNavigate()
    const { handleSubmit, register, reset, formState: { errors } } = useForm()
    const submiting = (data) => {
        if (data.password !== data.confirmpassword) {
            toast.error("les deux mot de passe correspond pas")
        }
        else {
            axios.get(`http://localhost:3000/utilisateur?mail=${data.mail}`).then((res) => {
                if (res.data.length > 0) {
                    toast.error("cet utilisateur existe déjà")
                }
                else {
                    axios.post('http://localhost:3000/utilisateur', data).then((res) => {
                        toast.success("compte créé")
                        redirection('/', { replace: true, state: { form: '/' } })
                        reset()
                    }).catch((err) => {
                        toast.error(err)
                    })
                }
            }).catch((err) => {
                toast.error("erreur lors de la création")
            })


        }

    }
    const blur = () => {
        if (errors.username) {
            message = errors.username.message
        }
        if (errors.nom) {
            message = errors.nom.message
        }
        if (errors.prenom) {
            message = errors.prenom.message
        }
        if (errors.mail) {
            message = errors.mail.message
        }

    }
    useEffect(() => {
        if (localStorage.getItem("utilisateur")) {
            redirection('/connexion', { replace: true, state: { form: '/' } })
        }
    })
    return (
        <Stack width={'100%'}>
            <Stack alignItems={'center'} height={'100vh'} justifyContent={'center'} direction={'column'} gap={2}>
                <div>
                    <Typography variant='h2'><People sx={{ color: '#0000ff' }} fontSize='40' /> Inscrition</Typography>
                </div>
                <Box>
                    <form action="" onSubmit={handleSubmit(submiting)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField id='outlined-basic' label="Nom" variant='outlined' size='small' fullWidth {...register("nom", {
                                    required: true, minLength: { value: 6, message: "entrer votre nom" }, pattern: {
                                        value: new RegExp("^[a-zA-Z0-9]+(?:[\\s-][A-Za-z]+)*$"),
                                        message: "entrer un nom valid"
                                    }
                                })} onBlur={blur} />
                                {errors.nom && <p>{message}</p>}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField id='outlined-basic' label="Prenom" variant='outlined' size='small' fullWidth {...register("prenom", {
                                    required: true, minLength: { value: 6, message: "entrer votre nom" }, pattern: {
                                        value: new RegExp("^[a-zA-Z0-9]+(?:[\\s-][A-Za-z]+)*$"),
                                        message: "entrer un prenom valid"
                                    }
                                })} onBlur={blur} />
                                {errors.prenom && <p>{message}</p>}
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField id='outlined-basic' label="Nom d'utilisateur" variant='outlined' size='small' fullWidth {...register("username", {
                                    required: true, minLength: { value: 6, message: "entrer votre nom" }, pattern: {
                                        value: new RegExp("^[a-zA-Z0-9]+(?:[\\s-][A-Za-z]+)*$"),
                                        message: "nom d'utilisateur invalid"
                                    }
                                })} onBlur={blur} />
                                {errors.username && <p>{message}</p>}
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField id='outlined-basic' label="email" variant='outlined' size='small' fullWidth {...register("mail", {
                                    required: true, minLength: { value: 6, message: "entrer votre nom" }, pattern: {
                                        value: new RegExp("^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[A-Za-z]{2,}$"),
                                        message: "email invalid"
                                    }
                                })} onBlur={blur} />
                                {errors.mail && <p>{message}</p>}

                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField id='outlined-basic' label="Mot de passe" variant='outlined' size='small' fullWidth type='password' {...register("password", { required: "entrer un bon mot de passe", minLength: { value: 6, message: "entrer votre nom" } })} onBlur={blur} />
                            </Grid> {errors.password && <p>{message}</p>}
                            <Grid item xs={12} md={6}>
                                <TextField id='outlined-basic' label="confirmer Mot de passe" variant='outlined' size='small' fullWidth type='password' {...register("confirmpassword", { required: true, minLength: { value: 6, message: "entrer votre nom" } })} onBlur={blur} />
                            </Grid>

                        </Grid>
                        <button type="submit" className='btn btn-primary w-100 mt-3'> s'inscrire</button>
                    </form>

                </Box>
                <h3><Link to={'/connexion'}>j'ai un compte</Link></h3>
            </Stack>
        </Stack>
    )
}
