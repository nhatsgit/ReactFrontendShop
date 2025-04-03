import { Link } from "react-router-dom";

function NotFound() {
    return (<>
        <div className="container text-center">
            <div className="content-404">
                <h1><b>Lỗi!</b> Trang không tồn tại hoặc không có quyền truy cập</h1>
                <h2><Link to="/">Về trang chủ</Link></h2>
                <img src="images/404/404.png" className="img-responsive" alt="" />

            </div>
        </div>
    </>);
}

export default NotFound;