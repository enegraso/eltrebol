
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