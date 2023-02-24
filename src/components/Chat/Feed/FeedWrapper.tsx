import React from "react";
import { Session } from "next-auth";

type FeedWrapperProps = {
  session: Session;
};

const FeedWrapper: React.FC<FeedWrapperProps> = ({ session }) => {
  return <div>FeedWrapper</div>;
};

export default FeedWrapper;
