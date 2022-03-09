import { ToastContainer }               from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute }               from "@/components/protectedRoute/ProtectedRoute";
import { AuthProvider }                 from "@/context/AuthContext";
import Edit                             from "@/pages/default/EditModal";
import Products                         from "@/pages/Products/Products";
import { Navbar }                       from "@/components/navbar/navbar";
import Categories                       from "@/pages/Categories";
import DeleteModal                      from "@/pages/default/DeleteModal";

function App() {
    return (
        <div className="font-sans">

            <AuthProvider>
                <BrowserRouter>
                    <ProtectedRoute Component={Navbar}/>
                    <Routes>
                        <Route path={"/"}
                            element={<ProtectedRoute Component={Products}/>}>
                            <Route path={"edit/:id"} element={<Edit/>}/>
                            <Route path={"delete/:id"} element={<DeleteModal/>}/>
                        </Route>
                        <Route path={"/categories"}
                            element={<ProtectedRoute Component={Categories}/>}/>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
            <ToastContainer/>
        </div>

    );
}


export default App;
