import React, { useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../features/brand/brandSlice';
import { getCategories } from '../features/pcategory/pcategorySlice';
import { getColors } from '../features/color/colorSlice';
import Multiselect from "react-widgets/Multiselect";
import "react-widgets/styles.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dropzone from 'react-dropzone'
import { delImg,  uploadImg } from '../features/upload/uploadSlice';

let schema = Yup.object().shape({
    title: Yup.string().required('Title is Required'),
    description: Yup.string().required('description is required'),
    price: Yup.number().required('Price is required'),
    brand: Yup.string().required('Brand is Required'),
    category: Yup.string().required('Category is Required'),
    // color:Yup.array().required('Colors are Required'),
    quantity: Yup.number().required('Quantity is required'),

});



const AddProduct = () => {

    const dispatch = useDispatch();
    const [color, setColor] = useState([

    ]);
    useEffect(() => {
        dispatch(getBrands());
        dispatch(getCategories());
        dispatch(getColors());
        formik.values.color = color;
    }, []);

    const brandState = useSelector((state) => state.brand.brands);
    const catState = useSelector((state) => state.pCategory.pCategories);
    const colorState = useSelector((state) => state.color.colors);
    const imgState = useSelector((state) => state.upload.images);
    const colors = [];
    colorState.forEach((i) => {
        colors.push({
            _id: i._id,
            color: i.title
        })
    });

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            price: '',
            brand: '',
            category: '',
            color: [],
            quantity: ''
        },
        validationSchema: schema,
        onSubmit: (values) => {
            // Display an alert with the product information
            window.alert(`Product added successfully!\nTitle: ${values.title}\nDescription: ${values.description}\nPrice: ${values.price}\nBrand: ${values.brand}\nCategory: ${values.category}\nColor: ${values.color.join(', ')}\nQuantity: ${values.quantity}`);
        },
    });
    const [desc, setDesc] = useState();
    const handleDesc = (e) => {
        setDesc(e);
        formik.setFieldValue('description', e);
    };

    return (
        <div>
            <h3 className='mb-4 title'>Add Product</h3>
            <div>
                <form onSubmit={formik.handleSubmit} className='d-flex gap-3 flex-column'>
                    <CustomInput
                        type='text'
                        label='Enter Product Title'
                        name='title'
                        onChange={formik.handleChange('title')}
                        onBlur={formik.handleBlur('title')}
                        value={formik.values.title}
                    />
                    <div className='error'>{formik.touched.title && formik.errors.title}</div>

                    <div className='mb-3'>
                        <ReactQuill
                            theme='snow'
                            name='description'
                            onChange={formik.handleChange('description')}
                            value={formik.values.description}
                        />
                        <div className='error'>
                            {formik.touched.description && formik.errors.description}
                        </div>
                    </div>

                    <CustomInput
                        type='number'
                        label='Enter Product Price'
                        name='price'
                        onCh={formik.handleChange('price')}
                        onBlr={formik.handleBlur('price')}
                        val={formik.values.price}
                    />
                    <div className='error'>{formik.touched.price && formik.errors.price}</div>

                    <select
                        name='brand'
                        onChange={formik.handleChange('brand')}
                        onBlur={formik.handleBlur('brand')}
                        value={formik.values.brand}
                        className='form-control py-3 mb-3'
                        id=''
                    >
                        <option value=''>Select Brand</option>
                        {brandState.map((brand, index) => (
                            <option key={index} value={brand.title}>
                                {brand.title}
                            </option>
                        ))}
                    </select>
                    <div className='error'>{formik.touched.brand && formik.errors.brand}</div>
                    <select
                        name='category'
                        onChange={formik.handleChange('category')}
                        onBlur={formik.handleBlur('category')}
                        value={formik.values.category}
                        className='form-control py-3 mb-3'
                        id=''
                    >
                        <option value=''>Select Category</option>
                        {catState.map((category, index) => (
                            <option key={index} value={category.title}>
                                {category.title}
                            </option>
                        ))}
                    </select>
                    <div className='error'>{formik.touched.category && formik.errors.category}</div>
                    <Multiselect
                        name='color'
                        dataKey="id"
                        textField="color"
                        data={colors}
                        onChange={(e) => setColor(e)}

                    />
                    <div className='error'>{formik.touched.color && formik.errors.color}</div>

                    <CustomInput
                        name='quantity'
                        onCh={formik.handleChange('quantity')}
                        onBlr={formik.handleBlur('quantity')}
                        val={formik.values.quantity}
                        type='number' label='Enter Product Quantity' />
                    <div className='error'>{formik.touched.quantity && formik.errors.quantity}</div>
                    <div className='bg-white border-1 p-5 text-center'>
                        <Dropzone
                            onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>
                                            Drag 'n' drop some files here, or click to select files
                                        </p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    <div className="showimages d-flex flex-wrap gap-3">
                        {imgState?.map((i, j) => {
                            return (
                                <div className=" position-relative" key={j}>
                                    <button
                                        type="button"
                                        onClick={() => dispatch(delImg(i.public_id))}
                                        className="btn-close position-absolute"
                                        style={{ top: "10px", right: "10px" }}
                                    ></button>
                                    <img src={i.url} alt="" width={200} height={200} />
                                </div>
                            );
                        })}
                    </div>
                    
                    <button
                        className='btn btn-success border-0 rounded-3 my-5'
                        type='submit'
                    >
                        Add Product
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddProduct;