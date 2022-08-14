import React, { createContext, useContext, useReducer } from  'react';

export const DataLayerContext = createContext();

export const useDataLayerContext = () => {
    return useContext(DataLayerContext);
}

export const DataLayerProvider = ({initialState, reducer, children}) => {
    return (
    <DataLayerContext.Provider value = {useReducer(reducer, initialState)}>
        {children}
    </DataLayerContext.Provider>
    )
}