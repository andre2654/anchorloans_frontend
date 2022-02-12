import React from 'react'
import Head from 'next/head'
import Container from './components/general/Container/Container'
import LoginForm from './components/pages/login/LoginForm/LoginForm'
import Logo from './components/general/Logo/Logo'

export async function getServerSideProps(ctx) {
    const isAuthenticated = (req, cookieName) => {
        if (!req?.headers?.cookie) {
            return undefined;
        }

        const match = req.headers.cookie
            .split(';')
            .find((item) => item.trim().startsWith(`${cookieName}=`));

        if (!match) {
            return undefined;
        }

        return match.split('=')[1];
    };

    if (isAuthenticated(ctx.req, 'userName') && isAuthenticated(ctx.req, 'userAdminStatus')) {
        ctx.res.writeHead(303, { Location: '/' });
        ctx.res.end();
    }

    return { props: {} };
}

export default function Login() {
    return (
        <>
            <Head>
                <title>Login</title>
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
                custom_style={{ overflowY: 'scroll', background: "linear-gradient(45deg, var(--main-color) 50%, var(--bg-color) 50%)" }}
            >
                <LoginForm />
                <Container
                    container_type="fluid"
                    horizontal="middle"
                    vertical="middle"
                    margin={{ top: 4 }}
                >
                    <Logo />
                </Container>
            </Container>
        </>
    )
}
