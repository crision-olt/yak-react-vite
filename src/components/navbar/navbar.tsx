import { FC, ReactElement } from "react";
import { Link }             from "react-router-dom";
import { useAuth }          from "@/context/AuthContext";
import { useTranslation }   from "react-i18next";
import { Button }           from "@/components/buttonFactory/ButtonFactory";
import { LogoutSVG }        from "@/assets/LogoutSVG";


export const Navbar: FC = (): ReactElement => {
    const { logout } = useAuth();
    const [t] = useTranslation("global");
    const logoutButton: Button = {
        style: "danger",
        label: "logout",
        size: 1,
        type: "button",
        onClick: logout,

    };
    return (
        <nav className="relative select-none bg-grey w-full bg-gray-700">
            <div className="flex flex-no-shrink items-stretch h-12 ">
                <Link to="/"
                    className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-white no-underline flex items-center hover:bg-grey-dark">{t("productPage.title")}</Link>
                <Link to="/categories"
                    className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-white no-underline flex items-center hover:bg-grey-dark">{t("categoryPage.title")}</Link>
                <div className="block cursor-pointer ml-auto relative w-12 h-12 p-4 bg-red-500 rounded-full">
                    <LogoutSVG click={logout}/>
                </div>
            </div>
        </nav>
    );
};
/*

 */