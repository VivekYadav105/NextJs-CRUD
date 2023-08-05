"use client";
export default function AddPost(props){

    function handleSubmit(e){
        e.preventDefault()
        const {link,name,description} = e.target
        props.createPost({link:link.value.trim(),name:name.value,description:description.value})
    }

    return(
        <form onSubmit={handleSubmit} className="form">
            <input type="hidden" value={props.id} />
            <div className="form-input">
                <input name="name" required type="text" className="input" placeholder="name" />
            </div>
            <div className="form-input">
                <input name="description" required type="text" className="input" placeholder="description" />
            </div>
            <div className="form-input">
                <input name="link" type="text" className="input" placeholder="link" />
            </div>
            <div className="form-input buttons">
                <button className="btn">Submit</button>
                <button className="btn btn-red" type="button" onClick={()=>props.close()}>Close</button>
            </div>
        </form>
    )
}