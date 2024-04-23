import { Message, Padding } from '@mui/icons-material'
import { Avatar, Box, Button, CircularProgress, Stack } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function User() {
    const { data: users, isLoading, error } = useQuery({
        queryKey: ["utilisateur"],
        queryFn: () => axios.get("http://localhost:8000/listandcreat/").then((res) => res.data)
    })
    if (isLoading) {
        return <Stack sx={{ color: 'grey.500' }}> <CircularProgress color='inherit' /></Stack>
    }
    return (
        <Stack width={'20%'} marginTop={5}>
            {users ? users.map((donne) => {
                return <Stack key={donne.pk} direction={'row'} alignItems={'center'} borderRadius={'3%'} sx={{ border: '1px solid #b47be9' }} padding={1} margin={2}>
                    <Box ><Avatar>{donne.username[0]}</Avatar></Box>
                    <Stack direction={'column'} paddingLeft={3}>
                        <Box>{donne.username}</Box>
                        <Link to={'/message/' + donne.pk}><Box><Button variant='outlined' fullWidth size='small' color='secondary' endIcon={<Message />} >message</Button></Box></Link>
                    </Stack>
                </Stack>
            }) : <Stack sx={{ color: 'grey.500' }}> <CircularProgress color='inherit' /></Stack>}
        </Stack>
    )
}
