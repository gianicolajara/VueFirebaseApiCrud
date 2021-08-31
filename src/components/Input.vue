<template lang="pug">
    div.input
        b-form(@submit.prevent="submit")
            b-form-group(id="input-group-1", label="Your Name:", label-for="input-1")
                b-form-input(id="input-1", placeholder="Enter Name", v-model.trim ="task.name", required)
            b-form-group(label="Options:", v-slot="{ ariaDescribedby }")
                b-form-checkbox-group(id="checkbox-group-1", v-model="task.selected", :options="options", :aria-describeby="ariaDescribedby", name="lenguaje")
            b-form-group(label="Urgencia" v-slot="{ ariaDescribedby }")
                b-form-radio(v-model="task.urgente", aria-describedby="ariaDescribedby", name="some-radios", value="si") Urgente
                b-form-radio(v-model="task.urgente", aria-describedby="ariaDescribedby", name="some-radios", value="no") No Urgente
            b-form-group
                label(for="input-2") Numero
                b-form-input(id="input-2", type="number", v-model.number="task.number")
            b-button(variant="success btn-block", type="submit", :disabled="desactivarBoton") Enviar
            p {{ task }}
</template>

<script>
export default {
  data() {
    return {
      options: [
        { text: "Javacript", value: "javascript" },
        { text: "C++", value: "c++" },
        { text: "C", value: "c" },
      ],
    };
  },
  props: {
    task: {
      type: Object,
      default: null,
    },
  },
  computed: {
    desactivarBoton() {
      return this.task.name.trim() === "" ? true : false;
    },
  },
  methods: {
    submit() {
      this.$emit("submit");
    },
  },
};
</script>
