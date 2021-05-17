<template lang="html">
  <div class="flex flex-1 my-4">
    {{ post.title }}
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
