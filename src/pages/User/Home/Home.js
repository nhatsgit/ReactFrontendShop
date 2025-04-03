import Slider from "../../../component/User/Slider/Slider";
import ListProduct from "../../../component/User/Products/ListProduct";
import * as ProductService from "../../../apiServices/ProductService";
import { useEffect, useState } from "react";
import CategoryList from "../../../component/User/CategoryList/CategoryList";

function Home() {
    const [products, setProducts] = useState([]);
    const [slider, setSlider] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {

            try {
                const suggestProduct = await ProductService.GetRandomProduct();
                const sliderProduct = await ProductService.GetRandom3Product();

                setProducts(suggestProduct);
                setSlider(sliderProduct);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
            finally {

            }
        }
        fetchApi();
    }, []);
    return (
        <>
            <Slider products={slider} />
            <CategoryList></CategoryList>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="features_items">
                                <h2 style={{
                                    textTransform: 'capitalize',
                                }} className="title text-center">Gợi ý hôm nay</h2>

                                <ListProduct listProduct={products} size={12} uiSize={'3'} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default Home;