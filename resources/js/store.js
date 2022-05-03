import { last } from "lodash";

export default {    
    
    methods: {
        addZ: (n) => n<10? '0'+n:''+n
    },
    state: {
        lastSearch: {
            // today: new Date(),this.today.getYear() + "-" + this.today.getMonth() + "-" + this.today.getDay(),
            from: null,
            to: null,
        }
    },
    mutations: {
        setLastSearch(state, payload){
            state.lastSearch = payload;
        },
        setFromToday(state){
            const today = new Date();
            state.lastSearch.from = today.toISOString().split('T')[0];
        }
    },
    actions: {
        setLastSearch(context, payload){
            context.commit('setLastSearch', payload);
            localStorage.setItem('lastSearch', JSON.stringify(payload));
        },
        loadStoredState(context){
            const lastSearch = localStorage.getItem('lastSearch');
            if(lastSearch){
                context.commit('setLastSearch', JSON.parse(lastSearch));
            }
        }
    }

};