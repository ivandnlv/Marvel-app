import ContentLoader from 'react-content-loader';

import styles from '../../components/CharacterInfo/CharacterInfo.module.scss';

const CharacterInfoSkeleton = () => (
  <ContentLoader
    speed={6}
    width={375}
    height={684}
    viewBox="0 0 375 684"
    backgroundColor="#adadad"
    foregroundColor="#ecebeb">
    <rect x="175" y="0" rx="0" ry="0" width="42" height="26" />
    <rect x="0" y="0" rx="0" ry="0" width="150" height="150" />
    <rect x="175" y="64" rx="0" ry="0" width="101" height="38" />
    <rect x="175" y="112" rx="0" ry="0" width="101" height="38" />
    <rect x="0" y="165" rx="0" ry="0" width="375" height="112" />
    <rect x="0" y="303" rx="0" ry="0" width="59" height="21" />
    <rect x="0" y="337" rx="0" ry="0" width="375" height="25" />
    <rect x="0" y="372" rx="0" ry="0" width="375" height="25" />
    <rect x="0" y="407" rx="0" ry="0" width="375" height="25" />
    <rect x="0" y="442" rx="0" ry="0" width="375" height="25" />
    <rect x="0" y="476" rx="0" ry="0" width="375" height="25" />
    <rect x="0" y="510" rx="0" ry="0" width="375" height="25" />
    <rect x="0" y="545" rx="0" ry="0" width="375" height="25" />
    <rect x="0" y="580" rx="0" ry="0" width="375" height="25" />
    <rect x="0" y="615" rx="0" ry="0" width="375" height="25" />
    <rect x="0" y="649" rx="0" ry="0" width="375" height="25" />
  </ContentLoader>
);

export default CharacterInfoSkeleton;
