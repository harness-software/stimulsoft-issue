import { graphql, useStaticQuery } from "gatsby";
import * as React from "react";
import { Stimulsoft } from "stimulsoft-reports-js/Scripts/stimulsoft.viewer";

export interface Example2Props {
  children?: React.ReactNode;
}

const testData = {
  id: "638f95c4d7c0ec0918005637",
  title: "Lilia Harrell - October 18, 2020",
  databaseId: 3120,
  workerName: "Lilia Harrell",
  projectName: "Adelaide Wind Farm",
  incidentType: "Near Miss",
  classification: "Death",
  dateOfIncident: "October 18, 2020",
};

const Example2: React.FC<Example2Props> = (props) => {
  const {} = props;

  const template = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "reports/IncidentReport.mrt" }) {
        publicURL
      }
    }
  `);

  React.useEffect(() => {
    (async () => {
      try {
        const options = new Stimulsoft.Viewer.StiViewerOptions();

        const viewer = new Stimulsoft.Viewer.StiViewer(
          options,
          `StiViewer`,
          true
        );
        const report = Stimulsoft.Report.StiReport.createNewReport();
        const response = await fetch(template?.file?.publicURL ?? ``);
        const data = await response.json();
        report.load(data);

        report.dictionary.databases.clear();

        const jsonData = new Stimulsoft.System.Data.DataSet();
        jsonData.readJson(JSON.stringify(testData));

        report.regData("incidentReport", "", jsonData);
        report.dictionary.synchronize();

        viewer.report = report;

        viewer.renderHtml("viewer-2");
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    })();
  }, []);

  return <div id="viewer-2" style={{ width: `100%`, height: `100%` }}></div>;
};

export default Example2;
