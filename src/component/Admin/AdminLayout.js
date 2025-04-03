import HeaderAdmin from "./HeaderAdmin";

function AdminLayout({children}) {
    return(
        <>
            <HeaderAdmin />
            <div>
                {children}
            </div>
        </>
    )
}
export default AdminLayout;
