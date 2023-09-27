import Link from 'next/link';
function ClientPage() {
  const clientList = [
    {
      id: 1,
      name: '客户1',
    },
    {
      id: 2,
      name: '客户2',
    },
  ];
  return (
    <div>
      <h1>这是客户页面</h1>
      <ul>
        {clientList.map((item) => {
          return (
            <li key={item.id}>
              {/* <Link href={`/clients/${item.id}`}>{item.name}</Link> */}
              <Link
                href={{
                  pathname: 'clients/[id]',
                  query: { id: item.id },
                }}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default ClientPage;
