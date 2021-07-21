<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>

    <Floor v-for="(f, index) in getFloor" :key="index" :floor="f"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from "./ListContainer";
import Recommend from "./Recommend";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";

import { mapState } from "vuex";
export default {
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    this.getFloorList();
  },
  computed: {
    ...mapState({
      getFloor: (state) => state.home.floorList,
    }),
  },
  methods: {
    getFloorList() {
      this.$store.dispatch("getFloor");
    },
  },
};
</script>

<style></style>
