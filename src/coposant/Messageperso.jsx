import { Preview } from '@mui/icons-material'
import { Box, Button, TextField, TextareaAutosize } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link, useParams } from 'react-router-dom'

export default function
    () {
    const { handleSubmit, reset, register, formState: { errors } } = useForm()
    const { id } = useParams()
    const queryclient = useQueryClient()
    const donnee = JSON.parse(localStorage.getItem('utilisateur'))
    const mutate = useMutation({
        mutationFn: (messageries) => {
            axios.post("http://localhost:3000/message", messageries).then((res) => {
            }).catch((erro) => {
                toast.error("erreur")
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
        const messages = { ...data, 'expediteur': donnee.id, 'recepteur': id }
        mutate.mutate(messages)
    }
    const { data: messagess, isLoading, error } = useQuery({
        queryKey: ['messages'],
        queryFn: () => axios.get('http://localhost:3000/message').then((res) => res.data)
    })
    return (
        <div className='container'>
            <Button startIcon={<Preview />} variant='contained' className=' mb-3'><Link to={'/'} color='secondary'> Retour</Link></Button>
            <form action="" onSubmit={handleSubmit(submit)}>
                <TextField Rows={4} multiline {...register('message', { required: true })} />
                <Button type='submit'>envoyer</Button>
            </form>

            <div >
                {messagess ? messagess.map((mes) => {
                    if ((mes.expediteur === donnee.id) && (mes.recepteur === id)) {
                        return <div className='d-flex justify-content-start'><div className='bg-light m-3 p-3 rounded-3' key={mes.id}>{mes.message}</div></div>
                    }
                    if ((mes.expediteur === id) && (mes.recepteur === donnee.id)) {
                        return <div className='d-flex justify-content-end'><div className='m-3 p-3 rounded-3' key={mes.id}>{mes.message}</div></div>
                    }

                }) : <p>pas de message</p>}
            </div>
        </div >
    )
}
