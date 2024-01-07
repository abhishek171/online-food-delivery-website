import React from 'react';
import '../../Css/table.css';

const TableComponent = ({ dataList, currentPage, itemsPerPage }) => {
    const keyArrayObject = dataList.reduce((result, item) => {
    Object.keys(item).forEach((key) => {
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(item[key]);
    });
    return result;
  }, {});
  const tableHeaders = Object.keys(keyArrayObject);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageData = tableHeaders.map((header) => ({
    header,
    values: Array.isArray(keyArrayObject[header])
      ? keyArrayObject[header].slice(startIndex, endIndex)
      : [keyArrayObject[header]],
  }));

  const maxArrayLength = Math.min(
    10,
    Math.max(...pageData.map((item) => item.values.length))
  );

  return (
    <table className="mt-[5%]">
      <thead>
        <tr>
          {tableHeaders.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(maxArrayLength)].map((_, rowIndex) => (
          <tr key={rowIndex}>
            {pageData.map(({ header, values }) => (
              header !== "photo" ? (
                <td key={header}>
                  {values[rowIndex] ? values[rowIndex] : (values[rowIndex] !== null ? 0 : "")}
                </td>
              ) : (
                <td className="table-bgimage" key={header} style={{ background: `url(/image/menu-image/${values[rowIndex] ? values[rowIndex] : (values[rowIndex] !== null ? 0 : "")})`}}>
                </td>
              )
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
