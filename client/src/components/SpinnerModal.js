import React from "react";
import styles from './SpinnerModal.module.css';

export default function Modal(props) {
  const { visible, children } = props;
  if (visible) {
    return (
      <div className={styles.modal} >
        {children}
      </div>
    );
  }
  return null;
}