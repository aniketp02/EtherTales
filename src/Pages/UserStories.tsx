import { StoriesContainer } from "../Components/Stories/Stories";
import { InnerLayout } from "../HOC/InnerLayout";

export const UserStories = () => {
  return (
    <>
      <InnerLayout children={<StoriesContainer />} />
    </>
  );
};
