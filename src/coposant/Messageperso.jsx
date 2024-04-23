import { Preview, Receipt } from '@mui/icons-material'
import { Box, Button, CircularProgress, Stack, TextField, TextareaAutosize } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link, useParams } from 'react-router-dom'

export default function
    () {
    const { handleSubmit, reset, register, formState: { errors } } = useForm()
    const { id } = useParams()
    const queryclient = useQueryClient()
    const donnee = parseInt(localStorage.getItem('connecter'))
    const mutate = useMutation({
        mutationFn: (messageries) => {
            axios.post("http://localhost:8000/veriftoken/", messageries).then((res) => {
            }).catch((erro) => {
                toast.error("error1")
                console.log(erro)
            })
        },
        onError: (err) => { toast.error("erreur") },
        onSuccess: () => {
            reset()
            queryclient.invalidateQueries("messages")
            toast.success("envoyer")
        }
    })
    const submit = (data) => {
        const messages = { ...data, 'expediteur': donnee, 'recepteur': id }
        console.log(messages)
        mutate.mutate(messages)
    }
    const { data: messagess, isLoading, error } = useQuery({
        queryKey: ['messages'],
        queryFn: () => axios.get('http://localhost:8000/veriftoken/').then((res) => res.data)
    })

    return (
        <div className='container'>
            <Button startIcon={<Preview />} variant='contained' className=' mb-3'><Link to={'/'} color='secondary'> Retour</Link></Button>
            <form action="" onSubmit={handleSubmit(submit)}>
                <TextField rows={4} multiline {...register('message', { required: true })} />
                <Button type='submit'>envoyer</Button>
            </form>

            <div >
                {messagess ? messagess.map((mes) => {
                    if (mes.expediteur == donnee && mes.recepteur == id) {
                        return <div className='d-flex justify-content-start' key={mes.pk}><div className='bg-light m-3 p-3 rounded-3'>{mes.message}</div></div>
                    }
                    if ((mes.expediteur == id) && (mes.recepteur == donnee)) {
                        return <div className='d-flex justify-content-end' key={mes.pk}><div className='m-3 p-3 rounded-3' >{mes.message}</div></div>
                    }

                }) : <Stack sx={{ color: 'grey.500' }}> <CircularProgress color='inherit' /></Stack>}
            </div>
        </div >
    )
}
