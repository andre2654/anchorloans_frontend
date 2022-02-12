import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { Input, notification } from 'antd';
import styles from './loginForm.module.css'

import { UserOutlined } from '@ant-design/icons'

import api from '../../../../../services/api'
import Cookies from 'js-cookie'

export default function LoginForm() {
    const router = useRouter();
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    useEffect(() => {
        console.log("Login Debug:")
        console.log(`username: ${username}`)
        console.log(`passoword: ${password}`)
    }, [username, password])

    const openNotificationUserFound = () => {
        notification['success']({
            message: 'Success!',
            description: `User ${username} founded!`,
        });
    };

    const openNotificationUserNotFound = () => {
        notification['error']({
            message: 'Error!',
            description: `User ${username} not found!`,
        });
    };

    const refreshData = () => {
        router.replace(router.asPath);
    }

    const submit = () => {
        api
            .get('/api/user/view', {
                params: {
                    name: username,
                    password: password
                }
            })
            .then(result => {
                if (result.data.response === null) {
                    openNotificationUserNotFound()
                    console.log(result);
                } else {
                    openNotificationUserFound()
                    // Delete password
                    delete result.data.response.password
                    console.log(result);

                    // Set in cookies
                    Cookies.set('userName', result.data.response.name)
                    Cookies.set('userAdminStatus', result.data.response.admin)

                    // Refresh
                    refreshData()
                }
            });
    }


    return (
        <div id={`${styles.login_form_container}`} className='p-3 rounded'>
            <div className='container-fluid mb-4'>
                <h2 id={`${styles.login_form_title}`} className='m-0'>Login</h2>
            </div>
            <div className={`${styles.login_form_input_container} container-fluid my-3`}>
                <small>Username:</small>
                <Input size="large" addonBefore={<UserOutlined />} onChange={(event) => { setUsername(event.target.value) }} />
            </div>
            <div className={`${styles.login_form_input_container} container-fluid my-3`}>
                <small>Password:</small>
                <Input.Password size="large" onChange={(event) => { setPassword(event.target.value) }} />
            </div>
            <div className='container-fluid mt-5'>
                <button id={`${styles.login_form_submit}`} className='container-fluid p-2 rounded' onClick={() => { submit() }}>Submit</button>
            </div>
        </div>
    )
}
