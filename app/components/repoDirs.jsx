import Link from "next/link"

async function fetchRepoContents(repoName){
    const response = await fetch(`http://api.github.com/repos/VivekYadav105/${repoName}/contents`,{next:{revalidate:60}})
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return response.json()
}

async function RepoDirs({repoName}){
    const repo = await fetchRepoContents(repoName)
    const dirs = repo.filter((ele)=>ele.type==="dir")
    return(
        <section>
            <h3>Directories</h3>
            <ul>
                {dirs.map((ele)=>(
                    <li key={ele.path}>
                        <Link href={`/code/repos/${repoName}/${ele.path}`}>
                            {ele.path}
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default RepoDirs