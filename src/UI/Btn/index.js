import React from 'react';

import styles from './Btn.module.scss';

const Btn = ({ url, color, children, onClick, type, props }) => {
  let className =
    type === 'try'
      ? styles.btn + ' ' + styles.try
      : type === 'load'
      ? styles.btn + ' ' + styles.load
      : color === 'main'
      ? styles.btn
      : color === 'grey' && styles.btn + ' ' + styles.grey;

  return (
    <a href={url} className={className} onClick={onClick} {...props}>
      {children}
    </a>
  );
};

export default Btn;
