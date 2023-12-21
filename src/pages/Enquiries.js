import React, { useEffect } from 'react'
import { Table } from "antd";
import { useDispatch, useSelector } from 'react-redux';

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { getEnquiries } from '../features/enquiry/enquirySlice';
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
    sorter: (a, b) => a.email.length - b.email.length,
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
  {
    title: "Status",
    dataIndex: "status",
    sorter: (a, b) => a.comment.length - b.comment.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Enquiries = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEnquiries());
  }, []);
  const enqState = useSelector((state) => state.enquiry.enquiries)
  const data1 = [];
  for (let i = 0; i < enqState.length; i++) {
    data1.push({
      key: i + 1,
      name: enqState[i].name,
      email: enqState[i].email,
      mobile:enqState[i].mobile,
      status: (
        <>
        <select name =''  className='form-control form-select'id=''>
          <option value="">Set Status</option>
        </select>
        </>
      ),
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
      <h3 className='mb-4 title'>Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data1} />

      </div>
    </div>
  )
}

export default Enquiries