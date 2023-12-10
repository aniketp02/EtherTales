import { GenerateStoryContainer } from "../Components/Stories/GenerateStory";
import { InnerLayout } from "../HOC/InnerLayout";

export const GenerateStories = () => {
  return (
    <>
      <InnerLayout children={<GenerateStoryContainer />} />
    </>
  );
};
