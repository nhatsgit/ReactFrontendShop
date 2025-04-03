import { useLocation } from "react-router-dom";
import style from "./Shop.module.css"
import * as ProductService from "../../../apiServices/ProductService";
import { useEffect, useState } from "react";
import ListProduct from "../../../component/User/Products/ListProduct";
import CategoryFilter from "../../../component/User/FilterProduct/CategoryFilter";
import PriceFilter from "../../../component/User/FilterProduct/PriceFilter";

function Shop() {
    const query = new URLSearchParams(useLocation().search);
    const shopId = query.get('id');
    const [shop, setShop] = useState({})
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [keyword, setKeyword] = useState()
    const [totalPage, settotalPage] = useState(5)
    const [categories, setCategories] = useState([]);
    const [currentFilter, setCurrentFilter] = useState({
        keyword: null,
        minPrice: 0,
        maxPrice: null,
        categoryId: null
    });
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const shop = await ProductService.GetShop(shopId)
                setShop(shop)

                const res = await ProductService.QueryProduct({ shopId: shopId, pageSize: 9, pageNumber: currentPage });
                const categories = await ProductService.GetCategoriesFromQuery({ shopId: shopId });
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
    }, [shopId]);
    const HandleSelectPage = async (pageNumber) => {
        try {
            const res = await ProductService.QueryProduct({ ...currentFilter, keyword: keyword, shopId: shopId, pageSize: 9, pageNumber: pageNumber });
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
    const HandleFilterByCategory = async (categoryId) => {

        try {
            const res = await ProductService.QueryProduct({ ...currentFilter, shopId: shopId, categoryId: categoryId, pageSize: 9, pageNumber: 1 });
            window.scrollTo({
                top: 400,
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
            const res = await ProductService.QueryProduct({ ...currentFilter, keyword: keyword, shopId: shopId, minPrice: _minPrice, maxPrice: _maxPrice, pageSize: 9, pageNumber: 1 });
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
            const res = await ProductService.QueryProduct({ ...currentFilter, keyword: keyword, shopId: shopId, pageSize: 9, pageNumber: 1 });
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
                    <div className="row">
                        <div className="col-sm-12 padding-right">
                            <h1>{shop.tenCuaHang}</h1>
                            <hr />
                            <div className="row">
                                <div className="col-sm-5">
                                    <div className={style.overlay}></div>
                                    <div
                                        className={style.rectangle}
                                        style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL}${shop.anhBia})` }}
                                    >
                                        <img className={style.circle} src={`${process.env.REACT_APP_API_URL}${shop.anhDaiDien}`} alt="Avatar" />

                                    </div>
                                </div>
                                <div
                                    className="col-sm-3"
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        height: "var(--col-height)",
                                    }}
                                >
                                    <p>
                                        Địa Chỉ: <span className={style.textmodel}>{shop.diaChi}</span>
                                    </p>
                                    <p>
                                        Liên Hệ: <span className={style.textmodel}>{shop.lienHe}</span>
                                    </p>
                                    <p>
                                        Ngày Tạo:{" "}
                                        <span className={style.textmodel}>
                                            {shop.ngayTao}
                                        </span>
                                    </p>
                                </div>
                                <div
                                    className="col-sm-3"
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        height: "var(--col-height)",
                                    }}
                                >
                                    <p>
                                        Loại Shop:{" "}
                                        <span className={style.textmodel}>{shop.shopCategoryId}</span>
                                    </p>
                                    <p>
                                        Số sản phẩm: <span className={style.textmodel}>{shop.shopCategoryId}</span>
                                    </p>
                                    <p>
                                        Số lượng bán:{" "}
                                        <span className={style.textmodel}>{shop.shopCategoryId}</span>
                                    </p>
                                </div>
                            </div>

                            <hr />

                        </div>
                    </div>
                    <h2 style={{ textTransform: "capitalize" }} className="title text-center">Sản phẩm của shop</h2>
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
                                                            value={keyword} onChange={(e) => { setKeyword(e.target.value) }} style={{ width: "200px" }} placeholder="Tìm sản phẩm trong shop" />
                                                        </td>

                                                    </tr>
                                                </tbody>
                                            </table>
                                            <br></br>
                                            <center><button onClick={() => { HandleFilterByKeyword() }} type="button">Lọc</button></center>
                                        </div>
                                    </div>

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

export default Shop;