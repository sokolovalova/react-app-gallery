export const setToLocalStorage = (key, data)=>{
    window.localStorage.setItem(key, data);
};
export const getLocalStorage = (key)=>{
   return window.localStorage.getItem(key);
};

export  const  Storage_KEY = "FAVOR";