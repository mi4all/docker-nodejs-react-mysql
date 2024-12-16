import {  createContext,useEffect,useState } from "react";
export const Parametre = createContext ()
 export const ParamProvider = ({children}) =>{
   const [Parametrevisible1, setParametrevisible1] = useState(false);

    useEffect(()=>{
        const storedState = localStorage.getItem('Parametrevisible1')
        if (storedState) {
          setParametrevisible1(JSON.parse(storedState))
        }
      },[])
    
      const showParametre1 = () =>{
        setParametrevisible1(true);
        localStorage.setItem('Parametrevisible1',true)
      }
      const hideParametre1 = () =>{
        setParametrevisible1(false);
        localStorage.setItem('Parametrevisible1',false)
      }

      return (
        <Parametre.Provider value={{Parametrevisible1, showParametre1,hideParametre1}}>
            {children}
        </Parametre.Provider>
      )
}

