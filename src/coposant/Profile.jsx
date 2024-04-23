import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function Profile() {
    const user = parseInt(localStorage.getItem('connecter'))
    const { data, isLoading, error } = useQuery({
        queryKey: ['profile'],
        queryFn: () => axios.get(`http://127.0.0.1:8000/listandcreats/${user}`).then((res) => res.data)
    })

    return (
        <div className='container '>
            <div className="row mb-5">
                <div className="col-md-12 col-lg-4"><h2>Nom </h2>{data.nom} </div>
                <div className="col-md-0 col-lg-4"> </div>
                <div className="col-md-12 col-lg-4"><h2>Prenom </h2>{data.prenom} </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-12 col-lg-4"><h2>Email </h2>{data.email} </div>
                <div className="col-md-0 col-lg-4"> </div>
                <div className="col-md-12 col-lg-4"><h2>Password </h2> ******** </div>
            </div>
        </div>
    )
}
