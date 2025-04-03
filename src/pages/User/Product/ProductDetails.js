import { Link, useLocation, useNavigate } from "react-router-dom";
import * as ProductService from "../../../apiServices/ProductService";
import { useEffect, useState } from "react";
import { FormatCurrency } from "../../../utils/FormatCurrency";
import { CaculateDiscountPrice } from "../../../utils/CaculateDiscountPrice";
import { routePaths } from "../../../routes";
import * as ShopingCartService from "../../../apiServices/ShopingCartService";
import style from './Product.module.css'
import ProductReviews from "../../../component/User/Products/ProductReviews";
function ProductDetails() {
    const query = new URLSearchParams(useLocation().search);
    const id = query.get('id');
    const navigate = useNavigate();
    const [product, setProduct] = useState({})
    const [productReviews, setProductReviews] = useState({})
    const [productImages, setProductImages] = useState([])
    const [category, setCategory] = useState(' ')
    const [brand, setBrand] = useState(' ')
    const [shop, setShop] = useState({})
    const [loading, setLoading] = useState(true);
    const [addToCartQuantity, setAddToCartQuantity] = useState(1);
    const [error, setError] = useState('');
    useEffect(() => {
        const groupImages = (images) => {
            const groups = [];
            for (let i = 0; i < images.length; i += 3) {
                groups.push(images.slice(i, i + 3));
            }
            return groups;
        };
        const FetchProduct = async () => {
            try {
                const res = await ProductService.GetProductById(id)
                const listImages = await ProductService.GetProductImagesById(id)
                const listReviews = await ProductService.GetProductReviews(id)
                setProductReviews(listReviews)
                setProductImages(groupImages(listImages));
                setProduct(res);
                if (res.productCategoryId) {
                    const categoryName = await ProductService.GetCategoryName(res.productCategoryId)
                    setCategory(categoryName)
                }
                if (res.brandId) {
                    const brandName = await ProductService.GetBrandName(res.brandId)
                    setBrand(brandName)
                }
                if (res.shopId) {
                    const shop = await ProductService.GetShop(res.shopId)
                    setShop(shop)
                }
            } catch (error) {
                console.error("Error fetching order data:", error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        }
        FetchProduct()
    }, [id]);
    const HandleAddToCart = async (productId, quantity) => {
        if (addToCartQuantity === '') {
            setError('Không được để trống');
        } else {
            try {

                const res = await ShopingCartService.addToCart(productId, quantity);
                console.log(res);
            } catch (error) {
                setError(error);
            } finally {
                navigate(routePaths.mycarts)
            }
        }
    }
    const HandleInputChange = (e) => {
        const newValue = e.target.value;
        if (newValue === '' || (Number(newValue) > 0)) {
            setAddToCartQuantity(newValue);
            setError('');
        }
    };
    if (loading) {
        return <div>Đang cập nhật dữ liệu...</div>;
    }


    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 padding-right">
                            <div className="product-details">
                                <div className="col-sm-5">
                                    <div className="view-product">
                                        <img src={`${process.env.REACT_APP_API_URL}${product.anhDaiDien}`} alt="" />
                                    </div>
                                    <div id="similar-product" className="carousel slide" data-ride="carousel">
                                        <div className="carousel-inner">
                                            {productImages.map((group, index) => (
                                                <div className={`item ${index === 0 ? "active" : ""}`} key={index}>
                                                    {group.map((image) => (
                                                        <a href="#" key={image.productImageId}>
                                                            <img
                                                                src={`${process.env.REACT_APP_API_URL}${image.url}`}
                                                                width={125}
                                                                height={125}
                                                                alt={`Product ${image.productId}`}
                                                            />
                                                        </a>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>

                                        <a className="left item-control" style={{ left: 0 }} href="#similar-product" data-slide="prev">
                                            <i className="fa fa-angle-left"></i>
                                        </a>
                                        <a className="right item-control" href="#similar-product" data-slide="next">
                                            <i className="fa fa-angle-right"></i>
                                        </a>
                                    </div>

                                </div>
                                <div className="col-sm-7">
                                    <div className="product-information" style={{ textAlign: "left" }}>
                                        <h2>{product.tenSp}</h2>
                                        <p>Web ID:{product.productId}</p>
                                        <p style={{ textDecoration: "line-through" }}>{FormatCurrency(product.giaBan)}</p>
                                        <span>
                                            <span> Giá:{FormatCurrency(CaculateDiscountPrice(product.giaBan, product.phanTramGiam))}</span>


                                            <div>
                                                <input id="txtQuantity" onChange={HandleInputChange} type="number" min="1" value={addToCartQuantity} onInput={() => { }} name="quantity" />
                                                <button type="submit" className="btn btn-fefault cart">
                                                    <a onClick={() => HandleAddToCart(product.productId, addToCartQuantity)} style={{ color: "white" }} onMouseOver={(e) => (e.target.style.color = 'black')}
                                                        onMouseOut={(e) => (e.target.style.color = 'white')}><i className="fa fa-shopping-cart"></i>Bỏ vào giỏ</a>
                                                </button>
                                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                            </div>


                                        </span>
                                        {product.soLuongCon > 0
                                            ? <p><b>Số lượng còn:</b> {product.soLuongCon}</p>
                                            : <p><b style={{ color: "red" }}>------------Đã hết hàng-----------</b></p>}


                                        <p><b>Mô tả:</b> {product.moTa}</p>
                                        <p><b>Thông số:</b> {product.thongSo}</p>
                                        <p><b>Hãng:</b> {brand}</p>
                                        <p><b>Loại:</b> {category}</p>
                                        <Link to="/"><img src="../myLayout/images/product-details/share.png" className="share img-responsive" alt="" /></Link>
                                    </div>
                                </div>
                            </div >
                            <div>
                                <div className={style.mycontainer} style={{ backgroundImage: `url(${"../myLayout/images/product-details/share.png"})` }}>
                                    <div className={style.avatar}><img src={`${process.env.REACT_APP_API_URL}${shop.anhDaiDien}`} alt="Avatar"></img></div>
                                    <div className={style.mycontent}>
                                        <div className={style.text}>{shop.tenCuaHang}</div>
                                        <button type="button" className={style.mybutton}>
                                            <Link
                                                to={`${routePaths.shop}?id=${shop.shopId}`}
                                                style={{ color: "white" }}
                                                onMouseOver={(e) => (e.target.style.color = 'black')}
                                                onMouseOut={(e) => (e.target.style.color = 'white')}
                                            >
                                                Xem Shop
                                            </Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <ProductReviews reviews={productReviews}></ProductReviews>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default ProductDetails;