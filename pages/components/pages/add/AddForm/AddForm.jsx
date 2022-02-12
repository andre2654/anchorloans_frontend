import React, { useState, useEffect } from 'react'
import { Input, Select, notification } from 'antd';
const { Option } = Select;

import styles from './addForm.module.css'

import { UserOutlined } from '@ant-design/icons'

import api from '../../../../../services/api'

export default function addForm() {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [admin, setAdmin] = useState(false)

    useEffect(() => {
        console.log("Add Debug:")
        console.log(`username: ${username}`)
        console.log(`passoword: ${password}`)
        console.log(`admin: ${admin}`)
    }, [username, password, admin])

    const submit = () => {
        api
            .post('/api/user/add', {
                name: username,
                password: password,
                admin: admin
            })
            .then(result => {
                console.log(result);
                if (result.data.message != 'ok') {
                    errorNotification(result.data.message)
                } else {
                    successNotification()
                }
            });
    }

    const successNotification = () => {
        notification['success']({
            message: 'Success!',
            description: `User ${username} added!`,
        });
    };

    const errorNotification = (message) => {
        notification['error']({
            message: 'Error!',
            description: `${message}`,
        });
    };

    return (
        <div id={`${styles.add_form_container}`} className='p-3 rounded'>
            <div className='container-fluid mb-4'>
                <h2 id={`${styles.add_form_title}`} className='m-0'>Add user</h2>
            </div>
            <div className={`${styles.add_form_input_container} container-fluid my-3`}>
                <small>Username:</small>
                <Input size="large" addonBefore={<UserOutlined />} onChange={(event) => { setUsername(event.target.value) }} />
            </div>
            <div className={`${styles.add_form_input_container} container-fluid my-3`}>
                <small>Password:</small>
                <Input.Password size="large" onChange={(event) => { setPassword(event.target.value) }} />
            </div>
            <div className={`${styles.add_form_input_container} container-fluid my-3`}>
                <small>Admin:</small>
                <Select
                    size="large"
                    onSelect={(value, event) => { setAdmin(value) }}
                    value={admin}
                    style={{
                        width: '100%'
                    }}>
                    <Option value={false}>No</Option>
                    <Option value={true}>Yes</Option>
                </Select>
            </div>
            <div className='container-fluid mt-5'>
                <button id={`${styles.add_form_submit}`} className='container-fluid p-2 rounded' onClick={() => { submit() }}>Add new user</button>
            </div>
        </div>
    )
}
