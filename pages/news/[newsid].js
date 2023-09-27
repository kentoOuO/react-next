
import { useRouter } from 'next/router'

function NewsDetailPage (){
    const router = useRouter();

    console.log(router.pathname)
    console.log(router.query)

    return (
        <div>
            <h1>这里是新闻详情</h1>
        </div>
    )
}

export default NewsDetailPage