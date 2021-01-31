import React, { useState } from 'react';
import { fileUpload } from '../uploadFiles';


const RoomPage = ({ room }) => {

    const [file, setFile] = useState(null);
    const [fileError, setFileError] = useState(null);
    
  
    const handleFormChange = e => {
        setFile(e.target.files[0]);
        setFileError(null);
    }
  
    const handleSubmitFile = async () => {
      setFileError(null);
        if(file) {
            let res = await fileUpload(file, `${room}-${file.name}`);
            console.log(res);
        } else {
          setFileError('You haven\'t added a file!');
        }
    }
    return(
        <div className = 'roomPage'>
            <p>Room: {room}</p>
            
            <input type="file" id="myFile" name="filename" onChange = {handleFormChange}></input>
            <button onClick = {handleSubmitFile}>idek man</button>

            {
                fileError &&
                <p>{fileError}</p>
            }
        </div>
    );
};

export default RoomPage