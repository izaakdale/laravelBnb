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
        },
        basket: {
            items : []
        }
    },
    mutations: {
        setLastSearch(state, payload){
            state.lastSearch = payload;
        },
        setFromToday(state){
            const today = new Date();
            state.lastSearch.from = today.toISOString().split('T')[0];
        },
        addToBasket(state, payload){
            state.basket.items.push(payload);
        },
        removeFromBasket(state, payload){
            state.basket.items = state.basket.items.filter(item=> item.bookable.id !== payload);
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
    },
    getters: {
        itemsInBasket: (state) => state.basket.items.length,
        inBasket(state) {
            return function(id){
                return state.basket.items.reduce(
                    (result, item) => result || item.bookable.id === id,
                    false
                )
            }
        }
    }

};