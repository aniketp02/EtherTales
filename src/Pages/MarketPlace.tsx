import { MarketContainer } from "../Components/MarketPlace/MarketContainer";
import { InnerLayout } from "../HOC/InnerLayout";

export const MarketPlace = () => {
  return (
    <>
      <InnerLayout children={<MarketContainer />} />
    </>
  );
};
