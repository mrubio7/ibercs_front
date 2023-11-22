import { createContext, useEffect, useState } from "react";
import { lightTheme } from "../utils/const";

const Context = createContext({
    Lang: "",
    setLang: () => {},
});

export const ContextProvider = ({children}) => {
    const [obj, setObj] = useState({
        Lang: localStorage.getItem("Lang") ? localStorage.getItem("Lang") : "ES",
        setLang: () => {},
    });

    useEffect(() => {
        
    }, [obj]);

    const setLang = (lang) => {
        setObj((prevObj) => ({ ...prevObj, Lang: lang }));
        localStorage.setItem("Lang", lang);
    };

    return (
        <Context.Provider value={{ ...obj, setLang }}>
            {children}
        </Context.Provider>
    );
};

export default Context;