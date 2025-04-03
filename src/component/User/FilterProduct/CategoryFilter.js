import { useEffect, useState } from "react";

function CategoryFilter({ categories, HandleFilterCallBack }) {
    const [currentId, setCurrentId] = useState();
    useEffect(() => {
        setCurrentId(null);
    }, [categories]);
    const HandleCheckedFilter = (categoryId) => {
        if (categoryId == currentId) {
            categoryId = null;
        }
        setCurrentId(categoryId);
        HandleFilterCallBack(categoryId);
    }
    return (
        <div className="panel-group category-products" id="categoryView">

            <h2>Danh mục</h2>
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h4 className="panel-title" style={{ color: "gray", display: "flex", alignItems: "center" }}>
                        <label style={{ alignItems: "center", margin: "5px 0px 5px 30px" }}>
                            <input type="radio" id="option1" name="ratio"
                                onChange={() => HandleCheckedFilter(null)} checked={currentId == null} style={{ marginRight: "10px" }} />
                            Tất cả
                        </label>
                    </h4>
                </div>
            </div>
            {
                categories.map((category, index) => (

                    <div key={index} className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title" style={{ color: "gray", display: "flex", alignItems: "center" }}>
                                <label style={{ alignItems: "center", margin: "5px 0px 5px 30px" }}>
                                    <input type="radio" id="option1" name="ratio"
                                        value={category.id} onChange={() => { }} onClick={(e) => HandleCheckedFilter(e.target.value)} checked={currentId == category.id}
                                        style={{ marginRight: "10px" }} />
                                    {category.tenLoai}
                                </label>
                            </h4>
                        </div>
                    </div>

                ))
            }
        </div>
    );
}

export default CategoryFilter;