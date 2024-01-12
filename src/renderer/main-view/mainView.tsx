import { useMounted } from '../../hooks/useMounted';

interface MainViewProps {
  title: string;
}

const MainView = (props: MainViewProps) => {
  useMounted(() => {
    console.log('useBeforeMount');
  });

  const { title } = props;
  return (
    <>
      <h1>💖 Hello World!</h1>
      <p>Welcome to your Electron application.</p>
      {title && <p>title: {title}</p>}
    </>
  );
};

export default MainView;
