<template lang="pug">
    div.editar.container
        Input(v-if="task", :task="task", @submit="update")
        div(v-else)
            h2 Esta tarea no existe
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Input from "@/components/Input.vue";
export default {
  components: {
    Input,
  },
  data() {
    return {
      task: {
        type: Object,
        default: null,
      },
    };
  },
  methods: {
    ...mapActions(["updateTask"]),
    update() {
      this.updateTask(this.task);
      this.$router.push({ name: "Form" });
    },
  },
  computed: {
    ...mapGetters({
      myTask: "getTask",
    }),
  },
  created() {
    this.task = this.myTask(this.$route.params.id);
  },
};
</script>
