import React from "react";
import { Skeleton } from "@chakra-ui/react";
import { DimensionValue } from "@/util/types";

type SkeletonLoaderProps = {
  count: number;
  height: DimensionValue;
};

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ count, height }) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <Skeleton
          key={i}
          startColor={"blackAlpha.400"}
          endColor={"whiteAlpha.300"}
          width={{ base: "full" }}
          height={height}
          borderRadius={4}
        />
      ))}
    </>
  );
};

export default SkeletonLoader;
