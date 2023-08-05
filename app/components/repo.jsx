import { FaStar,FaEye,FaCodeBranch } from "react-icons/fa"

async function fetchRepo(repoName){
    try{
        const repo = await fetch(`http://api.github.com/repos/VivekYadav105/${repoName}`,{next:{revalidate:60}})
        return repo.json()
    }catch(err){
        console.log(err)
    }
}

const Repo = async ({repoName})=>{
    const ele = await fetchRepo(repoName)
    return(
            <div>
                <h3>{ele.name}</h3>
                <p>{ele.description}</p>
                <div className="repo-details">
                    <span>
                        <FaStar/>{ele.stargazers_count}
                    </span>
                    <span>
                        <FaCodeBranch/>{ele.fork_count}
                    </span>
                    <span>
                        <FaEye/>{ele.watchers_count}
                    </span>
                </div>
            </div>
        )
}

export default Repo