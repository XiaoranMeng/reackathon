import { createContext, useContext } from 'react';
import TeamStore from './teamStore';

// An interface that specifies a collection of stores
interface Store {
    teamStore: TeamStore;
}

// A store resigtry that instantiates the stores specified in Store interface
export const store: Store = {
    teamStore: new TeamStore()
}

// A store context that uses the specified store registry
export const StoreContext = createContext(store);

// A hook that returns the store registry used by the specified store context
export const useStore = () => {
    return useContext(StoreContext);
}