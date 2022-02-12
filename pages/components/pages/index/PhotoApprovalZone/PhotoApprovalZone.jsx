import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Image, Pagination } from 'antd';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import styles from './photoApprovalZone.module.css'

import api from '../../../../../services/api'

export default function PhotoApprovalZone({ imgs = [] }) {
    const router = useRouter();
    const [numImgEachPage, setNumImgEachPage] = useState(5)
    const [imgTotal, setImgTotal] = useState(imgs)
    const [imgMinAndMax, setImgMinAndMax] = useState({ minValue: 0, maxValue: 4 })

    const refreshData = () => {
        router.reload();
    }

    const handleChange = value => {
        setImgMinAndMax({
            minValue: (value - 1) * numImgEachPage,
            maxValue: value * numImgEachPage
        })
    };

    function approveImg(imgFile) {
        Swal.fire({
            title: 'Approve image',
            text: 'Do you really want to approve this image?',
            imageUrl: imgFile.fileURL,
            imageWidth: 400,
            imageHeight: 200,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            preConfirm: () => {
                const id = imgFile._id.$oid

                api
                    .post('/api/img/approve', {
                        id: id,
                    })
                    .then(result => {
                        console.log(result);
                    });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: 'success',
                    title: 'Approved image',
                }).then(() => {
                    refreshData()
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Image was not approved',
                })
            }
        })
    }

    function rejectImg(imgFile) {
        Swal.fire({
            title: 'Reject image',
            text: 'Do you really want to reject this image?',
            imageUrl: imgFile.fileURL,
            imageWidth: 400,
            imageHeight: 200,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            preConfirm: () => {
                const id = imgFile._id.$oid

                api
                    .post('/api/img/rejected', {
                        id: id,
                    })
                    .then(result => {
                        console.log(result);
                    });
            },
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: 'success',
                    title: 'Rejected image',
                }).then(() => {
                    refreshData()
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Image was not rejected',
                })
            }
        })
    }

    return (
        <div id={`${styles.photo_approval_zone_container}`} className='container-fluid d-flex flex-column align-items-center justify-content-center py-4'>
            <div className='container d-flex align-items-center justify-content-start'>
                <h4 id={`${styles.title}`} className='p-2'>Images awaiting approval <span className="ms-3 py-1 px-2 rounded">{imgTotal.length}</span></h4>
            </div>

            <div className='container d-flex flex-wrap align-items-center justify-content-center p-2'>
                {
                    imgTotal.length > 0 &&
                    imgTotal.slice(imgMinAndMax.minValue, imgMinAndMax.maxValue).map((imgFile, idx) => {
                        return (
                            <div key={idx} className={`${styles.photo_container} d-flex flex-column align-items-center justify-content-center m-2 p-2 rounded`}>
                                <Image
                                    width={200}
                                    className='rounded'
                                    src={imgFile.fileURL}
                                />
                                <p className={`${styles.desc} my-2 p-2`}>Sent by: {imgFile.uploadedBy}</p>
                                <div className='container-fluid d-flex align-items-start justify-content-center p-0'>
                                    <button className={`${styles.btn} ${styles.approve_btn} col me-1 p-2`} onClick={() => { approveImg(imgFile) }}>Approve</button>
                                    <button className={`${styles.btn} ${styles.reject_btn} col ms-1 p-2`} onClick={() => { rejectImg(imgFile) }}>Reject</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <Pagination defaultCurrent={1} total={imgTotal.length} showSizeChanger={false} onChange={handleChange} />
        </div >
    )
}