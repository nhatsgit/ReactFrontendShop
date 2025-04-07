import { useCallback, useEffect, useState } from "react";
import * as ShopingCartService from "../../../apiServices/ShopingCartService";
import { FormatCurrency } from "../../../utils/FormatCurrency";
import { routePaths } from "../../../routes";
import { CaculateDiscountPrice } from "../../../utils/CaculateDiscountPrice";
import { Link } from "react-router-dom";
function MyCarts() {
    const [myCarts, setMyCarts] = useState()
    const [loading, setLoading] = useState(true);
    const FetchApi = useCallback(async () => {
        try {
            const cartData = await ShopingCartService.GetShoppingCarts();

            setMyCarts(cartData);
        } catch (e) {
            console.error(e);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 400);
        }
    }, []);

    const HandleUpdateQuantity = useCallback(async (productId, quantity) => {
        try {
            setLoading(true)
            const cartData = await ShopingCartService.addToCart(productId, quantity);
            console.log(cartData)
        } catch (e) {

        } finally {
            FetchApi();
        }
    })
    const HandleDeleteCart = useCallback(async (cartItemId) => {
        try {
            setLoading(true)
            const cartData = await ShopingCartService.deleteCartItem(cartItemId);
        } catch (e) {

        } finally {
            FetchApi();
        }
    })
    useEffect(() => {
        FetchApi();
    }, []);
    if (loading) {
        return <div>Đang cập nhật dữ liệu...</div>;
    }
    return (
        <>
            <div className="breadcrumbs">
                <ol className="breadcrumb">
                    <h1>Giỏ Hàng Của Tôi</h1>
                </ol>
            </div>
            <section id="cart_items" >
                {

                    <div className="container" >

                        <div className="table-responsive cart_info">
                            <table className="table table-condensed">
                                <thead>
                                    <tr className="cart_menu">
                                        <td className="image" style={{ width: "200px" }}>Ảnh</td>
                                        <td className="description">Tên sản phẩm</td>
                                        <td className="price">Đơn Giá</td>
                                        <td className="quantity">Số Lượng</td>
                                        <td className="total">Thành Tiền</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        myCarts.cartDetails.map((cartItem, index) => {
                                            return <tr key={index}>
                                                <td className="cart_product" style={{ width: "200px" }}>
                                                    <Link to={`${routePaths.productDetails}?id=${cartItem.product._id}`}>
                                                        <img src={`${process.env.REACT_APP_API_URL}${cartItem.product.anhDaiDien}`} alt="" width={120} height={100} />
                                                    </Link>
                                                </td>
                                                <td className="cart_description">
                                                    <Link to={`${routePaths.productDetails}?id=${cartItem.product._id}`}>
                                                        <h4>{cartItem.product.tenSp}</h4>
                                                        <p>Web ID: {cartItem.product.productId}</p>
                                                    </Link>
                                                </td>
                                                <td className="cart_price">
                                                    <p>{FormatCurrency(cartItem.price)}</p>
                                                </td>
                                                <td className="cart_price">
                                                    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                                                        <button onClick={() => HandleUpdateQuantity(cartItem.product._id, 1)} style={{ margin: '0 5px', border: 'none', width: '20px' }}>+</button>
                                                        <p style={{ margin: '0 10px', textAlign: 'center' }}>{cartItem.quanity}</p>
                                                        {cartItem.quanity > 1 && (
                                                            <button onClick={() => HandleUpdateQuantity(cartItem.product._id, -1)} style={{ margin: '0 5px', border: 'none', width: '20px' }}>-</button>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="cart_total" id="cartTotal">
                                                    <p className="cart_total_price" id="totalPrice">{FormatCurrency(cartItem.quanity * cartItem.price)}</p>
                                                </td>
                                                <td className="cart_delete">
                                                    <a className="cart_quantity_delete" onClick={() => HandleDeleteCart(cartItem._id)}><i className="fa fa-times"></i></a>
                                                </td>
                                            </tr>
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>

                        <h1 style={{ textAlign: "right", color: "red" }}>Tổng đơn hàng: {FormatCurrency(myCarts.totalPrice)}</h1>


                        <div style={{ textAlign: "right" }}>
                            <p>
                                <button type="button" className="btn btn-fefault cart">
                                    <Link to={`${routePaths.checkout}`} style={{ color: "white" }} onMouseOver={(e) => e.target.style.color = 'black'}
                                        onMouseOut={(e) => e.target.style.color = 'white'}>Đặt hàng</Link>
                                </button>
                            </p>
                        </div>
                    </div>

                }
            </section>
        </>
    );
}

export default MyCarts;