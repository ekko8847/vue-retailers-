<template>
  <div>
    <div>search</div>
    <div>---{{ this.$route.params.keyword }}</div>
    <div>---{{ this.$route.query.keyword1 }}</div>
  </div>
</template>

<script>
export default {
  name: "Search",
};
</script>

<style></style>
