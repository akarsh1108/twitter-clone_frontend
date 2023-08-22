import {io} from 'socket.io-client';
import React from 'react';
const Socket_URL ="http://localhost:5001"
export const socket = io(Socket_URL);
export const AppContext = React.createContext()