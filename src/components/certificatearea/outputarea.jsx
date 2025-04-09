import styles from './styles.module.css'
import React,{useEffect,useState} from 'react';
import socket from '../../../socket';
import { saveAs } from 'file-saver';
function OutputArea(){
    const [certificates, setCertificates] = useState([]);

    useEffect(() => {
        socket.on('certificate-progress', (data) => {
            setCertificates((prev) => [
                ...prev,
                { name: data.name, url: data.url }
            ]);
        });
        return () => {
            socket.off('certificate-progress');
        };
    }, []);

    const handleDownload = async (path, name) => {
        // console.log("1",path);
      try {
        const response = await fetch(path, {
        method: 'GET', 
        });
        // console.log("response",response.status);
        if (!response.ok) {
          throw new Error('Network error');
        }
        const blob = await response.blob();
        saveAs(blob, name);
      }
      catch(error) 
      {
        console.error('Download failed:', error);
      }
    };

    function handleAllDownloads(){
      certificates.forEach((certificate) => {
        handleDownload(certificate.url, certificate.name);
      });
    }

    return (
        <div className={styles.output}>
          <ul className={styles.certList}>
            {certificates?.map((cert, index) => (
              <li key={index} className={styles.certItem}>
                <span className={styles.certName}>{cert.name}</span>
                <a href={cert.url} className={styles.downloadLink} target ="_blank">
                  View Certificate
                </a>
                <button onClick= {() => handleDownload(cert.url,cert.name)}>Download Certificate</button>
              </li>
            ))}
          </ul>
          <button onClick={handleAllDownloads}>Download all</button>
        </div>
      );
      
}
export default OutputArea;