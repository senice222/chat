import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
import { ModalContextProvider } from './context/ModalContext'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ModalContextProvider>
        <AuthContextProvider>
            <ChatContextProvider>
                    <App />
            </ChatContextProvider>
        </AuthContextProvider>
    </ModalContextProvider>
    
);
