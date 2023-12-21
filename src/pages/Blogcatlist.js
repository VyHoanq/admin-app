import React, { useEffect } from 'react'
import { Table } from "antd";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../features/bcategory/bpcategorySlice';
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

const Blogcatlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  const bCatState = useSelector((state) => state.bCategory.bCategories)
  
  const data1 = [];
  for (let i = 0; i < bCatState.length; i++) {
    data1.push({
      key: i + 1,
      name: bCatState[i].title,

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
      <h3 className='mb-4 title'>Blog Category List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />

      </div>
    </div>
  )
}

export default Blogcatlist