
export const loadState = () => {
    try {
        const serializeData = localStorage.getItem('guest');
        if (serializeData === null){
            return undefined;
        }
        return JSON.parse(serializeData);
    } catch(error){
        return undefined;
    }
};

export const saveState = (prod) => {
    try{
        let serializeData = JSON.stringify(prod);
        localStorage.setItem('guest', serializeData);
    }
    catch(error){
        console.log('No se pudo guardar en el localstorage')
    }
}

export const loadStateAdmin = () => {
    try {
        const serializeUser = localStorage.getItem('userInfo');
        if (serializeUser === null){
            return undefined;
        }
        return JSON.parse(serializeUser);
    } catch(error){
        return undefined;
    }
};

export const loadConfigAdmin = () => {
    try {
        const serializeUser = localStorage.getItem('appConfig');
        if (serializeUser === null){
            return undefined;
        }
        return JSON.parse(serializeUser);
    } catch(error){
        return undefined;
    }
};