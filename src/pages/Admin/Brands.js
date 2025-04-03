import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { routePaths } from "../../routes";
import { GetBrands } from "../../apiServices/ProductService";

function Brands() {
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await GetBrands();
        setBrands(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchApi();
  }, []);
  return (
    <>
      <div className="container mt-4" style={{ textAlign: "left" }}>
        <div className=" mb-4 text-start">
          <h1 style={{ fontSize: "40px" }}>Thương hiệu</h1>
          <Link to={routePaths.createBrands} style={{ color: "blue", textDecoration: "underline" }}>Create New</Link>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead className="table-primary">
              <tr>
                <th >Tên Nhãn Hiệu</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                brands.map((brand, index) => {
                  return <tr key={index}>
                    <td>{brand.tenNhanHieu}</td>
                    <td className="text-center">
                      <Link to={routePaths.editBrands} style={{ color: "blue", textDecoration: "underline" }}>
                        <i className="bi bi-pencil"></i> Edit
                      </Link> |

                      <Link to={routePaths.deleteBrands} style={{ color: "blue", textDecoration: "underline" }}>
                        <i className="bi bi-trash"></i> Delete
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

export default Brands;
