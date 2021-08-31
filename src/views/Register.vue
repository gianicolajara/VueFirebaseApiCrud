<template lang="pug">
    div.register.container.mt-5
        h2 Registrar Usuario
        b-form(@submit.prevent="formProcess")
            b-form-group(id="email", label="Email", label-for="email", description="put your email")
                b-form-input( id="email", type="email", placeholder="Enter Email", v-model.trim="user.email")
            b-form-group(id="password", label="Password", label-for="password", description="put your password")
                b-form-input(id="password", type="password", placeholder="Enter password", v-model.trim="user.pass1")
            b-form-group(id="repeat-password", label="Repeat Passowrd", label-for="repeat-password", description="Repeat your")
                b-form-input(id="repeat-password", type="password", placeholder="Repeat Your Password", v-model.trim="user.pass2")
            b-button(type="submit", :disabled="bloquearBoton") Registrar
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      user: {
        email: "gianicolajara@gmail.com",
        pass1: "123456789",
        pass2: "123456789",
      },
    };
  },
  computed: {
    bloquearBoton() {
      if (!this.user.email.includes("@")) {
        return true;
      }
      if (this.user.pass1.length <= 6) {
        return true;
      }
      if (this.user.pass1 !== this.user.pass2) {
        return true;
      }
      return false;
    },
  },
  methods: {
    ...mapActions(["registerUser"]),
    formProcess() {
      this.registerUser({ email: this.user.email, password: this.user.pass1 });
      this.user.email = "";
      this.user.pass1 = "";
      this.user.pass2 = "";
    },
  },
};
</script>

<style scoped></style>
