
import { FormatCurrency } from '../../../utils/FormatCurrency';
import { Link, useNavigate } from 'react-router-dom';
import { routePaths } from '../../../routes';
import { CaculateDiscountPrice } from '../../../utils/CaculateDiscountPrice';
import * as ShopingCartService from '../../../apiServices/ShopingCartService';
function ListProduct({ listProduct, uiSize }) {
    const navigate = useNavigate();
    if (!listProduct || listProduct.length === 0) {
        return <div>Đang tải...</div>;
    }
    const HandleAddToCart = async (productId) => {
        try {
            const res = await ShopingCartService.addToCart(productId, 1);
            console.log(res);
        } catch (error) {

        } finally {
            navigate(routePaths.mycarts)
        }
    }
    return (
        <>
            {listProduct.map((product, index) => (
                <div key={index} className={`col-sm-${uiSize}`}>
                    <div className="product-image-wrapper">
                        <div className="single-products">
                            <div className="productinfo text-center">
                                <img src={`${process.env.REACT_APP_API_URL}${product.anhDaiDien}`} height={200} width={200} alt="" />
                                <p style={{
                                    textAlign: 'right',
                                    color: 'red',
                                    backgroundColor: 'yellow',
                                    display: 'inline'
                                }}>-{product.phanTramGiam}%</p>
                                <h2>{FormatCurrency(CaculateDiscountPrice(product.giaBan, product.phanTramGiam))}</h2>
                                <p>{product.tenSp}</p>
                                <a onClick={() => HandleAddToCart(product.productId)} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Bỏ Vào Giỏ</a>
                                <Link to={`${routePaths.productDetails}?id=${product.productId}`} className="btn btn-default add-to-cart"><i className="fa fa-info-circle"></i>Xem Chi Tiết</Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default ListProduct;