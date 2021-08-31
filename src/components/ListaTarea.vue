<template lang="pug">
    div.lista-tarea(v-if="tasks.length > 0")
        b-table(striped responsive hover dark outlined :items="tasks", :fields="fields")
            template(#cell(selected) = "data")
              | {{data.value.join(', ')}}
            template(#cell(delete) = "data")
              b-button(variant="danger", @click="deleteTask(data.item.id)") Delete
            template(#cell(edit) = "data")
              b-button(variant="warning", @click="edit(data.item.id)") Edit

</template>

<script>
export default {
  props: {
    tasks: {
      type: Array,
      default: null,
    },
    fields: {
      type: Array,
      default: null,
    },
  },
  methods: {
    deleteTask(id) {
      this.$emit("delete", id);
    },
    edit(id) {
      this.$router.push({ name: "Editar", params: { id: id } });
    },
  },
};
</script>

<style lang="scss" scoped></style>
