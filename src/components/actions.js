import axios from 'axios';
const URL = 'http://reduxblog.herokuapp.com/api';
const postKey = '?key=13ufheu2';
const picKey = '?key=14ufheu2';

export const getJoke =()=> {
  return axios.get('http://api.icndb.com/jokes/random/200');
};


export function getPosts() {
  return axios.get(`${URL}/posts${postKey}`);

}

export function createPost(post){
  return axios.post(`${URL}/posts${postKey}`,
    {"title": post.title,
      "content": post.content,
      "categories": post.categories});
}

export function getPics() {
  return axios.get(`${URL}/posts${picKey}`);

}

export function createPics(post){
  return axios.post(`${URL}/posts${picKey}`,
    {"title": post.title,
      "content": post.content,
      "categories": post.categories});
}
