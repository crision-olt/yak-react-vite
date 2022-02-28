import { ToastContainer } from "react-toastify";
import Login from "@/pages/Login";
import { Suspense } from "react";

function App() {

    return (

        <div className="font-sans">
            <Suspense fallback={null}>
                <Login/>
            </Suspense>
            <ToastContainer/>

        </div>

    );
}

export default App;
