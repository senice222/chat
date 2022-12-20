import {createContext, useState} from "react";

export const ModalContext = createContext()

export const ModalContextProvider = ({children}) => {
    const [active, setActive] = useState(false);

    return (
        <ModalContext.Provider value={{active, setActive}}>
            {children}
        </ModalContext.Provider>
    )
}