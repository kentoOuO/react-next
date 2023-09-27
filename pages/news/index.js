import fs from 'fs/promises';
import path from 'path';
function Newspage(props) {
  const { products } = props;
  return (
    <div>
      <h1>新闻首页</h1>
        <ul>
            {products.map(item=>{
                return <li key={item.id}>{item.title}</li>
            })}
        </ul>
    </div>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'new-list.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  console.log('loading.....')
  return {
    props: {
        products: data.products,
    },
    //每十秒刷新页面才会更新getStaticProps(仅在生产环境下有效)
    revalidate:10
  };
}

export default Newspage;
