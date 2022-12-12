<template>
    <div class="container">
  <div v-for="post in posts" :key="post.id" class="card">
    
  <div class="card-image">
   
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">{{post.title}}</p>
        <p class="subtitle is-6">@johnsmith</p>
      </div>
    </div>

    <div class="content">
        {{post.content}}
      <a>{{post.creator}}</a>.
      <a href="#">#css</a> <a href="#">#responsive</a>
      <br>
      <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
    </div>
  </div>
  <footer class="card-footer">
    <button @click="editPost(post._id)" class="card-footer-item button is-warning">Edit</button>
    <button @click="removePost(post._id)" class="card-footer-item button is-danger">Delete</button>
  </footer>
</div>
</div>
</template>

<script>
import {ref,onMounted} from 'vue';
import { useRouter } from 'vue-router';
export default {



 setup(){
    const router=useRouter();
    const posts = ref([])
    const API_URL='http://localhost:5000/posts'
    onMounted(()=>{
        getPosts()
    })

  var getPosts = async ()=>{
    const response = await fetch(API_URL)
    const json = await response.json();
    posts.value=json;
  }

  var removePost = async (_id)=>{
    const response = await fetch(`${API_URL}/${_id}`,{
        method:'DELETE'
    })
    getPosts()
  }

  var editPost = async (_id)=>{
    router.push({
        name:'Update',
        params:{
            id:_id
        }
    })
  }

  return{
    posts,
    removePost,
    editPost
  }
 },
}
</script>

<style>

</style>