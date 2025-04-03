import { Link } from "react-router-dom";
import { routePaths } from "../../../routes";

function CreateProductCategory() {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8" style={{ textAlign: "left" }}>
                    <h1 className="mb-4" style={{ fontSize: "40px" }}>Create<br/>ProductCategory</h1>
                    <hr />
                    <form>
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label">Tên nhãn hiệu</label>
                            <input
                                type="text"
                                id="userName"
                                name="userName"
                                className="form-control"
                                style={{ width: "400px" }}
                            />
                            <div class="form-group">
                                <label asp-for="AnhDaiDien">Product Image</label>
                                <input type="file" asp-for="AnhDaiDien" name="imageUrl" class="form-control" id="imageInput" style={{ width: "400px" }}/>
                                <br />
                                <img src="#" id="previewImage" alt="Image preview" style={{display:"none"}}/>
                            </div>
                        </div>
                        <Link to={routePaths.productcategory} className="btn btn-primary w-100">Create</Link>
                        <div style={{ marginTop: "10px" }}>
                            <a href="/productcategory" style={{ textDecoration: "underline", color: "blue" }}>Back to List</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

function EditProductCategory() {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8" style={{ textAlign: "left" }}>
                    <h1 className="mb-4" style={{ fontSize: "40px" }}>Edit <br/> ProductCategory</h1>
                    <hr />
                    <form>
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label">Tên nhãn hiệu</label>
                            <input
                                type="text"
                                id="userName"
                                name="userName"
                                className="form-control"
                                style={{ width: "400px" }}
                            />
                            <label htmlFor="images" className="form-label">Ảnh đại diện</label>
                            <input
                                type="text"
                                id="images"
                                name="images"
                                className="form-control"
                                style={{ width: "400px" }}
                            />
                        </div>
                        <Link to={routePaths.productcategory} className="btn btn-primary w-100">Save</Link>
                        <div style={{ marginTop: "10px" }}>
                            <a href="/productcategory" style={{ textDecoration: "underline", color: "blue" }}>Back to List</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
function DetailsProductCategory() {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8" style={{ textAlign: "left" }}>
                    <h1 className="mb-4" style={{ fontSize: "40px" }}>Details<br/> ProductCategory</h1>
                    <hr />
                    <form>
                        <dl class="row">
                            <dt class="col-sm-2">TenNhanHieu
                            </dt>
                            <dd class="col-sm-10"> XiaoMi
                            </dd>
                            <dt class="col-sm-2">Ảnh đại diện
                            </dt>
                            <dd class="col-sm-10"> /categoryImg/balotuivi.png
                            </dd>
                        </dl>
                        <div style={{ marginTop: "10px" }}>
                            <a href="/EditProductCategory" style={{ textDecoration: "underline", color: "blue" }}>Edit</a> |
                            <a href="/Brands" style={{ textDecoration: "underline", color: "blue" }}>Back to List</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
function DeleteProductCategory() {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8" style={{ textAlign: "left" }}>
                    <h1 className="mb-4" style={{ fontSize: "40px" }}>Delete <br/>Are you sure you want to delete this? <br/>Categories</h1>
                    <hr />
                    <form>
                        <dl class="row">
                            <dt class="col-sm-2">TenNhanHieu
                            </dt>
                            <dd class="col-sm-10"> XiaoMi
                            </dd>
                            <dt class="col-sm-2">Ảnh đại diện
                            </dt>
                            <dd class="col-sm-10"> /categoryImg/balotuivi.png
                            </dd>
                        </dl>
                        <div style={{ marginTop: "10px" }}>
                            <a href="/ProductCategory" className="btn btn-danger" >Delete</a> |
                            <a href="/ProductCategory" style={{ textDecoration: "underline", color: "blue" }}>Back to List</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export {CreateProductCategory,EditProductCategory,DetailsProductCategory,DeleteProductCategory};