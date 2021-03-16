import React from "react";

const OrderTable = ({ data, action }) => {
  return (
    <tr>
      <td>
        <ul>
          {data?.items.map((x) => (
            <li>
              <small style={{ borderBottom: "1px solid gray" }}>{x.name}</small>
            </li>
          ))}
        </ul>
      </td>
      <td>{data.name}</td>
      <td>{data.mobile}</td>
      <td>{data.address}</td>
      <td>{data.pay}</td>
      <td>{data.payMethod}</td>
      <td>
        <select
          id="status"
          onChange={(e) => action(e, data._id)}
          selected
          value={data.status}
        >
          <option value="rejected">Rejected</option>
          <option value="pending">pending</option>
          <option value="delivered">Delivered</option>
        </select>
      </td>
    </tr>
  );
};

export default OrderTable;
