import { graphql, useStaticQuery } from "gatsby";
import * as React from "react";
import { Stimulsoft } from "stimulsoft-reports-js/Scripts/stimulsoft.viewer";

export interface TestProps {
  children?: React.ReactNode;
}

const Example1: React.FC<TestProps> = (props) => {
  const {} = props;

  const template = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "reports/Report.mdc" }) {
        publicURL
      }
    }
  `);

  React.useEffect(() => {
    (async () => {
      try {
        const viewer = new Stimulsoft.Viewer.StiViewer(
          undefined,
          `StiViewer`,
          true
        );
        const report = new Stimulsoft.Report.StiReport();
        const response = await fetch(template?.file?.publicURL ?? ``);
        const data = await response.json();
        report.load(data);

        // clear the report db
        // report.dictionary.databases.clear()
        // db.pathData = `../reports/data.json`
        // const jsonData =
        //   Stimulsoft.Base.StiJsonToDataSetConverter.getDataSet(json)
        // report.regData(`incidentReport`, ``, jsonData)
        // report.dictionary.synchronize()

        viewer.report = report;

        viewer.renderHtml(`viewer`);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    })();
  }, []);

  return <div id="viewer" style={{ width: `100%`, height: `100%` }}></div>;
};

export default Example1;
