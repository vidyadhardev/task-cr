import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillEdit, AiTwotoneDelete } from 'react-icons/ai';



function Products() {
    const [product, setProduct] = useState([]);
    const [pageData, setPageData] = useState([])
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(0)

    useEffect(() => {
        getProduct();


    }, [page]);

    console.log(product)
    const getProduct = async () => {
        let result = await fetch('http://localhost:5000/products');
        result = await result.json();
        setProduct(result);

    }
    console.log(product)

    const deleteData = async (id) => {
        //console.warn(id)
        var result = fetch(`http://localhost:5000/product/${id}`, {
            method: "DELETE",
        });
        alert('Are You Sure To Delete Data...?')
        result = await result.json()

    }

    getProduct()

    //handle Next
    const handleNext = () => {
        if (page === pageCount) return page;
        setPage(page + 1)


    }
    //handlePrevious
    const handlePrevious = () => {
        if (page === 1) return page;
        setPage(page - 1)
    }
    //console.log(pageCount)

    useEffect(() => {
        const pagedatacount = Math.ceil(product.length / 5)
        setPageCount(pagedatacount)

        if (page) {
            const LIMIT = 5;
            const skip = LIMIT * page
            const dataskip = product.slice(page === 1 ? 0 : skip - LIMIT, skip)
            setPageData(dataskip)
        }
    }, [product])


    return (
        <>

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>password</th>

                        <th>Delete || Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pageData.map((item, index) =>
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.remail}</td>
                                <td>{item.rpassword}</td>

                                <td><button onClick={() => deleteData(item._id)}><AiTwotoneDelete /></button>
                                    <Link to={'/update/' + item._id}><AiFillEdit /></Link>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <div >
                <nav aria-label="Page navigation example">
                    <ul className="pagination ">
                        <li className="page-item">
                            <a className="page-link" sty href="#" aria-label="Previous" onClick={handlePrevious} disabled={page === 1}>
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </a>
                        </li>
                        {
                            Array(pageCount).fill(null).map((ele, index) => {
                                return (


                                    <li className="page-item"><a className="page-link" href="#" active={page === index + 1 ? true : false} onClick={() => { setPage(index + 1) }}>{index + 1}</a></li>
                                )
                            })
                        }
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Next" onClick={handleNext} disabled={page === pageCount}>
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
};
export default Products;