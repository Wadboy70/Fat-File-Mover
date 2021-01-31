import React, { useEffect, useState, useContext } from 'react';
import { downloadFile, fileUpload } from '../uploadFiles';
import { subscribeToFileUpdates, WebSocketContext } from '../../socketContext';
import './RoomPage.css';


const RoomPage = ({ room }) => {

    const [file, setFile] = useState(null);
    const [fileError, setFileError] = useState(null);
    const [fileList, setFileList] = useState([]);
    const socket = useContext(WebSocketContext);
    
    useEffect(()=>{
        subscribeToFileUpdates(setFileList)
    }, [setFileList])
    
    const handleFormChange = e => {
        setFile(e.target.files[0]);
        setFileError(null);
    }
  
    const handleSubmitFile = async () => {
        //needs to upload files and then send a mesage to the websockets with the fileurl
        setFileError(null);
        try {
            const path = `${room}-${file.name}`;
            const fileInfo = await fileUpload(file, path);
            console.log(fileInfo);
            const dlUrl = await downloadFile(path);
            console.log(dlUrl)
            socket.emit('add file', dlUrl, room);
            
        } catch (error) {
            setFileError('error occured');

        }
    }
    return(
        <div className = 'roomPage'>
            <p>Room: {room}</p>
            <form onSubmit = {e => e.preventDefault()}>
                <input type="file" id="myFile" name="filename" onChange = {handleFormChange}></input>
                <button onClick = {handleSubmitFile}>idek man</button>
            </form>

            {
                fileError &&
                <p>{fileError}</p>
            }
            <ul className = 'folder'>
                {
                    fileList &&
                    fileList.map((fileEntry, i) => (
                        <li key = {i} className = 'file'>
                            <a href={fileEntry}>
                                <span>File {i+1}</span>
                                <span>{fileEntry}</span>
                            </a>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default RoomPage