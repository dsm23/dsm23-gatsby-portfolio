import 'tailwindcss/dist/base.min.css';
import 'typeface-inter';

export const onClientEntry = async () => {
  if (typeof IntersectionObserver === `undefined`) {
    await import(`intersection-observer`);
  }
};

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `This application has been updated. Would you like to reload to display the latest version?`,
  );
  if (answer === true) {
    window.location.reload();
  }
};
