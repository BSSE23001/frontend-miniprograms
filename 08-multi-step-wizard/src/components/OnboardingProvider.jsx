import { createContext, useReducer, useEffect, useContext } from "react";

const initialState = {
    profile: {name: '', age: '', email:''},
    finances: {income: 3000, expenses: 1500},
    goals: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_PROFILE':
            return {...state, profile: action.payload};
        case 'SET_FINANCES':
            return {...state, finances: action.payload};
        case 'SET_GOALS':
            return {...state, goals: action.payload};
        case 'RESET':
            return initialState;
        default:
            return state;
    }
};

const OnboardingContext = createContext();
const OnboardingDispatchContext = createContext();

export const OnboardingProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(reducer,initialState,(init) => {
        const saved = localStorage.getItem('onboarding');
        return saved ? JSON.parse(saved) : init;
    });

    useEffect(()=> {
        localStorage.setItem('onboarding', JSON.stringify(state));
    },[state]);

    return (
        <OnboardingContext.Provider value={state}>
            <OnboardingDispatchContext.Provider value={dispatch}>
                {children}
            </OnboardingDispatchContext.Provider>
        </OnboardingContext.Provider>
    );
}

export const useOnboarding = () => useContext(OnboardingContext);
export const useOnboardingDispatch = () => useContext(OnboardingDispatchContext);