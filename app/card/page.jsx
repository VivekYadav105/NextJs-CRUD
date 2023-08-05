"use client";

import Post, { Card } from "@/app/components/post";
import { use, useEffect, useState } from "react";
import AddPost from "../components/addPost";
import { toast } from "react-toastify";

function CardSection(){
    const [show,setShow] = useState(false)
    const [posts,setPosts] = useState([])

    async function deleteAllPost(){
        const response = await fetch("http://localhost:3000/api/posts",{method:"DELETE"})
        if(response.ok){
            toast.success("deleted all the posts")
        }else{
            toast.warn("failed to delete the messages")
        }
    }

    function close(){
        setShow(false)
    }

    async function delete_card(id){
        const response = await toast.promise(fetch(`http://localhost:3000/api/posts/${id}`,{method:"DELETE",body:JSON.stringify({id}),headers:{"content-type":"application/json"}}),{
            pending:"Creating post...",
            success:"post created successfully",
            error:"failed to create post"
        })
        if(response.status==200){
            const resJson = await response.json()
            console.log(resJson)
            setPosts(resJson.data)    
        }else{
            const data = await response.json()
            console.log(data)
        }
    }

    async function createPost(post){
        const response = await toast.promise(fetch("http://localhost:3000/api/posts",{method:"POST",body:JSON.stringify(post),headers:{"content-type":"application/json"}}),{
            pending:"Creating post...",
            success:"post created successfully",
            error:"failed to create post"
        })
        if(response.status==200){
            const resJson = await response.json()
            setPosts(resJson.data)    
        }else{
            const data = await response.json()
        }
    }
    

    useEffect(()=>{
        async function fetchPosts(){
            const response = await fetch("http://localhost:3000/api/posts/",{method:"get"})
            const data = await response.json()
            setPosts(data)
        }
        fetchPosts()
    },[])

    useEffect(()=>{
    },[posts])

    return(
        <section className="courses">
            <div className="buttons">
                <button className="btn btn-red" onClick={()=>{deleteAllPost();setPosts([])}}>Delete All posts</button>
                <button className="btn btn-green" onClick={()=>{setShow((prev)=>(!prev))}}>Create Post</button>
            </div>
            {posts&&posts.map((ele,index)=><Post delete_card={delete_card} key={index} post={ele}/>)}
            {show&&<AddPost close={close} createPost={createPost}></AddPost>}
            {!posts||!posts.length&&<div className="no-posts">No posts are present</div>}
        </section>
    )
}

export default CardSection