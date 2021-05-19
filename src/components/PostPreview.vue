<template lang="html">
  <div @click="selectPost" class="flex flex-1 my-4 cursor-pointer">
    <div
      class="h-52 flex flex-1 border-r border-b border-l border-grey-light border-l-0
        border-t border-grey-light bg-white rounded-b rounded-b-none
        rounded-r p-4 justify-between leading-normal"
      :title="post.title"
    >
      <div class="w-6/12">
        <img :src="post.thumbnail"
          :width="post.thumbnail_width"
          :height="post.thumbnail_height"
          class="block m-auto shadow-xl"
          :alt="post.title"
        >
      </div>
      <div class="w-6/12">
        <p class="text-sm text-grey-dark flex items-center">
          {{ post.num_comments }} comments
        </p>
        <div class="text-black font-bold text-xl mb-2">{{ post.title }}</div>
        <p class="text-grey-darker text-base">{{ description }}</p>
        <div class="text-sm">
          <p class="text-black leading-none">Posted By: {{ post.author }} </p>
          <p class="text-grey-dark">{{ hoursAgo }}</p>
        </div>
        <button @click="removePost()" type="button">Remove Post</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'post-preview',
  props: {
    post: {},
    hideUser: {
      default: false,
    },
    hideSubvue: {
      default: false,
    },
  },
  computed: {
    description() {
      return this.post.selftext ? `${this.post.selftext.slice(0, 750)}...` : '';
    },
    hoursAgo() {
      return `${new Date(this.post.created * 1000).getHours()} Hours Ago`;
    },
    postImage() {
      return { backgroundImage: `url('${this.post.thumbnail}')` };
    },
  },
  emits: ['update'],
  methods: {
    removePost: function () {
      console.log(this.post);
      this.$store.dispatch('deletePost', this.post);
      this.$emit('update', null);
    },
    selectPost: function () {
      this.$emit('update', this.post);
    },
  },
};
</script>
<style scoped lang="css"></style>
