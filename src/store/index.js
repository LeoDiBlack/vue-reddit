import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rawPosts: [],
    currentPostsToRender: [],
  },
  getters: {
    getPosts: function (state) {
      return state.currentPostsToRender;
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
      state.rawPosts.push(posts);
      state.currentPostsToRender = posts.data.children.map(
        (post) => ({ ...post, unreadPost: true }),
      );
    },
    setPostAsRead(state, postToUpdate) {
      state.currentPostsToRender = state.currentPostsToRender.map((post) => {
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
    pushPosts(context, payload) {
      context.commit('setPosts', payload);
    },
    updatePostReadState(context, payload) {
      context.commit('setPostAsRead', payload);
    },
  },
});
