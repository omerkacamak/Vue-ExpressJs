<template>
  <post-form :post="post" :submitForm="updatePost"/>
</template>

<script>
import PostForm from '../components/PostForm.vue'
import {useRouter,useRoute} from 'vue-router';
import {ref,onMounted} from 'vue'
export default {
  components: { PostForm },
    setup(){
        const router = useRouter();
        const route =useRoute()

        const API_URL="http://localhost:5000/posts"

        const post = ref({
          title :'',
          content:'',
          creator:'',  
        })
        onMounted(()=>{
            getPost();
        })

        const getPost = async ()=>{
            const {id}=route.params // sayfanın paramını alıyr
            const response = await fetch(`${API_URL}/${id}`)
            const json=await response.json();
            post.value=json
        }
        const updatePost =  async ()=>{
            const {id} = route.params;
            const response = await fetch(`${API_URL}/${id}`,{
                method:'put',
                headers:{
                    'content-type':'application/json',

                },
                body:JSON.stringify({
                    title:post.value.title,
                    content:post.value.content,
                    creator:post.value.creator
                })
            })
            const json = await response.json();
            router.push({
                name:'home'
            })
        }

        return {
            post,
            updatePost
        }
    }
}
</script>

<style>

</style>