import Repo from '@/app/components/repo'
import RepoDirs from '@/app/components/repoDirs'
import Link from 'next/link'
import { Suspense } from 'react'

function RepoName({params}){
    return(
        <div className="card">
            <Link href="/repos" className='btn btn-back'>Back to Repositories</Link>
            <Suspense fallback={<div>Loading repository ...</div>}>
                <Repo repoName={params.repoName}></Repo>
            </Suspense>
            <Suspense fallback={<div>Loading Directories ...</div>}>
                <RepoDirs repoName={params.repoName}/>
            </Suspense>
        </div>
    )
}

export default RepoName