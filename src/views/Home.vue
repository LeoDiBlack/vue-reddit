<template lang="html">
  <div class="container mx-auto">
    <div class="flex flex-wrap -mx-2 overflow-hidden sm:-mx-2">
      <div class="flex flex-wrap w-4/12 overflow-hidden">
        <div class="w-full overflow-hidden">
          <PostPreview
            v-for="post in posts"
            :key="post.data.id"
            @update="onPostSelection"
            :post="post.data"
          />
        </div>
      </div>
      <div class="flex flex-wrap w-8/12 overflow-hidden">
        <div class="w-full overflow-hidden">
          <Post :post="selectedPost"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Api from '@/services/Api';
import PostPreview from '@/components/PostPreview';
import Post from '@/components/Post';

export default {
  name: 'home',
  components: { PostPreview, Post },
  data() {
    return {
      posts: null,
      selectedPost: null,
    };
  },
  mounted() {
    Api().get('top.json')
      .then((response) => {
        this.posts = response.data.data.children;
      });
  },
  methods: {
    onPostSelection: function(selectedPost) {
      this.selectedPost = selectedPost;
    },
  },
};
</script>

<style lang="css"></style>
