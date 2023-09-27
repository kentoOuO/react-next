import RouterList from '../components/router-list';

export default function Home() {
  const routerList = [
    {
      id: '01',
      name: 'News',
      path: '/news',
    },
    {
      id: '02',
      name: 'Clients',
      path: '/clients',
    },
  ];
  return (
    <div>
      <h1>The Page</h1>
      <RouterList items={routerList} />
    </div>
  );
}
