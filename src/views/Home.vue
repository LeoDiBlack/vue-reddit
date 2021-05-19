<template lang="html">
  <div class="vue-reddit container mx-auto">
    <div class="flex flex-wrap bg-gray-200 mx-2">
      <aside
        class="vue-reddit-sidebar__mobile flex flex-wrap h-screen
          md:hidden bg-gray-800 w-9/12"
      >
        <h2
          class="text-black font-bold text-xl py-2 px-6 bg-white w-full rounded-t-lg"
        >
          Reddit Posts
        </h2>
        <div class="vue-reddit-sidebar w-full sidebar-posts overflow-y-scroll">
          <transition-group
            name="fade"
            mode="out-in"
          >
            <PostPreview
              v-for="post in postsToRender"
              :key="post.data.id"
              @update="onPostSelection"
              :post="post"
            />
          </transition-group>
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
            <span>Dismiss All</span>
          </button>
        </div>
      </aside>
      <div class="flex-wrap h-screen hidden md:flex w-full bg-gray-800 lg:w-4/12">
        <h2
          class="text-black font-bold text-xl py-2 px-6 bg-white w-full rounded-t-lg"
        >
          Reddit Posts
        </h2>
        <div class="vue-reddit-sidebar w-full sidebar-posts overflow-y-scroll">
          <transition-group
            name="fade"
            mode="out-in"
          >
            <PostPreview
              v-for="post in postsToRender"
              :key="post.data.id"
              @update="onPostSelection"
              :post="post"
            />
          </transition-group>
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
            <span>Dismiss All</span>
          </button>
        </div>
      </div>
      <div class="flex flex-wrap w-full lg:w-8/12 overflow-hidden">
        <div class="w-full overflow-hidden">
          <transition
            name="fade"
            mode="out-in"
          >
            <Post :post="selectedPost"/>
          </transition>
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
        this.$store.dispatch('pushPosts', response.data);
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
  /* Vue Transitions */
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

   &-sidebar__mobile {
    position:absolute;
    left:-270px;
    cursor:pointer;
    transition:all 0.8s ease-in-out;
    -moz-transition:all 0.8s ease-in-out;
    -o-transition:all 0.8s ease-in-out;
    -webkit-transition:all 0.8s ease-in-out;

    &:hover {
      left:0;
    }
  }

  &-sidebar::-webkit-scrollbar {
    display: none;
  }
  &-sidebar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .sidebar-title {
    height: 5%;
  }
  .sidebar-posts {
    height: 85%;
  }
  .sidebar-cta {
    height: 5%;
  }
}
</style>
