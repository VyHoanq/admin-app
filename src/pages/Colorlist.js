import React, { useEffect } from 'react'
import { Table } from "antd";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getColors } from '../features/color/colorSlice';
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Colorlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getColors());
  },[]);
  const colorState = useSelector((state) => state.color.colors)
  const data1 = [];
  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: i + 1,
      name: colorState[i].title,
      action: (
        <>
          <Link className='fs-3 text-danger' to='/'>
            <FaEdit />
          </Link>
          <Link className='fs-3 text-danger ms-3' to='/'>
            <MdDelete />
          </Link>
        </>
      ),
    });
  }
  return (
    <div>
      <h3 className='mb-4 title'>Color List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />

      </div>
    </div>
  )
}

export default Colorlist