import React from 'react';
import ContentLoader from 'react-content-loader';

import styles from '../../components/RandomHero/RandomHero.module.scss';

const RandomHeroSkeleton = () => {
  return (
    <div className={styles.wrapper + ' ' + styles.loading}>
      <ContentLoader
        speed={2}
        width={475}
        height={180}
        viewBox="0 0 475 180"
        foregroundColor="#ecebeb">
        <rect x="0" y="0" rx="0" ry="0" width="180" height="180" />
        <rect x="210" y="0" rx="0" ry="0" width="51" height="29" />
        <rect x="210" y="39" rx="0" ry="0" width="265" height="90" />
        <rect x="210" y="142" rx="0" ry="0" width="101" height="38" />
        <rect x="331" y="142" rx="0" ry="0" width="101" height="38" />
      </ContentLoader>
    </div>
  );
};

export default RandomHeroSkeleton;
