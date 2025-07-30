export const Loader = ({ className }: { className?: string }) => {
  return <div className={`loader loader-solid ${className ?? ""}`}></div>;
};
