import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

export default function Mymessage() {
    const user = parseInt(localStorage.getItem('connecter'))
    let compteur = 0
    const [message, setmessage] = useState([])
    const { data, isLoading, error } = useQuery({
        queryKey: ['message'],
        queryFn: () => axios.get('http://127.0.0.1:8000/veriftoken/', { params: { 'expediteur': user } }).then((res) => res.data),
    })
    const { data: recepteur, isLoading: receptload, error: norecept } = useQuery({
        queryKey: ['recepteur'],
        queryFn: () => axios.get('http://127.0.0.1:8000/listandcreat/').then((res) => res.data),
    })

    return (
        <div>
            {data ? data.map((donne) => {

                let count = 0
                for (let i = compteur; i < data.length; i++) {
                    if (donne.recepteur == data[i].recepteur) {
                        count += 1
                    }
                }
                if (count <= 1) {
                    if (recepteur) {
                        for (let i = 0; i < recepteur.length; i++) {
                            if (donne.recepteur == recepteur[i].pk) {
                                return <Link to={'/message/' + donne.recepteur} style={{ textDecoration: 'None', color: 'black' }} key={donne.pk}><Stack direction={'column'} margin={3} ><Box><Typography variant='h5'>{recepteur[i].username}</Typography></Box><Box><Typography variant='h6'>{donne.message}</Typography></Box></Stack></Link>
                            }
                        }
                    }
                    else {
                        return <Stack sx={{ color: 'grey.500' }}> <CircularProgress color='inherit' /></Stack>
                    }

                }
                compteur += 1
                if (compteur == data.length) {
                    compteur = 0
                }

            }) : <Stack sx={{ color: 'grey.500' }}> <CircularProgress color='inherit' /></Stack>}
        </div>
    )
}
