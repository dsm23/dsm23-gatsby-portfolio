import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

import './src/styles.css';

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `This application has been updated. Would you like to reload to display the latest version?`,
  );
  if (answer === true) {
    window.location.reload();
  }
};
