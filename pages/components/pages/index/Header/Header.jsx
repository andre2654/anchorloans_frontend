import React from 'react';
import { useRouter } from 'next/router';
import Logo from '../../../general/Logo/Logo'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import withReactContent from 'sweetalert2-react-content'
import ImgUploader from '../ImgUploader/ImgUploader'
import styles from './header.module.css'

import Cookies from 'js-cookie'

export default function Header({ userName, userAdminStatus }) {
    const router = useRouter();

    const refreshData = () => {
        router.reload();
    }

    const uploadImg = () => {
        const MySwal = withReactContent(Swal)

        MySwal.fire({
            html: <ImgUploader userName={userName} userAdminStatus={userAdminStatus} onFinish={() => { refreshData() }} />,
            showConfirmButton: false
        })
    }

    const logout = () => {
        Cookies.remove('userName')
        Cookies.remove('userAdminStatus')
        refreshData()
    }

    return (
        <div id={`${styles.header}`} className='container-fluid d-flex align-items-center justify-content-around p-2'>
            <Logo />
            <p id={`${styles.username}`} className='m-0'>Hi, {userName}</p>
            <div>
                <button id={`${styles.header_upload_btn}`} className='py-2 px-4 me-1 rounded' onClick={() => { uploadImg() }}>Upload Image</button>
                <button id={`${styles.header_exit_btn}`} className='py-2 px-4 ms-1 rounded' onClick={() => { logout() }}>Logout</button>
            </div>
        </div>
    )
}