import React, { createContext } from 'react';
import { io } from "socket.io-client";

export const WebSocketContext = createContext(null);

const socket = io(process.env.NODE_ENV === "development" ? 'http://localhost:8080' : "https://fat-file-transfer.ue.r.appspot.com", {
    withCredentials: true
});

socket.on("files", files => {
    console.log('got files')
    console.log(files)
})
export const WebSocketProvider = ({children}) => {
    return (
        <WebSocketContext.Provider value = { socket }>
            {children}
        </WebSocketContext.Provider>
    );
};