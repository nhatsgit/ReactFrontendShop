import { Link } from "react-router-dom";

function Header() {
    return (<header id="header">
        <div className="header_top">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="contactinfo">
                            <ul className="nav nav-pills">
                                <li><a href="/"><i className="fa fa-phone"></i> 0394778814  </a></li>
                                <li> <a href="/"><i className="fa fa-envelope"></i> nhatanh.nuis@gmail.com</a> </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="social-icons pull-right">
                            <ul className="nav navbar-nav">
                                {/* <li style="margin-right: 20px;"><a href="https://www.facebook.com/profile.php?id=100048851781129"><img src="../myLayout/images/home/logofacebook.png" width={35} /></a></li>
                                <li style="margin-right: 20px;"><a href="https://zalo.me/0394778814"><img src="../myLayout/images/home/logozalo.png" width={35} /></a></li>
                                <li style="margin-right: 20px;"><a href="https://www.facebook.com/messages/t/100048851781129"><img src="../myLayout/images/home/logomessenger.png" width={35} /></a></li>  */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="header-middle">
            <div className="container">
                <div className="row">
                    <div className="logo pull-left">
                        <Link to='/'><img src="images/home/react.png" alt="" width={90} /></Link>
                    </div>

                </div>
            </div>
        </div>

        <div className="header-bottom">
            <div className="container">
                <div className="row">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div className="mainmenu pull-left">
                        <ul className="nav navbar-nav collapse navbar-collapse">

                        </ul>

                    </div>
                    <div className="mainmenu pull-right">

                        <ul className="nav navbar-nav collapse navbar-collapse">
                            <li className="nav-item">
                                <Link to='/' className="nav-link text-dark" id="register" >Về trang chủ</Link>
                            </li>


                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </header>
    );
}

export default Header;