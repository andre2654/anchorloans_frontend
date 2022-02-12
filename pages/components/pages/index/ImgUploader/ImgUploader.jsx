import React, { useState } from 'react';
import { notification } from 'antd';
import { FileAddFilled } from '@ant-design/icons'
import styles from './imgUploader.module.css'
import AWS from 'aws-sdk'
const { v4: uuidv4 } = require('uuid');

import api from '../../../../../services/api'

const S3_BUCKET = 'anchorloans';
const REGION = 'us-east-2';


AWS.config.update({
    accessKeyId: process.env.AWS_ACCESSKEY_ID,
    secretAccessKey: process.env.AWS_ACCESSKEY_KEY
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
})

export default function ImgUploader({ userName, userAdminStatus, onFinish }) {
    const [progress, setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const successNotification = () => {
        notification['success']({
            message: 'Success!',
            description: `Image ${selectedFile.name} added!`,
        });
    };

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = (file) => {
        const file_name = `${uuidv4()}.${file.name.split('.').pop()}`
        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: file_name
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err) {
                    console.log(err)
                } else {
                    const fileURL = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${file_name}`
                    api
                        .post('/api/img/add', {
                            uploadedBy: userName,
                            fileURL: fileURL,
                            adminUser: userAdminStatus
                        })
                        .then(result => {
                            successNotification()
                            onFinish()
                            console.log(result);
                        });
                }
            })
    }

    return (
        <div id={`${styles.submit_img_container}`} className='d-flex flex-column align-items-center justify-content-center p-4 rounded'>
            <FileAddFilled className={`${styles.submit_img_icon}`} />
            <input type="file" onChange={handleFileInput} className='container-fluid p-2' />
            <button id={`${styles.submit_img_container_submit_btn}`} className='container-fluid p-2 rounded' onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
            {
                progress > 0 && progress < 100 &&
                <div id={`${styles.submit_img_progressBar}`} style={{ width: `${progress}%` }} className='d-flex align-items-center justify-content-center mt-4 rounded'>
                    <span className='p-1 rounded'>{progress}%</span>
                </div>
            }

        </div>
    )

}