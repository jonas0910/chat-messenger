import React from 'react';
import { ReactNode } from 'react';

interface EventBusContextType {
    emit: (name: string, data: {}) => void;
    on: (name: string, callback: Function) => () => void;
}

interface EventBusProviderProps {
    children: ReactNode;
}

export const EventBusContext = React.createContext<EventBusContextType>({
    emit: () => {},
    on: () => () => {},
});

export const EventBusProvider = ({children}: EventBusProviderProps ) => {
    const [events, setEvents] = React.useState<{ [key: string]: Function[] }>({});

    const emit = (name: string , data: {}) => {
        if(events[name]) {
            events[name].forEach(callback => callback(data));
        }
    };

    const on = (name: string, callback: Function) => {
        if(!events[name]) {
            events[name] = [];
        }
        events[name].push(callback);

        return () => {
            events[name] = events[name].filter(cb => cb !== callback);
        }
    };

    return (
        <EventBusContext.Provider value={{ emit, on }}>
            {children}
        </EventBusContext.Provider>
    );
}

export const useEventBus = () => {
    return React.useContext(EventBusContext);
}