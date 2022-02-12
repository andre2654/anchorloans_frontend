import React from 'react';
import styles from './adminMessage.module.css'

export default function AdminMessage() {
    return (
        <div id={`${styles.admin_message_container}`} className='container-fluid d-flex align-items-center justify-content-center p-2'>
            <span id={`${styles.admin_message}`}>Beware, you are an admin, you are the only one who can approve new photos</span>
        </div>
    )
}