import { useEffect, useState } from "react";
import * as ShopingCartService from "../../../apiServices/ShopingCartService";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FormatCurrency } from "../../../utils/FormatCurrency";
import { CaculateDiscountPrice } from "../../../utils/CaculateDiscountPrice";
import { GetMyInfo } from "../../../apiServices/AuthService";
import VoucherModal from "../../../component/User/VoucherList/MyVouchers";
import { routePaths } from "../../../routes";
import AddressSelector from "../../../component/Context/Address/AddressSelector";
function CheckOut() {
    const query = new URLSearchParams(useLocation().search);
    const id = query.get('id');
    const navigate = useNavigate();
    const [cart, setCart] = useState({})
    const [user, setUser] = useState({})
    const [vouchers, setVouchers] = useState([])
    const [loading, setLoading] = useState(true);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [paymentId, setPaymentId] = useState(2);
    const [shippingAdress, setShippingAdress] = useState("");
    const [note, setNote] = useState("");
    const [voucherId, setVoucherId] = useState(1);

    const handlePaymentChange = (event) => {
        setPaymentId(Number(event.target.value));
    };

    useEffect(() => {
        const FetchProduct = async () => {
            try {
                const res = await ShopingCartService.GetShoppingCarts();
                const info = await GetMyInfo();

                setCart(res);
                setUser(info);
                setShippingAdress(info.address)
                setNote(`${info.userName}(${info.phoneNumber}) đặt hàng`)
            } catch (error) {
                console.error("Error fetching order data:", error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        }
        FetchProduct()
    }, []);


    if (loading) {
        return <div>Đang tải...</div>;
    }
    const HandleCheckOut = async (e) => {

        e.preventDefault();
        const order = await ShopingCartService.CheckOutCart({
            shippingAddress: shippingAdress,
            payment: paymentId == 1 ? "Thanh toán khi nhận hàng" : "Thanh toán trên website",
            notes: note
        })
        navigate(`${routePaths.orderdetails}?id=${order._id}`)

    };
    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 padding-right" style={{ textAlign: "left" }}>
                            <form onSubmit={HandleCheckOut}>

                                <h2>Điền thông tin đơn hàng</h2>

                                <div style={{ paddingLeft: "1em" }}>
                                    <div className="form-group">
                                        <label className="control-label"><strong>Địa chỉ</strong></label><br />
                                        <input className="form-control" name="address" id="address" type="text" style={{ width: "500px", display: "none" }} />
                                        <textarea id="currentAddress" className="form-control" value={shippingAdress} onChange={(e) => { setShippingAdress(e.target.value) }} readOnly></textarea>

                                    </div>


                                    <div className="form-group">
                                        <label >Ghi Chú</label>
                                        <input className="form-control" value={note} onChange={(e) => { setNote(e.target.value) }} />
                                    </div>
                                </div>

                                <section id="cart_items">
                                    <label style={{ paddingLeft: "1em" }}>Chi tiết đơn hàng</label>

                                    <div className="container">
                                        <div className="breadcrumbs">
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
                                                        cart.cartDetails.map((cartItem, index) => {
                                                            return <tr key={index}>
                                                                <td className="cart_product" style={{ width: "200px" }}>
                                                                    <Link to={`${routePaths.productDetails}?id=${cartItem.product._id}`}>
                                                                        <img src={`${process.env.REACT_APP_API_URL}${cartItem.product.anhDaiDien}`} alt="" width={120} height={100} /></Link>
                                                                </td>
                                                                <td className="cart_description">
                                                                    <h4><a >{cartItem.product.tenSp}</a></h4>
                                                                    <p>Web ID: {cartItem.product.productId}</p>
                                                                </td>
                                                                <td className="cart_price">
                                                                    <p>{FormatCurrency(cartItem.price)}</p>
                                                                </td>
                                                                <td className="cart_price">
                                                                    <p>{cartItem.quanity}</p>
                                                                </td>
                                                                <td className="cart_total" id="cartTotal">
                                                                    <p className="cart_total_price" id="totalPrice">{FormatCurrency(cartItem.quanity * cartItem.price)}</p>
                                                                </td>

                                                            </tr>
                                                        })
                                                    }

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </section>

                                <div style={{ paddingLeft: "1em" }}>
                                    <div className="form-group">
                                        <label className="control-label">Chọn phương thức thanh toán</label>

                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                value={1}
                                                id="payment_direct"
                                                checked={paymentId === 1}
                                                onChange={handlePaymentChange}
                                                required
                                            />
                                            <label className="form-check-label" htmlFor="payment_direct">
                                                Thanh toán khi nhận hàng
                                            </label>
                                            <br />
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                value={2}
                                                id="payment_online"
                                                checked={paymentId === 2}
                                                onChange={handlePaymentChange}
                                                required
                                            />
                                            <label className="form-check-label" htmlFor="payment_online">
                                                Thanh toán trên website
                                            </label>
                                        </div>


                                    </div>
                                    <input type="submit" value="Đặt Hàng" className="btn btn-primary" />

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default CheckOut;