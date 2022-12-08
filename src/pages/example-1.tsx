import loadable from "@loadable/component";
import * as React from "react";

export interface TestProps {}

const LoadableExample1 = loadable(() => import(`../components/Example1`));

const Example1: React.FC<TestProps> = (props) => {
  const {} = props;

  return (
    <div>
      <LoadableExample1 />
    </div>
  );
};

export default Example1;
