import React from 'react';

const ListElement = ({ date, name, start, end, time }) => {
  return (
    <tr className="list__item">
      <td className="list__item--date">{date}</td>
      <td className="list__item--name">{name}</td>
      <td className="list__item--start">{start}</td>
      <td className="list__item--end">{end}</td>
      <td className="list__item--hours">{time} Hrs</td>
    </tr>
  )
};

export default ListElement;