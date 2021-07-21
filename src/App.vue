<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="!$route.meta.isHidden"></Footer>
    <!-- $route里面有meta属性,默认为空,当跳转至login和register时变为true -->
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    this.getCategory();
  },
  methods: {
    getCategory() {
      this.$store.dispatch("getCategory");
    },
  },
};
</script>

<style></style>
