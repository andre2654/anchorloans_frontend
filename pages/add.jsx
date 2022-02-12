import React from 'react'
import Head from 'next/head'
import Container from './components/general/Container/Container'
import AddForm from './components/pages/add/AddForm/AddForm'

export default function Login() {
    return (
        <>
            <Head>
                <title>Add user</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Container
                min_height="100vh"
                height="100vh"
                container_type="fluid"
                horizontal="middle"
                vertical="middle"
                flex_direction={{
                    sm: 'column',
                    md: 'column',
                    lg: 'column',
                    xl: 'column',
                }}
                hide_scrollbar
                custom_style={{ overflowY: 'scroll', background: "linear-gradient(45deg, var(--bg-color) 50%, var(--main-color) 50%)" }}
            >
                <AddForm />
            </Container>
        </>
    )
}
