import { useEffect, useState } from 'react';
import { useMounted } from '../../hooks/useMounted';
import styles from './mainView.module.css';

const MainView = () => {
  useMounted(() => {
    console.log('useBeforeMount');
  });

  const { clipboard, imgSrcMap, ipcRenderer } = window.electron;
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
    <div className={styles['warpper']}>
      <img
        className={styles['img']}
        src={imgSrcMap.get('xf')}
        onClick={() => ipcRenderer.send('create-window', 'block')}
        alt="loading"
      />
    </div>
  );
};

export default MainView;
