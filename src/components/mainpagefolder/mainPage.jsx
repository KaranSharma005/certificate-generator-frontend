import React, { useState,createContext} from 'react';
import styles from './styles.module.css';
import sendRequest from '../../assets/store';
import socket from '../../../socket';
export const UserContext = createContext();
import OutputArea from '../certificatearea/outputarea'

function MainPage() {
    const [excelFile, setExcelFile] = useState(null);
    const [wordFile, setWordFile] = useState(null);

    async function handleFileUpload() {
        if (!excelFile || !wordFile) {
            alert('Please select both files');
            return;
        }
        const formData = new FormData();
        formData.append('excelFile', excelFile);
        formData.append('wordFile', wordFile);
        formData.append('socketId', socket.id);

        const response = await sendRequest('/generateCertificate', 'POST', formData);

        if (response.error) {
            alert(response.message);
        }   
    }

    return (
        <div>
            <p className={styles.heading}>Welcome to the page. Generate Certificates by uploading files.</p>

            <div className={styles.container}>
                <p>Upload Excel file containing student details</p>
                <input
                    type="file"
                    onChange={(e) => setExcelFile(e.target.files[0])}
                    accept=".xlsx, .xls"
                    id='file1'
                />
                {/* <label htmlFor="file1">Click to select file</label> */}
            </div>

            <div className={styles.container}>
                <p>Upload file containing certificate format</p>
                <input
                    type="file"
                    onChange={(e) => setWordFile(e.target.files[0])}
                    accept=".docx, .doc"
                    id='file2'
                />
                {/* <label htmlFor="file2">Click to select file</label> */}
            </div>

            <div>
                <button onClick={handleFileUpload}>Click here to upload files</button>
            </div>

            <div>
                <OutputArea/>
            </div>
        </div>
    );
}

export default MainPage;
