import { useRouter } from 'next/router';
function ClientDetailPage() {
  const router = useRouter();
  console.log(router.query);
  const handleToProject=()=>{
    // router.push('/clients/1/2')
    router.push({
        pathname:'/clients/[id]/[projectid]',
        query:{
            id:1, projectid:2
        }
    })
  }
  return (
    <div>
      <h1>这是客户{router.query.id}</h1>
      <button onClick={handleToProject}>加载客户{router.query.id}的项目</button>
    </div>
  );
}
export default ClientDetailPage;
