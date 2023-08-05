import Link from "next/link"
import {FaCodeBranch, FaStar,FaEye} from 'react-icons/fa'

async function fetchRepos(){
    const response = await fetch("https://api.github.com/users/VivekYadav105/repos")
    return await response.json()   
}

async function Repos(){
    const repos = await fetchRepos()
    return(
        <section className="repo-container">
            <h2>Repositories</h2>
            <ul className="repo-list">
                {repos.map((ele)=>(
                    <li key={ele.id}>
                        <Link href={'/repos/'+ele.name}>
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
                        </Link>
                    </li>
                ))}
            </ul>
            <div>{repos[0].name}</div>
        </section>
    )
}
export default Repos;