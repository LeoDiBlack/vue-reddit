<template lang="html">
  <div @click="selectPost" class="flex flex-1 my-4 cursor-pointer">
    <div
      class="h-80 flex-1 bg-cover
        rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
      :style="postImage"
      :title="post.title"
    >
    </div>
    <div
      class="flex-1 border-r border-b border-l border-grey-light lg:border-l-0
        lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none
        lg:rounded-r p-4 justify-between leading-normal"
    >
      <div class="mb-8">
        <p class="text-sm text-grey-dark flex items-center">
          {{ post.num_comments }} comments
        </p>
        <div class="text-black font-bold text-xl mb-2">{{ post.title }}</div>
        <p class="text-grey-darker text-base">{{ description }}</p>
      </div>
      <div class="flex items-center">
        <div class="text-sm">
          <p class="text-black leading-none">Posted By: {{ post.author }} </p>
          <p class="text-grey-dark">{{ hoursAgo }}</p>
        </div>
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
      return { backgroundImage: `url('${this.post.url}')` };
    },
  },
  emits: ['update'],
  methods: {
    selectPost: function () {
      this.$emit('update', this.post);
    },
  },
};
</script>
<style scoped lang="css"></style>
