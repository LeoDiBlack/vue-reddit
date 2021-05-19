<template lang="html">
  <div v-if="post" class="flex justify-center my-4">
    <div style="width: 350px;">
      <h2 class="text-black leading-none my-4">Posted By: {{ post.data.author }} </h2>
      <a :href="post.data.url" target="_blank">
        <img :src="postImage" class="rounded-lg shadow-xl mb-4" alt="">
      </a>
      <div class="text-center">
        <h5 class="text-xl font-semibold mb-2">{{ post.data.title }}</h5>
        <p class="mb-4">{{ post.data.selftext }}</p>
      </div>
  </div>
  </div>
</template>

<script>
const redditImage = 'https://external-preview.redd.it/iDdntscPf-nfWKqzHRGFmhVxZm4hZgaKe5oyFws-yzA.png?auto=webp&s=38648ef0dc2c3fce76d5e1d8639234d8da0152b2';
export default {
  name: 'Post',
  props: {
    post: {
      type: Object,
      default: null,
    },
  },
  computed: {
    postImage() {
      return this.post.data.url.includes('jpg') ? this.post.data.url : redditImage;
    },
  },
};
</script>
