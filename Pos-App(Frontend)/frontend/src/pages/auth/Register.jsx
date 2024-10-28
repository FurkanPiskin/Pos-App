import { Button, Form, Input,Carousel, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import resim from "../../../public/images/responsive.svg"
import { values } from "@ant-design/plots/es/core/utils";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const Register = () => {
const navigate=useNavigate();
const [loading,setLoading]=useState(false);
const onFinish=async (values)=>{
  try{
    const res=await fetch("https://localhost:7211/api/User",{
      method:"POST",
      body:JSON.stringify({
        userId:uuidv4(),
        ...values,
      }),
      headers:{"Content-type":"application/json;charset=UTF-8"}
    })
 
      message.success("Kayıt işlemi başarılı");
      navigate("/login")

    /*  if(res.status==200){
        localStorage.setItem("posUser",JSON.stringify({
          username:user.username,
          email:user.email
        }))
      }*/
    
      


  
   

  }catch(error){
    console.log(error);
    message.error("Kayıt işlemi başarısız")
  }
}
    
    
  return (
    <div className="h-screen">
      <div className="flex  justify-between h-full ">
        <div className="xl:px-20 w-full border px-10 flex flex-col h-full justify-center relative">
          <h1 className="text-center  text-5xl font-bold mb-2">LOGO</h1>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Kullanici Adi"
              name={"userName"}
              rules={[
                {
                  required: true,
                  message: "Kullanici Adi Alanı Boş Bırakılamaz",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "Kullanici Adi Alanı Boş Bırakılamaz",
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
                  message: "Kullanici Adi Alanı Boş Bırakılamaz",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Şifre Tekrar"
              name={"passwordAgain"}
              rules={[
                {
                  required: true,
                  message: "Kullanici Adi Alanı Boş Bırakılamaz",
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
                Kaydol
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center gap-4 absolute left-0 bottom-10 w-full">
            Bir Hesabınız Var mı?
            <Link className="text-blue-600" to="/login">
              Şimdi Giriş Yap
            </Link>
          </div>
        </div>
        <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex sm:hidden  bg-[#6c63ff] h-full">
            <div className="w-full">
            <Carousel autoplay  >
      <div className="!flex  flex-col items-center justify-center h-full">
        <img className="w-[600px] h-[500px]" src="../../../public/images/responsive.svg"/>
        <h3 className="text-4xl text-white text-center font-bold ">Responsive</h3>
        <p className=" text-2xl text-white text-center">Tüm Cihaz Boyutlarıyla Uyumluluk</p>
      </div>
      <div className="!flex  flex-col items-center justify-center h-full">
        <img className="w-[600px] h-[500px]" src="../../../public/images/responsive.svg"/>
        <h3 className="text-4xl text-white text-center font-bold ">Responsive</h3>
        <p className=" text-2xl text-white text-center">Tüm Cihaz Boyutlarıyla Uyumluluk</p>
      </div>
      <div className="!flex  flex-col items-center justify-center h-full">
        <img className="w-[600px] h-[500px]" src="../../../public/images/responsive.svg"/>
        <h3 className="text-4xl text-white text-center font-bold ">Responsive</h3>
        <p className=" text-2xl text-white text-center">Tüm Cihaz Boyutlarıyla Uyumluluk</p>
      </div>
      <div className="!flex flex-col items-center justify-center h-full">
        <img className="w-[600px] h-[600px]" src="../../../public/images/responsive.svg"/>
        <h3 className="text-4xl text-white text-center font-bold">Responsive</h3>
        <p className="mt-5 text-2xl text-white text-center mb-5">Tüm Cihaz Boyutlarıyla Uyumluluk</p>
      </div>
    </Carousel>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
