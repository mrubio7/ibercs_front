import { createContext, useEffect, useState } from "react";

const Context = createContext({
    Lang: "",
    User: {},
    setLang: () => {},
    setUser: () => {},
});

export const ContextProvider = ({children}) => {
    const [obj, setObj] = useState({
        Lang: localStorage.getItem("Lang") ? localStorage.getItem("Lang") : "ES",
        User: {},
    });

    const setLang = (lang) => {
        setObj((prevObj) => ({ ...prevObj, Lang: lang }));
        localStorage.setItem("Lang", lang);
    };

    const setUser = (user) => {
        setObj((prevObj) => ({ ...prevObj, User: user }));
    }    

    return (
        <Context.Provider value={{ ...obj, setLang, setUser }}>
            {children}
        </Context.Provider>
    );
};

export default Context;