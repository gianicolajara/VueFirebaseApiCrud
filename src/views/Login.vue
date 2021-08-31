<template lang="pug">
    div.login.container.mt-5
        h2 Login
        b-form(@submit.prevent="formProcess")
            b-form-group(id="email", label="Email", label-for="email", description="put your email")
                b-form-input( id="email", type="email", placeholder="Enter Email", v-model.trim="user.email")
            b-form-group(id="password", label="Password", label-for="password", description="put your password")
                b-form-input(id="password", type="password", placeholder="Enter password", v-model.trim="user.password")
            b-button(type="submit", :disabled="bloquearBoton") Login
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      user: {
        email: "gianicolajara@gmail.com",
        password: "123456789",
      },
    };
  },
  computed: {
    bloquearBoton() {
      if (!this.user.email.includes("@")) {
        return true;
      }
      if (this.user.password.length <= 6) {
        return true;
      }
      return false;
    },
  },
  methods: {
    ...mapActions(["loginUser"]),
    formProcess() {
      this.loginUser({ email: this.user.email, password: this.user.password });
      this.user.email = "";
      this.user.password = "";
    },
  },
};
</script>

<style lang="scss" scoped></style>
