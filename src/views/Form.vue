<template lang="pug">
    div.form.container
        Input(:task="task", @submit="procesarFormulario")
        ListaTarea(v-if="tasks" :tasks="tasks", :fields="fields", @delete="deteleTareas")
</template>

<script>
import Input from "@/components/Input.vue";
import { mapActions, mapState } from "vuex";
import { nanoid } from "nanoid";
import ListaTarea from "@/components/ListaTarea.vue";

export default {
  name: "Form",
  components: {
    Input,
    ListaTarea,
  },
  data() {
    return {
      task: {
        id: "",
        name: "",
        selected: [],
        urgente: "",
        number: 0,
      },
      fields: [
        { key: "id", label: "id" },
        { key: "name", label: "name" },
        { key: "selected", label: "selected" },
        { key: "urgente", label: "urgente" },
        { key: "number", label: "number" },
        { key: "delete", label: "delete" },
        { key: "edit", label: "edit" },
      ],
    };
  },
  computed: {
    ...mapState(["tasks"]),
  },
  methods: {
    ...mapActions(["setTareas", "deteleTareas", "cargarFirebase"]),
    procesarFormulario() {
      if (this.task.name.trim() === "") {
        console.log("campo vacio");
        return;
      }
      this.generarIdFormulario();
      this.setTareas(this.task);
      this.limpiarFormulario();
    },
    generarIdFormulario() {
      this.task.id = nanoid();
    },
    limpiarFormulario() {
      this.task = {
        id: "",
        name: "",
        selected: [],
        urgente: "",
        number: 0,
      };
    },
  },
  created() {
    this.cargarFirebase();
  },
};
</script>

<style scoped></style>
