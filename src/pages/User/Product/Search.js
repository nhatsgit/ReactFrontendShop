import { useLocation, useNavigate } from "react-router-dom";
import ListProduct from "../../../component/User/Products/ListProduct";
import * as ProductService from "../../../apiServices/ProductService";
import { useEffect, useState } from "react";
import CategoryFilter from "../../../component/User/FilterProduct/CategoryFilter";
import PriceFilter from "../../../component/User/FilterProduct/PriceFilter";

function Search() {
    const query = new URLSearchParams(useLocation().search);
    const keyword = query.get('keyword');
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, settotalPage] = useState(5)
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentFilter, setCurrentFilter] = useState({
        minPrice: 0,
        maxPrice: null,
        categoryId: null
    });
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await ProductService.QueryProduct({ keyword: keyword, pageSize: 9, pageNumber: currentPage });
                const categories = await ProductService.GetCategoriesFromQuery({ keyword: keyword });
                setProducts(res);
                setCurrentPage(res.pageNumber)
                settotalPage(res.pageCount)
                setCategories(categories)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
            finally {
            }
        }
        fetchApi();
    }, [keyword]);
    const HandleSelectPage = async (pageNumber) => {
        try {
            const res = await ProductService.QueryProduct({ ...currentFilter, keyword: keyword, pageSize: 9, pageNumber: pageNumber });
            window.scrollTo({
                top: 0,
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
    const HandleFilterByCategory = async (categoryId) => {
        if (categoryId === currentFilter.categoryId) {
            categoryId = null;
        }
        try {
            const res = await ProductService.QueryProduct({ ...currentFilter, keyword: keyword, categoryId: categoryId, pageSize: 9, pageNumber: 1 });
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
            setProducts(res)
            setCurrentPage(res.pageNumber)
            settotalPage(res.pageCount)
            setCurrentFilter({ ...currentFilter, categoryId })
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
        }
    }
    const HandleFilterByPrice = async (_minPrice, _maxPrice) => {
        try {
            const res = await ProductService.QueryProduct({ ...currentFilter, keyword: keyword, minPrice: _minPrice, maxPrice: _maxPrice, pageSize: 9, pageNumber: 1 });
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });

            setProducts(res)
            setCurrentPage(res.pageNumber)
            settotalPage(res.pageCount)
            setCurrentFilter({ ...currentFilter, _minPrice, _maxPrice })

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
        }
    }
    if (!products) {
        return <h2 style={{ textTransform: "capitalize" }} className="title text-center">Không tìm thấy kết quả tìm kiếm {keyword}</h2>
    }
    return (
        <>
            <h2 style={{ textTransform: "capitalize" }} className="title text-center">Kết quả tìm kiếm cho từ khóa `{keyword}`</h2>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="left-sidebar">
                                <form>

                                    <CategoryFilter categories={categories} HandleFilterCallBack={HandleFilterByCategory}></CategoryFilter>
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

export default Search;