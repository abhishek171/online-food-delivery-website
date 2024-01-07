import {initialState,addToCartReducerFunction} from '../reducer/addtocartreducer'
import {createContext , useReducer} from "react";


export const addToCartContext = createContext();
const AddToCartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(addToCartReducerFunction, initialState);

    return (
      <addToCartContext.Provider value={{ state, dispatch }}>
        {children}
      </addToCartContext.Provider>
    );
  };
  export default AddToCartProvider;