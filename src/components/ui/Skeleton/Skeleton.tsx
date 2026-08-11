import ContentLoader from "react-content-loader";

const Skeleton = () => {
  return (
    <ContentLoader 
    speed={2}
    width={900}
    height={300}
    viewBox="0 0 600 200"
    backgroundColor="#f4f0f0"
    foregroundColor="#ffffff"
  >
    <rect x="216" y="317" rx="10" ry="10" width="75" height="51" /> 
    <rect x="0" y="356" rx="10" ry="10" width="120" height="40" /> 
    <rect x="49" y="366" rx="0" ry="0" width="7" height="0" /> 
    <rect x="0" y="310" rx="10" ry="10" width="200" height="35" /> 
    <rect x="8" y="9" rx="23" ry="23" width="563" height="153" />
  </ContentLoader>
  );
};

export default Skeleton;
