import RouterItem from './router-item';
function RouterList(props) {
  const { items } = props;
  return (
    <ul>
      {items.map((item) => {
        return <RouterItem key={item.id} {...item} />;
      })}
    </ul>
  );
}
export default RouterList;
