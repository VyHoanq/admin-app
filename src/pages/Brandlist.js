import React, { useEffect } from 'react'
import { Table } from "antd";
import { useDispatch, useSelector } from 'react-redux';

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { getBrands } from '../features/brand/brandSlice';
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

const Brandlist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands())
  }, []);

  const brandState = useSelector((state) => state.brand.brands);
  const data1 = [];
for (let i = 0; i < brandState.length; i++) {
  data1.push({
    key: i,
    name: brandState[i].title,
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
      <h3 className='mb-4 title'>Product Brand</h3>
      <div>
        <Table columns={columns} dataSource={data1} />

      </div>
    </div>
  )
}

export default Brandlist