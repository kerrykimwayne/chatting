import { Message, Padding } from '@mui/icons-material'
import { Avatar, Box, Button, Stack } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function User() {
    const { data: users, isLoading, error } = useQuery({
        queryKey: ["utilisateur"],
        queryFn: () => axios.get("http://localhost:3000/utilisateur").then((res) => res.data)
    })
    if (isLoading) {
        return <p>chargement...</p>
    }
    return (
        <Stack width={'20%'} marginTop={5}>
            {users.map((donne) => {
                return <Stack key={donne.id} direction={'row'} alignItems={'center'} borderRadius={'3%'} sx={{ border: '1px solid #b47be9' }} padding={1} margin={2}>
                    <Box ><Avatar>{donne.username[0]}</Avatar></Box>
                    <Stack direction={'column'} paddingLeft={3}>
                        <Box>{donne.username}</Box>
                        <Box><Button variant='outlined' fullWidth size='small' color='secondary' endIcon={<Message />} ><Link to={'/message/' + donne.id}>message</Link></Button></Box>
                    </Stack>
                </Stack>
            })}
        </Stack>
    )
}
