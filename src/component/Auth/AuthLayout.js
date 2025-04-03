import Header from "./Header";
function AuthLayout({ children }) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}

export default AuthLayout;