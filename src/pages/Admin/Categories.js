import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { routePaths } from "../../routes";
import { GetCategories } from "../../apiServices/ProductService";

function ProductCategories() {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await GetCategories();
                setCategories(res);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchApi();
    }, []);

    return (
        <>
            <div className="container mt-4" style={{ textAlign: "left" }}>
                <p>
                    <h1 style={{ fontSize: "40px" }}>Quản Lý Danh Mục</h1>
                    <Link to={routePaths.createProductCategory} style={{ color: "blue", textDecoration: "underline" }}>Create New</Link>
                </p>
                <div className="table-responsive">
                    <table className="table table-bordered ">
                        <thead className="table-dark">
                            <tr>
                                <th>ProductCategoryId</th>
                                <th>Tên Loại</th>
                                <th>Ảnh Đại Diện</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categories.map((c, index) => {
                                    return <tr key={index}>
                                        <td>{c.productCategoryId}</td>
                                        <td>{c.tenLoai}</td>
                                        <td>
                                            <img
                                                src={`${process.env.REACT_APP_API_URL}${c.anhDaiDien}`}
                                                alt="Ảnh Đại Diện"
                                                className="img-thumbnail"
                                                width="75"
                                                height="75"
                                            />
                                        </td>
                                        <td>
                                            <Link to={routePaths.editProductCategory} style={{ color: "blue", textDecoration: "underline" }}>
                                                Sửa
                                            </Link> |

                                            <Link to={routePaths.deleteProductCategory} style={{ color: "blue", textDecoration: "underline" }}>
                                                Xóa
                                            </Link>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default ProductCategories;
