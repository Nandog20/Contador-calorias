import type { Activity } from "../types"

export type ActivityActions = 
    {type: 'saveActivity', payload: {newActivity: Activity} } |
    {type: 'setActiveID', payload: {id: Activity['id']} } |
    { type: 'deleteActivity', payload: {id: Activity['id']}  } |
    { type: 'restart-app' }
    
export type ActivityState = {
    activities: Activity[],
    activeID: Activity['id']
}

const localStorageActivities = (): Activity[] =>{
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeID: ''
}

export const activityReducer =(

    state: ActivityState = initialState, 
    action: ActivityActions 

) => {
    if(action.type === 'saveActivity'){
        //maneja la lógica para actualizar el state

        let updatedActivities: Activity[] = []

        if(state.activeID){
            updatedActivities = state.activities.map( activity => activity.id === state.activeID ? action.payload.newActivity : activity)
        } else{
            updatedActivities = [...state.activities, action.payload.newActivity]
        }

        return{
            ...state,
            activities: updatedActivities,
            activeID: ''
        }
    }
    
    if(action.type === 'setActiveID'){
        return {
            ...state,
            activeID: action.payload.id
        }
    }

    if(action.type === 'deleteActivity'){
        return{
            ...state,
            activities: state.activities.filter(activity => activity.id !== action.payload.id)
        }
    }

    if(action.type === 'restart-app'){
        return{
            activities: [],
            activeID: ''
        }
    }

    return state
}