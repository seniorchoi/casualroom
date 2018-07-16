import axios from 'axios';
const URL = 'http://reduxblog.herokuapp.com/api';
const postKey = '?key=13ufheu2';
const picKey = '?key=14ufheu2';
const dateKey = '?key=15ufheu2';
const vidKey = '?key=16ufheu2';

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
export function deletePosts(id) {
  return axios.delete(`${URL}/posts/${id}${postKey}`);
}

export function getPics() {
  return axios.get(`${URL}/posts${picKey}`);

}
export function deletePics(id) {
  return axios.delete(`${URL}/posts/${id}${picKey}`);
}

export function createPics(post){
  return axios.post(`${URL}/posts${picKey}`,
    {"title": post.title,
      "content": post.content,
      "categories": post.categories});
}



export function getDates() {
  return axios.get(`${URL}/posts${dateKey}`);
}
export function deleteDates(id) {
  return axios.delete(`${URL}/posts/${id}${dateKey}`);
}

export function createDate(post){
  return axios.post(`${URL}/posts${dateKey}`,
    {"title": post.title,
      "content": post.content,
      "categories": post.categories});
}


export function getVids() {
  return axios.get(`${URL}/posts${vidKey}`);
}
export function deleteVids(id) {
  return axios.delete(`${URL}/posts/${id}${vidKey}`);
}

export function createVids(post){
  console.log('http'+post.content.slice(5));
  return axios.post(`${URL}/posts${vidKey}`,
    {"title": post.title,
      "content": 'http'+post.content.slice(5),
      "categories": post.categories});
}
