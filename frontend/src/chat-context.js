import { createContext, useReducer } from 'react';
import reducer, { initialState } from './store/authReducer';
export const ChatContext = createContext();

const Store = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <ChatContext.Provider value={{ state, dispatch }}>
            {props.children}
        </ChatContext.Provider>
    );
};

const withState = (Child) => (props) =>( 
    <ChatContext.Consumer>
        {(context) => <Child {...props} {...context} />}
    </ChatContext.Consumer>
);

export { Store, withState };