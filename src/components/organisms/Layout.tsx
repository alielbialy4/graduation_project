import { Outlet } from "react-router"
import Header from "@organisms/Header"
// import Footer from "@organisms/Footer"

const Layout = () => {
  return (
    <>
    <Header />
    <Outlet />
    {/* <Footer /> */}
    </>
  )
}

export default Layout