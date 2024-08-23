//create this so that i dont need to add Webheader to every file to display on every page
import { Outlet } from "react-router-dom"
import WebHeader from "./WebHeader"

export default function Layout(){
    return(
        <div className="flex flex-col min-h-screen">
            <WebHeader />
            <Outlet />
        </div>
    )
}