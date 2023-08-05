"use client";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import Link from "next/link";

function EditForm({params}){
    // const router = useRouter() 
    const [post,setPost] = useState(null)
    useEffect(()=>{
        async function getPost(id){
            const response = await fetch(`http://localhost:3000/api/posts/?id=${id}`,{method:"get",mode:"cors"})
            console.log(response)
            const resJson = await response.json()
            setPost(resJson[0])
        }
        if(params){
            getPost(params.cardId)
        }
    },[])

    useEffect(()=>{
        console.log(post)
    },[post])

    function handleSubmit(){

    }

    return(
        <form onSubmit={handleSubmit} className="form">
            <h1>{}</h1>
            <input type="hidden" value={params.cardId} readOnly />
            <div className="form-input">
                <input name="name" defaultValue={post?post.name:""} required type="text" className="input" placeholder="name" />
            </div>
            <div className="form-input">
                <input name="description" defaultValue={post?post.description:""} required type="text" className="input" placeholder="description" />
            </div>
            <div className="form-input">
                <input name="link" type="text" defaultValue={post?post.link:""} className="input" placeholder="link" />
            </div>
            <div className="form-input buttons">
                <button className="btn">Submit</button>
                <Link href="/card">
                    <button className="btn btn-red" type="button">Close</button>
                </Link>
            </div>
        </form>
    )
}

export default EditForm