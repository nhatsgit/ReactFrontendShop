import { useEffect, useState } from "react";
import styles from "../Seller.module.css"
import { QueryProductCurrentShop } from "../../../apiServices/Seller/ProductSellerServices";
import ProductListSeller from "../../../component/Seller/Product/ProductListSeller";

function Products() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [keyword, setKeyword] = useState('')
    const [totalPage, settotalPage] = useState(5)
    const [currentFilter, setCurrentFilter] = useState({
        keyword: null,
        daAn: false,
        daHet: false,
    });
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await QueryProductCurrentShop({ ...currentFilter, pageSize: 5, pageNumber: currentPage });
                setProducts(res.items);
                setCurrentPage(res.pageNumber)
                settotalPage(res.pageCount)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
            finally {
            }
        }
        fetchApi();
    }, []);
    const HandleSelectPage = async (pageNumber) => {
        try {
            const res = await QueryProductCurrentShop({ ...currentFilter, pageSize: 5, pageNumber: pageNumber });
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });

            setProducts(res.items)
            setCurrentPage(res.pageNumber)
            settotalPage(res.pageCount)
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
        }
    }
    const HandleSearchProduct = async () => {
        try {
            const res = await QueryProductCurrentShop({ ...currentFilter, keyword: keyword, pageSize: 5, pageNumber: 1 });
            setProducts(res.items);
            setCurrentPage(res.pageNumber)
            settotalPage(res.pageCount)
            setCurrentFilter({ ...currentFilter, keyword })
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        finally {
        }
    }
    return (
        <div className={styles.main_content}>


            <h1>Danh sách sản phẩm đang bán của Shop</h1>

            <div className="col-sm-8">
                <div className={styles.search_form}>
                    <input type="text" id="searchInput" value={keyword} onChange={(e) => setKeyword(e.target.value)} style={{ width: "400px", height: "50px" }} placeholder="Tìm kiếm sản phẩm..." />
                    <button onClick={HandleSearchProduct} style={{ width: "100px", height: "50px", backgroundColor: "blue", color: "white", border: "none" }}  >Tìm Kiếm</button>
                </div>
            </div>

            {products ?

                <>
                    <ProductListSeller listProduct={products}></ProductListSeller>
                    <hr />
                    <center>
                        <ul className="pagination">
                            {Array.from({ length: totalPage }, (_, index) => (
                                <li key={index} className={index === currentPage - 1 ? "active" : ""} onClick={() => HandleSelectPage(index + 1)}>
                                    <a className="page-link">{index + 1}</a>
                                </li>
                            ))}
                        </ul>

                    </center>
                </>
                : <><h1>Không có sản phẩm cần tìm</h1></>
            }
        </div>
    );
}

export default Products;
