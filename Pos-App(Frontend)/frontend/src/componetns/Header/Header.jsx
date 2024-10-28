/* eslint-disable react/prop-types */
import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Input, Badge } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ({ setSearch }) => {

  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleQuit=()=>{
    localStorage.setItem("currentUser2",{})
  }
  return (
    <div className="border-b mb-6 ">
      <header className="py-4 px-6 flex justify-between items-center gap-10">
        <div className="logo">
          <a href="">
            <h2 className="text-2xl font-bold md:text-4xl">Logo</h2>
          </a>
        </div>
        <div
          onClick={() => {
            pathname !== "/" && navigate("/home");
          }}
          className="header-search flex-1 flex justify-center  "
        >
          <Input
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            size="large"
            placeholder="Search products..."
            prefix={<SearchOutlined />}
            className="rounded-full max-w-[800px]"
          />
        </div>
        <div
          className="menu-links flex justify-between items-center gap-7 md:static fixed bottom-0 md:w-auto w-screen md:bg-transparent bg-white left-0
      md:border-t-0 border-t md:px-0 px-4 py-1 
      "
        >
          <Link
            to="/home"
            className={`menu-link ${
              pathname === "/home" ? "text-[#40a9ff]" : ""
            }  flex flex-col hover:text-[#40a9ff]`}
          >
            <HomeOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Ana Sayfa</span>
          </Link>
         
          <Link
            to="/bills"
            className={`menu-link ${
              pathname === "/bills" ? "text-[#40a9ff]" : ""
            }  flex flex-col hover:text-[#40a9ff]`}
          >
            <CopyOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Faturalar</span>
          </Link>
          <Link
            to="/customer"
            className={`menu-link ${
              pathname === "/customer" ? "text-[#40a9ff]" : ""
            }  flex flex-col hover:text-[#40a9ff]`}
          >
            <UserOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Müşteriler</span>
          </Link>
          <Link
            to="/statistic"
            className={`menu-link ${
              pathname === "/statistic" ? "text-[#40a9ff]" : ""
            }  flex flex-col hover:text-[#40a9ff]`}
          >
            <BarChartOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">İstatistikler</span>
          </Link>
          <Badge
            count={cart.cartItems.length}
            offset={[0, 6]}
            className="flex"
          >
            <Link
              to={"/cart"}
              className="menu-link flex flex-col hover:text-[#40a9ff]"
            >
              <ShoppingCartOutlined className="md:text-2xl text-xl " />
              <span className="md:text-xs text-[10px]">Sepet</span>
            </Link>
          </Badge>
         

          <Link
            to={"/login"}
            className="menu-link flex flex-col hover:text-[#40a9ff]"
          >
            <LogoutOutlined onClick={handleQuit} className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Çıkış</span>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Header;
