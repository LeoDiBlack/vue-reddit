import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rawPosts: [],
    currentPostsToRender: [],
    currentPage: 0,
  },
  getters: {
    getCurrentPage: function (state) {
      return state.currentPage;
    },
    getPosts: function (state) {
      return state.currentPostsToRender;
    },
    getRawPosts: function (state) {
      return state.rawPosts;
    },
  },
  mutations: {
    dismissPosts(state) {
      state.currentPostsToRender = [];
    },
    removePost(state, postToDelete) {
      state.currentPostsToRender = state.currentPostsToRender.filter(
        (post) => (post.data.id !== postToDelete.data.id),
      );
    },
    setPosts(state, posts) {
      const postsToPush = posts;
      postsToPush.data.children = posts.data.children.map(
        (post) => ({ ...post, unreadPost: true }),
      );
      state.rawPosts.push(postsToPush);
      state.currentPostsToRender = postsToPush.data.children.map(
        (post) => ({ ...post, unreadPost: true }),
      );
    },
    getNextPosts(state, posts) {
      if (state.rawPosts.length - 1 === state.currentPage) {
        this.commit('setPosts', posts);
        state.currentPage += 1;
      } else {
        state.currentPostsToRender = state.rawPosts[state.currentPage].data.children;
        state.currentPage += 1;
      }
    },
    getPreviousPosts(state) {
      state.currentPage -= 1;
      state.currentPostsToRender = state.rawPosts[state.currentPage].data.children;
    },
    setPostAsRead(state, postToUpdate) {
      state.currentPostsToRender = state.currentPostsToRender.map((post) => {
        const updatedPost = post;
        if (post.data.id === postToUpdate.data.id) {
          updatedPost.unreadPost = false;
        }
        return updatedPost;
      });

      state.rawPosts[state.currentPage].data.children = state.rawPosts[state.currentPage]
        .data.children.map((post) => {
          const updatedPost = post;
          if (post.data.id === postToUpdate.data.id) {
            updatedPost.unreadPost = false;
          }
          return updatedPost;
        });
    },
  },
  actions: {
    deletePost(context, payload) {
      console.log(payload);
      context.commit('removePost', payload);
    },
    deletePosts(context) {
      context.commit('dismissPosts');
    },
    nextPage(context, payload) {
      context.commit('getNextPosts', payload);
    },
    previousPage(context) {
      context.commit('getPreviousPosts');
    },
    pushPosts(context, payload) {
      context.commit('setPosts', payload);
    },
    updatePostReadState(context, payload) {
      context.commit('setPostAsRead', payload);
    },
  },
});
