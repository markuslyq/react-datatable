import { styles } from "../styles";

import ArrayBody from "../TableBodyRenders/ArrayBody";
import ArrayHeader from "../TableBodyRenders/ArrayHeader";
import DateBody from "../TableBodyRenders/DateBody";
import LongStringBody from "../TableBodyRenders/LongStringBody";
import SubTableHeader from "../TableBodyRenders/SubTableHeader";
import SubTableBody from "../TableBodyRenders/SubTableBody";

const parseColumnSettings = (oldColumnSettings, data) => {
  let parsedColumnSettings = [];

  if (oldColumnSettings !== null) {
    oldColumnSettings.forEach((oldColumnInfo) => {
      oldColumnInfo["options"]["setCellProps"] = () => ({
        style: styles.regularTableCell,
      });

      if (oldColumnInfo["dataType"] === "date") {
        oldColumnInfo["options"]["customBodyRender"] = (value) => {
          return <DateBody value={value} />;
        };
      }

      if (oldColumnInfo["dataType"] === "longString") {
        oldColumnInfo["options"]["customBodyRender"] = (value, tableMeta) => {
          return <LongStringBody data={data} value={value} tableMeta={tableMeta} />;
        };
      }

      if (oldColumnInfo["dataType"] === "array") {
        oldColumnInfo["options"]["customHeadLabelRender"] = (columnMeta) => {
          return (
            <ArrayHeader columnMeta={columnMeta} />
          );
        };
        oldColumnInfo["options"]["customBodyRender"] = (value, tableMeta) => {
          return <ArrayBody value={value} tableMeta={tableMeta} />;
        };
      }

      if (oldColumnInfo["dataType"] === "group") {
        oldColumnInfo["options"]["customHeadLabelRender"] = (columnMeta) => {
          return (
            <SubTableHeader subHeaders={oldColumnInfo["subHeaders"]} columnMeta={columnMeta} />
          );
        };
        oldColumnInfo["options"]["customBodyRender"] = (value, tableMeta) => {
          return <SubTableBody data={data} value={value} tableMeta={tableMeta} />;
        };
      }
      parsedColumnSettings.push(oldColumnInfo);
    });
  }

  return parsedColumnSettings;
};

export default parseColumnSettings;
