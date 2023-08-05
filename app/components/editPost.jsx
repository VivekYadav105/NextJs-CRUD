"use client";
export default function AddPost(props){

    function handleSubmit(e){
        e.preventDefault()
        const {id,link,name,description} = e.target
        props.createPost({link:link.value.trim(),name:name.value,description:description.value,id:id.value})
    }

    return(
        <form onSubmit={handleSubmit} className="form">
            <input type="hidden" value={props.id} name="id" />
            <div className="form-input">
                <input name="name" required type="text" value={props.name} className="input" placeholder="name" />
            </div>
            <div className="form-input">
                <input name="description" value={props.description} required type="text" className="input" placeholder="description" />
            </div>
            <div className="form-input">
                <input name="link" type="text" value={props.link} className="input" placeholder="link" />
            </div>
            <div className="form-input buttons">
                <button className="btn">Submit</button>
                <button className="btn btn-red" type="button" onClick={()=>props.close()}>Close</button>
            </div>
        </form>
    )
}