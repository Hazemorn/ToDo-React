import ContentLoader from "react-content-loader";

const Skeleton = () => {
  return (
    <ContentLoader 
    speed={2}
    width={900}
    height={90}
    viewBox="0 0 900 90"
    backgroundColor="#f4f0f0"
    foregroundColor="#ffffff"
  >
    <rect x="0" y="0" rx="15" ry="15" width="900" height="75" />
  </ContentLoader>
  );
};

export default Skeleton;
