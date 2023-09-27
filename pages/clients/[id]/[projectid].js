import { useRouter } from 'next/router'

function ProjectDetailPage(){
    const router = useRouter();

    console.log(router.pathname)
    console.log(router.query)
    const {projectid}=router.query
    if(projectid!=='2'){
        return <h1>找不到这个项目啦</h1>
    }
    return (
        <>
            <h1>
                这是某个客户的想要的某个项目
            </h1>
        </>
    )
}
export default ProjectDetailPage