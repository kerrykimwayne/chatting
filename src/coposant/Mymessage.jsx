import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'

export default function Mymessage() {
    const user = JSON.parse(localStorage.getItem('utilisateur'))
    const { data, isLoading, error } = useQuery({
        queryKey: ['message'],
        queryFn: () => axios.get('http://localhost:3000/message', { params: { 'expediteur': user.id } }).then((res) => res.data),
    })
    return (
        <div>
            {data ? data.map((donne) => {
                return <h2>{donne.message}</h2>
            }) : <p>chargement...</p>}
        </div>
    )
}
