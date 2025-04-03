import { useLocation } from "react-router-dom";
import * as ProductService from "../../../apiServices/ProductService";
import { useEffect, useState } from "react";
import ListProduct from "../../../component/User/Products/ListProduct";
import CategoryFilter from "../../../component/User/FilterProduct/CategoryFilter";
import PriceFilter from "../../../component/User/FilterProduct/PriceFilter";

function ProductByCategory() {
    const query = new URLSearchParams(useLocation().search);
    const categoryId = query.get('id');
    const [category, setCategory] = useState()
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [keyword, setKeyword] = useState()
    const [totalPage, settotalPage] = useState(5)

    const [currentFilter, setCurrentFilter] = useState({
        keyword: null,
        minPrice: 0,
        maxPrice: null,
        categoryId: null
    });
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const category = await ProductService.GetCategoryName(categoryId)
                setCategory(category)
                const res = await ProductService.QueryProduct({ categoryId: categoryId, pageSize: 9, pageNumber: currentPage });
                setProducts(res);
                setCurrentPage(res.pageNumber)
                settotalPage(res.pageCount)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
            finally {
            }
        }
        fetchApi();
    }, [categoryId]);
    const HandleSelectPage = async (pageNumber) => {
        try {
            const res = await ProductService.QueryProduct({ ...currentFilter, keyword: keyword, categoryId: categoryId, pageSize: 9, pageNumber: pageNumber });
            window.scrollTo({
                top: 400,
                behavior: 'smooth',
            });

            setProducts(res)
            setCurrentPage(res.pageNumber)
            settotalPage(res.pageCount)
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
        }
    }

    const HandleFilterByPrice = async (_minPrice, _maxPrice) => {
        try {
            const res = await ProductService.QueryProduct({ ...currentFilter, keyword: keyword, categoryId: categoryId, minPrice: _minPrice, maxPrice: _maxPrice, pageSize: 9, pageNumber: 1 });
            window.scrollTo({
                top: 400,
                behavior: 'smooth',
            });

            setProducts(res)
            setCurrentPage(res.pageNumber)
            settotalPage(res.pageCount)
            setCurrentFilter({ ...currentFilter, minPrice: _minPrice, maxPrice: _maxPrice })

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
        }
    }
    const HandleFilterByKeyword = async () => {
        try {
            console.log(keyword)
            const res = await ProductService.QueryProduct({ ...currentFilter, keyword: keyword, categoryId: categoryId, pageSize: 9, pageNumber: 1 });
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });

            setProducts(res)
            setCurrentPage(res.pageNumber)
            settotalPage(res.pageCount)
            setCurrentFilter({ ...currentFilter, keyword })

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
        }
    }

    return (
        <>
            <section>
                <div className="container">
                    <h2 style={{ textTransform: "capitalize" }} className="title text-center">Danh mục sản phẩm {category}</h2>
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="left-sidebar">
                                <form>
                                    <div className="price-range">
                                        <div className="well">
                                            <h2>Tìm kiếm</h2>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td><input id="keyword"
                                                            value={keyword} onChange={(e) => { setKeyword(e.target.value) }} style={{ width: "200px" }} placeholder="Tìm sản phẩm" />
                                                        </td>

                                                    </tr>
                                                </tbody>
                                            </table>
                                            <br></br>
                                            <center><button onClick={() => { HandleFilterByKeyword() }} type="button">Lọc</button></center>
                                        </div>
                                    </div>

                                    <PriceFilter HandleFilterCallBack={HandleFilterByPrice}></PriceFilter>


                                    <div className="shipping text-center">

                                        <img src="../images/home/shipping.jpg" alt="" />
                                    </div>
                                </form>
                            </div>
                        </div>
                        {products ?
                            <>
                                <div className="col-sm-9 padding-right" id="searchResults">
                                    <ListProduct listProduct={products.items} size={9} uiSize={'4'} />
                                </div>
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
                </div>
            </section>

        </>
    );
}

export default ProductByCategory;