import { Navigate, useNavigate } from "react-router-dom";
import { addToCart } from "../../../apiServices/ShopingCartService";
import { routePaths } from "../../../routes";

function Slider({ products }) {
    const navigate = useNavigate();

    if (!products || products.length === 0) {
        return <div>Đang tải...</div>;
    }
    const HandleAddToCart = async (productId) => {
        try {
            const res = await addToCart(productId, 1);
        } catch (error) {

        } finally {
            navigate(routePaths.mycarts)
        }
    }
    return (
        <>
            <section id="slider">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div id="slider-carousel" className="carousel slide" data-ride="carousel">
                                <ol className="carousel-indicators">
                                    <li data-target="#slider-carousel" data-slide-to="0" className=""></li>
                                    <li data-target="#slider-carousel" data-slide-to="1" className=""></li>
                                    <li data-target="#slider-carousel" data-slide-to="2" className="active"></li>
                                </ol>

                                <div className="carousel-inner">
                                    {products.map((product, index) => (
                                        <div key={index} className={index === products.length - 1 ? 'item active' : 'item'}>
                                            <div className="col-sm-6">
                                                <h1><span>R</span>-EACTJS</h1>
                                                <h2>{product.tenSp}</h2>
                                                <p>{product.moTa}</p>
                                                <button type="button" onClick={() => { HandleAddToCart(product.productId) }} className="btn btn-default get">Thêm vào giỏ</button>
                                            </div>
                                            <div className="col-sm-6">
                                                <img src={`https://localhost:7233${product.anhDaiDien}`} width={441} height={215} className="girl img-responsive" alt="" />
                                            </div>
                                        </div>
                                    ))}

                                </div>

                                <a href="#slider-carousel" className="left control-carousel hidden-xs" data-slide="prev">
                                    <i className="fa fa-angle-left"></i>
                                </a>
                                <a href="#slider-carousel" className="right control-carousel hidden-xs" data-slide="next">
                                    <i className="fa fa-angle-right"></i>
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Slider;