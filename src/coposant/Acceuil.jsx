import { Avatar, Badge, Box, Stack, Typography } from '@mui/material'
import { deepOrange } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'

export default function Acceuil() {
    const [time, settime] = useState(new Date())
    useEffect(() => {
        const intervall = setInterval(() => {
            settime(new Date())
        }, 1000)
        return () => clearInterval(intervall)
    }, [])
    return (
        <Stack width={'100%'} height={'90vh'} justifyContent={'center'} alignItems={'center'}>
            <Box><Typography variant='h1'>{time.toLocaleTimeString()}</Typography></Box>
            <Box>

                <Stack direction={'row'}>
                    <Badge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={<Avatar style={{ width: '15px', height: '15px', backgroundColor: deepOrange[500] }}>K</Avatar>}>
                        <Avatar src='./src/images/kimwayne.jpg' style={{ width: '60px', height: '60px' }} />
                    </Badge>
                    <Typography variant='h4' marginTop={'10px'}>Projet de distraction</Typography>
                </Stack>
            </Box>
        </Stack>
    )
}
