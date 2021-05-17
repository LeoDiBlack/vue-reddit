<template lang="html">
  <div class="flex flex-1 my-4 text-center">
    <div class="" style="width: 350px;">
      <a :href="post.url" target="_blank">
        <img :src="post.url" class="rounded-lg shadow-xl mb-4" alt="">
      </a>
      <div class="text-center">
        <h5 class="text-xl font-semibold mb-2">{{ post.title }}</h5>
        <p class="mb-4">{{ post.selftext }}</p>
      </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: {
    post: {},
  },
};
</script>
