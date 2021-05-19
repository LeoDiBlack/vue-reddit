<template lang="html">
  <div @click="selectPost" class="flex flex-1 my-4 cursor-pointer">
    <div
      class="h-52 flex flex-1 border-r border-b border-l border-grey-light border-l-0
        border-t border-grey-light bg-white rounded-b rounded-b-none
        rounded-r p-4 justify-between leading-normal"
      :title="post.data.title"
    >
      <div class="w-6/12">
        <img :src="post.data.thumbnail"
          :width="post.data.thumbnail_width"
          :height="post.data.thumbnail_height"
          class="block m-auto shadow-xl"
          :alt="post.data.title"
        >
      </div>
      <div class="w-6/12">
        <p class="text-sm text-grey-dark flex items-center">
          <span v-if="post.unreadPost" class="mx-2">
            🟢
          </span>
          {{ post.data.num_comments }} comments
        </p>
        <div class="text-black font-bold text-xl mb-2">{{ truncateText(post.data.title) }}</div>
        <p class="text-grey-darker text-base">{{ description }}</p>
        <div class="text-sm">
          <p class="text-black leading-none">Posted By: {{ post.data.author }} </p>
          <p class="text-grey-dark">{{ hoursAgo }}</p>
        </div>
        <button
            @click="removePost()"
            class="bg-gray-300
              hover:bg-gray-400
              text-gray-800
              font-bold my-4 py-2 px-4 rounded inline-flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9
                2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
            </svg>
            <span>Remove Post</span>
          </button>
      </div>
    </div>
  </div>
</template>

<script>
import textUtils from '../utils/text';

export default {
  name: 'post-preview',
  props: {
    post: {},
  },
  computed: {
    description() {
      return this.post.data.selftext ? `${this.post.data.selftext.slice(0, 750)}...` : '';
    },
    hoursAgo() {
      return `${new Date(this.post.data.created * 1000).getHours()} Hours Ago`;
    },
  },
  emits: ['update'],
  methods: {
    removePost: function () {
      this.$store.dispatch('deletePost', this.post);
      this.$emit('update', null);
    },
    selectPost: function () {
      this.$store.dispatch('updatePostReadState', this.post);
      this.$emit('update', this.post);
    },
    truncateText: function (text) {
      return textUtils.truncate(text, 40);
    },
  },
};
</script>
<style scoped lang="css"></style>
