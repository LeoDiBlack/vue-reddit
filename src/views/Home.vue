<template lang="html">
  <div class="home container">
    <h1>Recent Posts</h1>
    <PostPreview v-for="post in posts" :key="post.id" :post="post">
      {{ post.title }}
    </PostPreview>

    <CreateButton></CreateButton>
  </div>
</template>

<script>
import PostPreview from '@/components/PostPreview';
import CreateButton from '@/components/CreateButton';

export default {
  name: 'home',

  components: { PostPreview, CreateButton },

  data() {
    return {
      posts: null,
    };
  },

  mounted() {},
};
</script>

<style lang="css"></style>
