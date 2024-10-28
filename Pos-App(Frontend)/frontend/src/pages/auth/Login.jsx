import { Button, Carousel, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import resim from "../../../public/images/responsive.svg";
import { useEffect, useState } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [users, setUsers] = useState("");
  //const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("https://localhost:7211/api/User");
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }

    };
    getUser();
  
  }, []);
  console.log(users)

  const onFinish = async (loginValues) => {
    try {
        const response = await axios.post(
            "https://localhost:7211/api/Login",
            loginValues,
            {
                timeout: 5000, // 5 saniye zaman aşımı
            }
        );

        // İsteğin sonucunu kontrol edin
        if (response.status === 200) {
            const accessToken = response?.data?.accessToken;
            if (accessToken) { // Token'in tanımlı olup olmadığını kontrol ediyoruz
                localStorage.setItem("token", accessToken);
                console.log("Token başarıyla kaydedildi:", accessToken);
                message.success("Giriş başarılı");

                // Kullanıcı bilgilerini doğrudan kaydedelim
                const userEmail = response.data.user.email;
                console.log(typeof(userEmail))
                const user = users.find((user) => user.email === userEmail); // Kullanıcıyı bul

                // Kullanıcı verisini konsola yazdırarak kontrol edin
                console.log("Bulunan kullanıcı:", user);

                if (user) {
                    // Kullanıcıyı kaydet
                    localStorage.setItem("currentUser2", JSON.stringify(user));
                } else {
                    console.error("Kullanıcı bulunamadı.");
                }
                console.log(localStorage.getItem("currentUser2"))
                navigate("/home");
            } else {
                console.error("Token alınamadı:", response.data);
                setError("Token alınamadı!");
            }
        } else {
            setError("Authentication failed!");
        }
    } catch (error) {
        setError("An error occurred. Please try again later.");
        console.error(
            "Error fetching token:",
            error.response?.data || error.message
        );
    }
};


 /* const findUser = () => {
    if (!users || users.length === 0) {
      console.error("Kullanıcı verisi henüz yüklenmedi.");
      return;
    }

    const user = users.find((user) => user.email === currentUser);
    if (user) {
      // Eğer kullanıcı bulunursa
      localStorage.setItem("currentUser2", JSON.stringify(user.userName));
    } else {
      console.error("Kullanıcı bulunamadı.");
    }
  };*/

  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
          <h1 className="text-center text-5xl font-bold mb-2">LOGO</h1>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="E-mail"
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "E-mail Alanı Boş Bırakılamaz!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Şifre"
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "Şifre Alanı Boş Bırakılamaz!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
              >
                Giriş Yap
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Henüz bir hesabınız yok mu?&nbsp;
            <Link to="/register" className="text-blue-600">
              Şimdi kaydol
            </Link>
          </div>
        </div>
        <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#6c63ff] h-full">
          <div className="w-full h-full flex items-center">
            <div className="w-full">
              <Carousel autoplay>
                <div className="!flex  flex-col items-center justify-center h-full">
                  <img className="w-[600px] h-[500px]" src={resim} />
                  <h3 className="text-4xl text-white text-center font-bold ">
                    Responsive
                  </h3>
                  <p className=" text-2xl text-white text-center">
                    Tüm Cihaz Boyutlarıyla Uyumluluk
                  </p>
                </div>
                <div className="!flex  flex-col items-center justify-center h-full">
                  <img
                    className="w-[600px] h-[500px]"
                    src="../../../public/images/responsive.svg"
                  />
                  <h3 className="text-4xl text-white text-center font-bold ">
                    Responsive
                  </h3>
                  <p className=" text-2xl text-white text-center">
                    Tüm Cihaz Boyutlarıyla Uyumluluk
                  </p>
                </div>
                <div className="!flex  flex-col items-center justify-center h-full">
                  <img
                    className="w-[600px] h-[500px]"
                    src="../../../public/images/responsive.svg"
                  />
                  <h3 className="text-4xl text-white text-center font-bold ">
                    Responsive
                  </h3>
                  <p className=" text-2xl text-white text-center">
                    Tüm Cihaz Boyutlarıyla Uyumluluk
                  </p>
                </div>
                <div className="!flex flex-col items-center justify-center h-full">
                  <img
                    className="w-[600px] h-[600px]"
                    src="../../../public/images/responsive.svg"
                  />
                  <h3 className="text-4xl text-white text-center font-bold">
                    Responsive
                  </h3>
                  <p className="mt-5 text-2xl text-white text-center mb-5">
                    Tüm Cihaz Boyutlarıyla Uyumluluk
                  </p>
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
