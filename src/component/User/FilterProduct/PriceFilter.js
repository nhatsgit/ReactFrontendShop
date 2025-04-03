import { useState } from "react";

function PriceFilter({ HandleFilterCallBack }) {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState();
    return (
        <div className="price-range">
            <div className="well">
                <h2>Tầm Giá</h2>
                <table>
                    <tbody>
                        <tr>
                            <td><input id="minPrice" type="number" min="1000"
                                value={minPrice} onChange={(e) => { setMinPrice(e.target.value) }} style={{ width: "100px" }} placeholder="Từ ₫" />
                            </td>
                            <td>&mdash;</td>
                            <td><input id="maxPrice" type="number" min="1000"
                                value={maxPrice} onChange={(e) => { setMaxPrice(e.target.value) }} style={{ width: "100px" }} placeholder="Đến ₫" />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br></br>
                <center><button onClick={() => { HandleFilterCallBack(minPrice, maxPrice) }} type="button">Lọc</button></center>
            </div>
        </div>
    );
}

export default PriceFilter;