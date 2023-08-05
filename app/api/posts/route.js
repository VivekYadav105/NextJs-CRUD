import { NextResponse } from "next/server"
import data from '@/app/api/posts/data.json'
import fs from 'fs'
import path from "path"
import uuid4 from "uuid4"

export async function GET(request){
    const query = await request.query
    if(query&&query.id){
        const ele = data.filter((ele)=>ele.id===id)
        return NextResponse.json(ele)
    }
    return NextResponse.json(data)
}

export async function POST(request){
    try{
        const id = uuid4()
        const filePath = path.join(process.cwd(),'app/api/posts/data.json')
        const post =await request.json()
        post.id = id
        const old_data =await new Promise((resolve,reject)=>{
            try{
                fs.readFile(filePath,'utf-8',(err,data)=>{
                    if(err) reject(err)
                    resolve(data)
                })
            }catch(err){
                return reject(err)
            }
        })
        const parsed_data = old_data?JSON.parse(old_data):[]
        await new Promise((resolve,reject)=>{
            fs.writeFile(filePath,JSON.stringify([...parsed_data,post]),{encoding:"utf-8"},
            (err)=>{
                if(err){return reject(err)}
                return resolve()
            })
        })
        const new_data = [...parsed_data,post]
        return NextResponse.json({message:"post created successfully",data:new_data})    
    }catch(err){
        return NextResponse.json({err:err.message,stack:err.stack})
    }
}

export async function DELETE(request){
    const filePath = path.join(process.cwd(),'app/api/posts/data.json')
    //code to delete all posts
    try{
        const data = await new Promise((resolve,reject)=>{
            fs.writeFile(filePath,JSON.stringify([]),{encoding:"utf-8"},(err)=>{
                if(err) return reject(err)
                return resolve([])
            })
        })
        return NextResponse.json({message:"Removed all the posts successfully",data:data})
    }catch(err){
        return err
    }
}

