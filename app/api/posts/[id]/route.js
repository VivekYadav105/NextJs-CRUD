import data from '@/app/api/posts/data.json'
import fs from 'fs/promises'
import path from 'path'
import { redirect } from 'next/navigation'
import { NextRequest,NextResponse } from 'next/server'

export async function GET(request){
    const query = request.query
    // console.log(query.id) 
    if(!id){
        throw new Error("Id is not found")
    }
    const ele = data.filter((ele)=>ele.id===id)
    return NextResponse.json(ele)
}

export async function PUT(request){
    const filePath = path.join(process.cwd(),"app/api/posts/data.json")
    const post = await request.json()
    console.log(request.query)
    const {id} = request.query
    const new_data = data.map((ele)=>{
        if(ele.id!==id) return ele
        else return {id:ele.id,name:post.name,description:post.description,link:post.link?post.link:""}
    })
    await new Promise((resolve,reject)=>{
        fs.writeFile(filePath,JSON.stringify(new_data),{encoding:"utf-8"},
        (err)=>{
            if(err){return reject(err)}
            return resolve()
        })
    })
    redirect(307,"/card")
}

export async function DELETE(request){
    try{
        const filePath = path.join(process.cwd(),"app/api/posts/data.json")
        const {id} = await request.json()
        console.log(id)
        const new_data = data.filter((ele)=>(ele.id!==id))
        console.log(new_data)
        await fs.writeFile(filePath,JSON.stringify(new_data))
        return NextResponse.json({message:"removed the post",data:new_data})
    }catch(err){
        return NextResponse.json({err:err.message,stack:err.stack})
    }
}
