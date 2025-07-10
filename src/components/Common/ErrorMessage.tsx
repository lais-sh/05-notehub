import { memo } from 'react';
import styles from './ErrorMessage.module.css';

const ErrorMessage = memo(() => {
  return (
    <div className={styles.errorContainer}>
      <p>😥 Something went wrong. Please try again later.</p>
    </div>
  );
});

export default ErrorMessage;
