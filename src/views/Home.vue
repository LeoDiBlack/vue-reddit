<template lang="html">
  <div class="vue-reddit container mx-auto">
    <div class="flex flex-wrap bg-gray-200 mx-2">
      <div class="flex flex-wrap h-screen w-4/12">
        <div class="vue-reddit-sidebar w-full sidebar-posts overflow-y-scroll">
          <PostPreview
            v-for="post in postsToRender"
            :key="post.data.id"
            @update="onPostSelection"
            :post="post.data"
          />
        </div>
        <div class="flex w-full justify-center sidebar-cta">
          <div class="inline-flex">
            <button
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            >
              Prev
            </button>
            <button
              class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
            >
              Next
            </button>
          </div>
        </div>
        <div class="flex w-full justify-center sidebar-cta">
          <button
            @click="dismissPosts()"
            class="bg-gray-300
              hover:bg-gray-400
              text-gray-800
              font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <svg
              class="fill-current w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/>
            </svg>
            <span>Dismiss All</span>
          </button>
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
  computed: {
    postsToRender() {
      return this.$store.getters.getPosts;
    },
  },
  mounted() {
    Api().get('top.json')
      .then((response) => {
        this.$store.dispatch('pushPosts', response.data.data.children);
        this.posts = response.data;
      });
  },
  methods: {
    dismissPosts: function () {
      this.$store.dispatch('deletePosts');
      this.posts = [];
      this.selectedPost = null;
    },
    getPosts: function () {
      Api().get('top.json', { after: this.posts.data.after })
        .then((response) => {
          this.$store.dispatch('pushPosts', response.data.data.children);
          this.posts = response.data;
        });
    },
    onPostSelection: function (selectedPost) {
      this.selectedPost = selectedPost;
    },
  },
};
</script>
<style lang="scss">
.vue-reddit{
  &-sidebar::-webkit-scrollbar {
    display: none;
  }
  &-sidebar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .sidebar-posts {
    height: 88%;
  }
  .sidebar-cta {
    height: 6%;
  }
}
</style>
