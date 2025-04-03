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
            const cartsWithTotal = cartData.map(cart => {
                const totalAmount = cart.cartItems.reduce((acc, item) => {
                    return acc + item.quantity * CaculateDiscountPrice(item.product.giaBan, item.product.phanTramGiam)
                }, 0);
                return { ...cart, totalAmount };
            });
            setMyCarts(cartsWithTotal);
        } catch (e) {
            console.error(e);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 400);
        }
    }, []);

    const HandleUpdateQuantity = useCallback(async (cartItemId, quantity) => {
        try {
            setLoading(true)
            const cartData = await ShopingCartService.updateCartItem(cartItemId, quantity);
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
                    myCarts.map((cart, index) => {
                        return <div className="container" key={index}>
                            <div style={{ textAlign: "left" }}>
                                <strong style={{ paddingLeft: "20px", color: "red" }}>{cart.shop.tenCuaHang}</strong>
                                <button type="button" style={{ backgroundColor: "transparent", border: "2px solid red" }}><Link to={`${routePaths.shop}?id=${cart.shop.shopId}`} style={{ color: "orangered" }}>Xem Shop</Link></button>
                            </div>
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
                                            cart.cartItems.map((cartItem, index) => {
                                                return <tr key={index}>
                                                    <td className="cart_product" style={{ width: "200px" }}>
                                                        <Link to={`${routePaths.productDetails}?id=${cartItem.product.productId}`}>
                                                            <img src={`${process.env.REACT_APP_API_URL}${cartItem.product.anhDaiDien}`} alt="" width={120} height={100} />
                                                        </Link>
                                                    </td>
                                                    <td className="cart_description">
                                                        <Link to={`${routePaths.productDetails}?id=${cartItem.product.productId}`}>
                                                            <h4>{cartItem.product.tenSp}</h4>
                                                            <p>Web ID: {cartItem.product.productId}</p>
                                                        </Link>
                                                    </td>
                                                    <td className="cart_price">
                                                        <p>{FormatCurrency(CaculateDiscountPrice(cartItem.product.giaBan, cartItem.product.phanTramGiam))}</p>
                                                    </td>
                                                    <td className="cart_price">
                                                        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                                                            <button onClick={() => HandleUpdateQuantity(cartItem.cartItemId, ++cartItem.quantity)} style={{ margin: '0 5px', border: 'none', width: '20px' }}>+</button>
                                                            <p style={{ margin: '0 10px', textAlign: 'center' }}>{cartItem.quantity}</p>
                                                            <button onClick={() => HandleUpdateQuantity(cartItem.cartItemId, --cartItem.quantity)} style={{ margin: '0 5px', border: 'none', width: '20px' }}>-</button>
                                                        </div>
                                                    </td>
                                                    <td className="cart_total" id="cartTotal">
                                                        <p className="cart_total_price" id="totalPrice">{FormatCurrency(cartItem.quantity * CaculateDiscountPrice(cartItem.product.giaBan, cartItem.product.phanTramGiam))}</p>
                                                    </td>
                                                    <td className="cart_delete">
                                                        <a className="cart_quantity_delete" onClick={() => HandleDeleteCart(cartItem.cartItemId)}><i className="fa fa-times"></i></a>
                                                    </td>
                                                </tr>
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>

                            <h1 style={{ textAlign: "right", color: "red" }}>Tổng đơn hàng: {FormatCurrency(cart.totalAmount)}</h1>


                            <div style={{ textAlign: "right" }}>
                                <p>
                                    <button type="button" className="btn btn-fefault cart">
                                        <Link to={`${routePaths.checkout}?id=${cart.shoppingCartId}`} style={{ color: "white" }} onMouseOver={(e) => e.target.style.color = 'black'}
                                            onMouseOut={(e) => e.target.style.color = 'white'}>Đặt hàng</Link>
                                    </button>
                                </p>
                            </div>
                        </div>
                    })
                }
            </section>
        </>
    );
}

export default MyCarts;