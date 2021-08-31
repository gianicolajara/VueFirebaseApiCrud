<template lang="pug">
    div
        b-navbar(toggleable="lg" type="dark" variant="dark")
            b-navbar-brand(href="#") Practica UDEMY
            b-navbar-toggle(target="nav-collapse")
            b-collapse#nav-collapse(is-nav)
                b-navbar-nav
                    b-nav-item(to="/") Inicio
                    b-nav-item(to="/about") About
                    b-nav-item(to="/form", v-if="userAuth") Form
                    b-nav-item(to="/login" v-if="!userAuth") Login
                    b-nav-item(to="/register" v-if="!userAuth") Register
                b-navbar-nav.ml-auto
                    b-button(v-if="userAuth", @click="logout") Log Out
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["userAuth"]),
  },
  methods: {
    ...mapActions(["logout"]),
  },
};
</script>

<style scoped></style>
