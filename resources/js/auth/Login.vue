<template>
    <div class="w-50 m-auto">
        <div class="card card-body">
            <form action="">
                <div class="form-group">
                    <label for="email">E-mail</label>
                    <input 
                    type="text" 
                    name="email" 
                    placeholder="Enter your email"
                    class="form-control"
                    v-model="email"
                    :class="[{'is-invalid': errorFor('email')}]"
                    >
                    <v-errors :errors="errorFor('email')"></v-errors>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input 
                    type="password" 
                    name="password" 
                    placeholder="Enter your password"
                    class="form-control"
                    v-model="password"
                    :class="[{'is-invalid': errorFor('password')}]"
                    >
                    <v-errors :errors="errorFor('password')"></v-errors>
                </div>
                <button type="submit" class="btn btn-secondary col-md-12 mt-3" :disabled="loading" @click="login">Login</button>

                <hr>

                
                <div>
                    No account?
                    <router-link :to="{name: 'Home'}" class="font-weight-bold">Register</router-link>
                </div>
                <div>
                    Forgotten Password?
                    <router-link :to="{name: 'Home'}" class="font-weight-bold">Reset</router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import validationErrors from '../shared/mixins/validationErrors'
import { utilLogin, utilLogout } from "../shared/utils/auth";
export default {
    mixins : [validationErrors],
    data() {
        return {
            email: null,
            password: null,
            loading: false,
        }
    },
    methods : {
        async login() {
            this.loading = true;
            this.errors = null;

            try {
                
                await axios.get('/sanctum/csrf-cookie');
                await axios.post('/login', {
                    email: this.email,
                    password: this.password,
                });
                
                utilLogin();
                this.$store.dispatch("loadUser");
                this.$router.push({name: "Home"});

            } catch (error) {
                this.errors = error.response && error.response.data.errors
            }

            this.loading = false;
        }
    }
}
</script>