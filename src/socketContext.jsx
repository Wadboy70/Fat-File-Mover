import React, { createContext } from 'react';
import { io } from "socket.io-client";

export const WebSocketContext = createContext(null);

const socket = io("https://fat-file-transfer.ue.r.appspot.com");


socket.on("files", files => {
    console.log('got files')
    console.log(files)
});

export const subscribeToFileUpdates = (func) => {
    socket.on('update', files =>{
        console.log('sent files')
        return func(files);
    })
}

export const disconnectFromSocket = (func) => {
    socket?.disconnect();
}

export const WebSocketProvider = ({children}) => {
    return (
        <WebSocketContext.Provider value = { socket }>
            {children}
        </WebSocketContext.Provider>
    );
};