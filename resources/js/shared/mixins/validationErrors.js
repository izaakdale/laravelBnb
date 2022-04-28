export default {
    data(){
        return {
            loading: false,
            errors : null
        }
    },
    methods: {
        errorFor(field){
            return null !== this.errors && this.errors[field] ? this.errors[field] : null;
        },
    }

}