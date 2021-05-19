import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
  },
  getters: {
    getPosts: function (state) {
      return state.posts;
    },
  },
  mutations: {
    dismissPosts(state) {
      state.posts = [];
    },
    removePost(state, postToDelete) {
      console.log(postToDelete);
      state.posts = state.posts.filter((post) => (post.data.id !== postToDelete.data.id));
    },
    setPosts(state, posts) {
      state.posts = posts.map((post) => ({ ...post, unreadPost: true }));
    },
    setPostAsRead(state, postToUpdate) {
      state.posts = state.posts.map((post) => {
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
