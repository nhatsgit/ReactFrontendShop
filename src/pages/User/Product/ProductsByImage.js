
import ListProduct from "../../../component/User/Products/ListProduct";
import { useEffect, useState } from "react";
import ImageModal from "../../../component/User/SearchForm/ImageModal";

function SearchByImagePage() {

    const [products, setProducts] = useState(null);

    return (
        <>
            <h2 style={{
                textTransform: 'capitalize',
            }} className="title text-center">Tìm kiếm bằng hình ảnh</h2>
            <ImageModal setProducts={setProducts}></ImageModal>
            <br></br>
            {products ?
                <section>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="features_items">
                                    <h2 style={{
                                        textTransform: 'capitalize',
                                    }} className="title text-center">Kết quả tìm kiếm</h2>

                                    <ListProduct listProduct={products} size={12} uiSize={'3'} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section> : <>Hãy chọn ảnh để tìm kiếm</>
            }
        </>
    );
}

export default SearchByImagePage;