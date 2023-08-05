import Link from 'next/link'

function Post({post,delete_card}){
    return(
        <div className='card'>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <h2>{post.name}</h2>
                <div className='buttons'>
                    <Link href={`/card/${post.id}`}>
                        <button className="btn">✏️</button>
                    </Link>
                    <button className='btn btn-red' onClick={()=>{delete_card(post.id)}}>🗑️</button>
                </div>
            </div>
            <p>{post.description}</p>
            {post.link&&<Link href={post.link} className='btn'>Know more</Link>}
        </div>

    )
}

export default Post