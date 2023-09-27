import Link from 'next/link';
function RouterItem(props) {
  const { path, name, id } = props;
  return (
    <li>
      <Link href={path}>
        {name}
      </Link>
    </li>
  );
}
export default RouterItem;
