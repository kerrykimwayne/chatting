import React, { useEffect } from 'react'
import Buttonnavbar from '../coposant/Buttonnavbar'
import Navbar from '../coposant/Navbar'
import { useNavigate } from 'react-router-dom'


export default function Dashbord() {
    const redirection = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem("connecter")) {
            redirection('/connexion', { replace: true, state: { form: '/' } })
        }
    })

    return (
        <div>
            <Navbar />
            <Buttonnavbar />
        </div>
    )
}
