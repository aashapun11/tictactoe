import { useContext, useState , createContext} from "react";
const WinnerContext = createContext();

export const WinnerProvider = ({children}) => {
    const [winner, setWinner] = useState(null);
    const [isTie, setIsTie] = useState(false);
    return (
        <WinnerContext.Provider value={{winner, setWinner, isTie, setIsTie}}>
            {children}
        </WinnerContext.Provider>
    )
}

export const WinnerState = () => {
    const context = useContext(WinnerContext);
    return context
}