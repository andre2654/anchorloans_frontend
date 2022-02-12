import React, { useState } from 'react';
import { Image } from 'antd';
import styles from './photoZone.module.css'

export default function PhotoApprovalZone({ userName, imgs = [] }) {
    const [imgTotal, setImgTotal] = useState(imgs)

    return (
        <div id={`${styles.photo_zone_container}`} className='container-fluid d-flex flex-column align-items-center justify-content-center py-4'>
            <div className='container d-flex align-items-center justify-content-center'>
                <h4 id={`${styles.title}`} className='p-2'>Images</h4>
            </div>

            <div className='container d-flex flex-wrap align-items-center justify-content-center p-2'>
                {
                    imgTotal.length > 0 &&
                    imgTotal.map((imgFile, idx) => {
                        return (
                            <div key={idx} className={`${styles.photo_container} d-flex flex-column align-items-center justify-content-center m-2 rounded`}>
                                <Image
                                    width={200}
                                    className='rounded'
                                    src={imgFile.fileURL}
                                />
                                <p className={`${styles.author} py-1 px-2 rounded`}>Sent by: {userName == imgFile.uploadedBy ? 'you' : imgFile.uploadedBy}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}