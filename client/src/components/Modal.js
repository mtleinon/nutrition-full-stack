import React from "react";
import styles from './Modal.module.css';

export default function Modal(props) {
  const { visible, dismiss, children } = props;
  if (visible) {
    return (
      <div className={styles.modalWrapper}>
        <div className={styles.modal} >
          {children}
        </div>
        <div className={styles.modalBackGround} onClick={dismiss} />
      </div>
    );
  }
  return null;
}