import Home from '../pages/User/Home/Home';
import ProductDetails from '../pages/User/Product/ProductDetails';
import Login from '../pages/Auth/Login';
import Search from '../pages/User/Product/Search';
import MyCarts from '../pages/User/Cart/MyCarts';
import MyOrders from '../pages/User/Orders/MyOrders';
import Shop from '../pages/User/Shop/Shop';
import OrderDetails from '../pages/User/Orders/OrderDetails';
import CheckOut from '../pages/User/Cart/CheckOut';
import Products from '../pages/Seller/Products/Product';
import Staff from '../pages/Seller/Staff/Staff';
import Orders from '../pages/Seller/Orders/Orders';
import Analyze from '../pages/Seller/Analyze/Analyze';
import ProductByCategory from '../pages/User/Product/ProductByCategory';
import AuthLayout from '../component/Auth/AuthLayout';
import SellerLayout from '../component/Seller/SellerLayout';
import NotFound from '../pages/NotFound';
import OrderSellerDetails from '../pages/Seller/Orders/OrderSellerDetails';
import ShopDetail from '../pages/Seller/Shop/ShopDetails';
import AdminLayout from '../component/Admin/AdminLayout';

import {
    CanceledOrder, DeliveredOrder, OrderNotConfirm, RequestReturnedOrder,
    AddProduct, HiddenProduct, SoldOutProduct, ReturnedOrder,
    AddStaff, RenueAnalyze, ProductAnalyze, Voucher, VoucherCreater, VoucherExpired, VoucherUnmount,
    DetailProduct, EditProduct
} from '../pages/Seller/index';

import {
    CreateStore,
    CreateBrands, EditBrands, DetailsBrands, DeleteBrands,
    CreateProductCategory, EditProductCategory, DetailsProductCategory, DeleteProductCategory,
    CreateVouchers, EditVouchers, DetailsVouchers, DeleteVouchers
} from '../pages/Admin/AdminExtentions/indexExtentionAdmin';

import { Brands, Admin, ProductCategories, Vouchers } from '../pages/Admin/index';

import { EditVoucher, DetailsVoucher, DeleteVoucher, DetailsVoucherSeller } from '../pages/Seller/Voucher/SellerExtentions/VoucherSeller';
import DetailStore from '../pages/Admin/Shop/DetailStore';
import Register from '../pages/Auth/Register';
import Account from '../pages/Auth/Account';
import ResultPayment from '../pages/User/Cart/ResultPayment';
import SearchByImagePage from '../pages/User/Product/ProductsByImage';


const routePaths = {
    notFound: '/notfound',
    ////User
    home: '/',
    productDetails: '/productDetails',
    register: '/register',
    login: '/login',
    account: '/account',
    search: '/search',
    searchByImage: '/searchByImage',
    mycarts: '/mycarts',
    myorders: '/myorders',
    shop: '/shop',
    category: '/category',
    orderdetails: '/orderdetails',
    checkout: '/checkout',
    resultPayment: '/resultPayment',

    /////// Seller ////////
    products: '/seller/product',
    hidden: '/seller/hidden',
    out_of_stock: '/seller/out_of_stock',
    add: '/seller/add',
    detailProduct: '/seller/detailProduct',
    editProduct: '/seller/editProduct',
    orders: '/seller/orders',
    all: '/seller/orders/all',
    pending: '/seller/orders/pending',
    delivered: '/seller/orders/delivered',
    cancalled: '/seller/orders/cancalled',
    return_requested: '/seller/orders/return_requested',
    returned: '/seller/orders/returned',
    orderSellerDetails: '/seller/order/details',
    staff: '/seller/staff',
    addstaff: '/seller/addstaff',
    myShopDetails: '/seller/shopDetail',
    analyze: '/seller/analyze',
    renueAnalyze: '/seller/renueAnalyze',
    productAnalyze: '/seller/productAnalyze',
    voucher: '/Voucher',
    voucherCreater: '/VoucherCreater',
    voucherExpired: '/VoucherExpired',
    voucherUnmount: '/VoucherUnmount',
    EditVoucher: '/EditVoucher',
    DetailsVoucherSeller: '/DetailsVoucher',
    DeleteVoucher: '/DeleteVoucher',

    /////// Admin ////////
    Admin: '/Admin',
    Brands: '/admin/brands',
    productcategory: '/admin/productcategory',
    vouchers: '/admin/vouchers',
    createStore: '/admin/createStore',
    detailsStore: '/admin/detailsStore',
    createBrands: '/admin/createBrands',
    editBrands: '/admin/EditBrands',
    detailsBrands: '/admin/DetailsBrands',
    deleteBrands: '/admin/DeleteBrands',
    createProductCategory: '/admin/CreateProductCategory',
    editProductCategory: '/admin/EditProductCategory',
    detailsProductCategory: '/admin/DetailsProductCategory',
    deleteProductCategory: '/admin/DeleteProductCategory',
    createVouchers: '/admin/CreateVouchers',
    editVouchers: '/admin/EditVouchers',
    detailsVouchers: '/admin/DetailsVouchers',
    deleteVouchers: '/admin/DeleteVouchers',
}
const publicRoutes = [
    { path: routePaths.notFound, component: NotFound, layout: null },

    ////////////User
    { path: routePaths.home, component: Home },
    { path: routePaths.productDetails, component: ProductDetails },
    { path: routePaths.register, component: Register, layout: AuthLayout },
    { path: routePaths.login, component: Login, layout: AuthLayout },
    { path: routePaths.account, component: Account, layout: AuthLayout },
    { path: routePaths.search, component: Search },
    { path: routePaths.searchByImage, component: SearchByImagePage },
    { path: routePaths.mycarts, component: MyCarts },
    { path: routePaths.myorders, component: MyOrders },
    { path: routePaths.shop, component: Shop },
    { path: routePaths.orderdetails, component: OrderDetails },
    { path: routePaths.checkout, component: CheckOut },
    { path: routePaths.resultPayment, component: ResultPayment },

    ///////////Seller///////////
    //Product
    { path: routePaths.products, component: Products, layout: SellerLayout },
    { path: routePaths.hidden, component: HiddenProduct, layout: SellerLayout },
    { path: routePaths.out_of_stock, component: SoldOutProduct, layout: SellerLayout },
    { path: routePaths.add, component: AddProduct, layout: SellerLayout },
    { path: routePaths.detailProduct, component: DetailProduct, layout: SellerLayout },
    { path: routePaths.editProduct, component: EditProduct, layout: SellerLayout },

    { path: routePaths.orders, component: Orders, layout: SellerLayout },
    { path: routePaths.pending, component: OrderNotConfirm, layout: SellerLayout },
    { path: routePaths.cancalled, component: CanceledOrder, layout: SellerLayout },
    { path: routePaths.delivered, component: DeliveredOrder, layout: SellerLayout },
    { path: routePaths.return_requested, component: RequestReturnedOrder, layout: SellerLayout },
    { path: routePaths.returned, component: ReturnedOrder, layout: SellerLayout },
    { path: routePaths.orderSellerDetails, component: OrderSellerDetails, layout: SellerLayout },

    { path: routePaths.staff, component: Staff, layout: SellerLayout },
    { path: routePaths.addstaff, component: AddStaff, layout: SellerLayout },
    { path: routePaths.category, component: ProductByCategory },
    { path: routePaths.myShopDetails, component: ShopDetail, layout: SellerLayout },
    { path: routePaths.analyze, component: Analyze, layout: SellerLayout },
    { path: routePaths.renueAnalyze, component: RenueAnalyze, layout: SellerLayout },
    { path: routePaths.productAnalyze, component: ProductAnalyze, layout: SellerLayout },

    { path: routePaths.voucher, component: Voucher, layout: SellerLayout },
    { path: routePaths.voucherCreater, component: VoucherCreater, layout: SellerLayout },
    { path: routePaths.voucherExpired, component: VoucherExpired, layout: SellerLayout },
    { path: routePaths.voucherUnmount, component: VoucherUnmount, layout: SellerLayout },
    { path: routePaths.EditVoucher, component: EditVoucher, layout: SellerLayout },
    { path: routePaths.DetailsVoucherSeller, component: DetailsVoucherSeller, layout: SellerLayout },
    { path: routePaths.DeleteVoucher, component: DeleteVoucher, layout: SellerLayout },

    ///////////Admin///////////
    { path: routePaths.Admin, component: Admin, layout: AdminLayout },
    { path: routePaths.Brands, component: Brands, layout: AdminLayout },
    { path: routePaths.productcategory, component: ProductCategories, layout: AdminLayout },
    { path: routePaths.vouchers, component: Vouchers, layout: AdminLayout },

    { path: routePaths.createStore, component: CreateStore, layout: AdminLayout },
    { path: routePaths.detailsStore, component: DetailStore, layout: AdminLayout },
    { path: routePaths.createBrands, component: CreateBrands, layout: AdminLayout },
    { path: routePaths.editBrands, component: EditBrands, layout: AdminLayout },
    { path: routePaths.detailsBrands, component: DetailsBrands, layout: AdminLayout },
    { path: routePaths.deleteBrands, component: DeleteBrands, layout: AdminLayout },
    { path: routePaths.createProductCategory, component: CreateProductCategory, layout: AdminLayout },
    { path: routePaths.editProductCategory, component: EditProductCategory, layout: AdminLayout },
    { path: routePaths.detailsProductCategory, component: DetailsProductCategory, layout: AdminLayout },
    { path: routePaths.deleteProductCategory, component: DeleteProductCategory, layout: AdminLayout },
    { path: routePaths.createVouchers, component: CreateVouchers, layout: AdminLayout },
    { path: routePaths.editVouchers, component: EditVouchers, layout: AdminLayout },
    { path: routePaths.detailsVouchers, component: DetailsVouchers, layout: AdminLayout },
    { path: routePaths.deleteVouchers, component: DeleteVouchers, layout: AdminLayout },

]
const privateRoutes = [

]

export { publicRoutes, privateRoutes, routePaths }