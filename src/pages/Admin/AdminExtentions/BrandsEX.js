import { Link } from "react-router-dom";
import { routePaths } from "../../../routes";

function CreateBrands() {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8" style={{ textAlign: "left" }}>
                    <h1 className="mb-4" style={{ fontSize: "40px" }}>Create Brand</h1>
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
                        </div>
                        <Link to={routePaths.Brands} className="btn btn-primary w-100">Create</Link>
                        <div style={{ marginTop: "10px" }}>
                            <a href="/Brands" style={{ textDecoration: "underline", color: "blue" }}>Back to List</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

function EditBrands() {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8" style={{ textAlign: "left" }}>
                    <h1 className="mb-4" style={{ fontSize: "40px" }}>Edit Brand</h1>
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
                        </div>
                        <Link to={routePaths.Brands} className="btn btn-primary w-100">Save</Link>
                        <div style={{ marginTop: "10px" }}>
                            <a href="/Brands" style={{ textDecoration: "underline", color: "blue" }}>Back to List</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
function DetailsBrands() {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8" style={{ textAlign: "left" }}>
                    <h1 className="mb-4" style={{ fontSize: "40px" }}>Details Brand</h1>
                    <hr />
                    <form>
                        <dl class="row">
                            <dt class="col-sm-2">TenNhanHieu
                            </dt>
                            <dd class="col-sm-10"> XiaoMi
                            </dd>
                        </dl>
                        <Link to={routePaths.Brands} className="btn btn-primary w-100">Save</Link>
                        <div style={{ marginTop: "10px" }}>
                            <a href="/EditBrands" style={{ textDecoration: "underline", color: "blue" }}>Edit</a> |
                            <a href="/Brands" style={{ textDecoration: "underline", color: "blue" }}>Back to List</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
function DeleteBrands() {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8" style={{ textAlign: "left" }}>
                    <h1 className="mb-4" style={{ fontSize: "40px" }}>Delete <br/>Are you sure you want to delete this? <br/> Brand</h1>
                    <hr />
                    <form>
                        <dl class="row">
                            <dt class="col-sm-2">TenNhanHieu
                            </dt>
                            <dd class="col-sm-10"> XiaoMi
                            </dd>
                        </dl>
                        <div style={{ marginTop: "10px" }}>
                            <a href="/Brands" className="btn btn-danger" >Delete</a> |
                            <a href="/Brands" style={{ textDecoration: "underline", color: "blue" }}>Back to List</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export { CreateBrands, EditBrands, DetailsBrands, DeleteBrands };