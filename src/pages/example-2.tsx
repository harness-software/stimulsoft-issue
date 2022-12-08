import loadable from "@loadable/component";
import * as React from "react";

export interface TestProps {}

const LoadableExample2 = loadable(() => import(`../components/Example2`));

const Example1: React.FC<TestProps> = (props) => {
  const {} = props;

  return (
    <div>
      <LoadableExample2 />
    </div>
  );
};

export default Example1;
