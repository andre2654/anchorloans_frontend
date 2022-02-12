import React from 'react';
import { BookFilled } from '@ant-design/icons'
import styles from './logo.module.css'

export default function Header() {
    return (
        <div id={`${styles.logo}`} className='d-flex align-items-center justify-content-center m-0'>
            <BookFilled />
            <p className='m-0'>MarriageBook</p>
        </div>
    )

}