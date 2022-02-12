import React from 'react';
import Head from 'next/head'
import Container from './components/general/Container/Container'
import AdminMessage from './components/pages/index/AdminMessage/AdminMessage'
import Header from './components/pages/index/Header/Header'
import PhotoApprovalZone from './components/pages/index/PhotoApprovalZone/PhotoApprovalZone'
import PhotoZone from './components/pages/index/PhotoZone/PhotoZone'

import api from '../services/api'

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

  const userName = isAuthenticated(ctx.req, 'userName')
  const userAdminStatus = isAuthenticated(ctx.req, 'userAdminStatus')

  if (!userName || !userAdminStatus) {
    ctx.res.writeHead(303, { Location: '/login' });
    ctx.res.end();

    return { props: {} };
  }

  const imgs = await api.get('/api/img/view')

  return { props: { userName: userName, userAdminStatus: userAdminStatus, imgs: imgs.data.response } };
}

export default function Index({ userName, userAdminStatus, imgs }) {
  return (
    <>
      <Head>
        <title>MarriageBook</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container
        min_height="100vh"
        height="100vh"
        container_type="fluid"
        horizontal="start"
        vertical="start"
        flex_direction={{
          sm: 'column',
          md: 'column',
          lg: 'column',
          xl: 'column',
        }}
        hide_scrollbar
        custom_style={{ overflowX: 'scroll' }}
      >
        {
          userAdminStatus == 'true' && <AdminMessage />
        }
        <Header userName={userName} userAdminStatus={userAdminStatus} />
        {
          userAdminStatus == 'true' && <PhotoApprovalZone imgs={imgs.filter(obj => !obj.approvedStatus)} />
        }
        <PhotoZone userName={userName} imgs={imgs.filter(obj => obj.approvedStatus)} />
      </Container>
    </>
  )

}