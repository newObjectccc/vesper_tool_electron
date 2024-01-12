import { useEffect, useState } from 'react';
import { useMounted } from '../../hooks/useMounted';
import styles from './mainView.module.css';
interface MainViewProps {
  title: string;
}

const MainView = (props: MainViewProps) => {
  useMounted(() => {
    console.log('useBeforeMount');
  });

  const { title } = props;
  const { clipboard, imgSrcMap } = window.electron;
  const [clipboardContent, setClipboardContent] = useState(clipboard.readText());

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentClipboardContent = clipboard.readText();
      if (currentClipboardContent !== clipboardContent) {
        setClipboardContent(currentClipboardContent);
        console.log('Clipboard changed:', currentClipboardContent);
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [clipboardContent]);
  return (
    <div>
      {/* <h1>💖 Hello World!</h1> */}
      {/* <p>Welcome to your Electron application.</p>
      {title && <p>title: {title}</p>} */}
      <img className={styles['img']} src={imgSrcMap.get('xf')} alt="loading" />
    </div>
  );
};

export default MainView;
