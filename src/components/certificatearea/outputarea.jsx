import styles from './styles.module.css'
import React,{useEffect,useState} from 'react';
import socket from '../../../socket';
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

    return (
        <div className={styles.output}>
          <ul className={styles.certList}>
            {certificates?.map((cert, index) => (
              <li key={index} className={styles.certItem}>
                <span className={styles.certName}>{cert.name}</span>
                <a href={cert.url} className={styles.downloadLink}>
                  Download Certificate
                </a>
              </li>
            ))}
          </ul>
        </div>
      );
      
}
export default OutputArea;