import ContentLoader from 'react-content-loader';

const ComicsSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={225}
    height={413}
    viewBox="0 0 225 413"
    backgroundColor="#adadad"
    foregroundColor="#ecebeb"
    {...props}>
    <rect x="0" y="0" rx="0" ry="0" width="225" height="346" />
    <rect x="0" y="356" rx="0" ry="0" width="225" height="32" />
    <rect x="0" y="397" rx="0" ry="0" width="33" height="16" />
  </ContentLoader>
);

export default ComicsSkeleton;
