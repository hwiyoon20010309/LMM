import React, { useState } from "react";
import styled from "styled-components";
import LogoImage from "../../assets/img/logo.png";
import { useNavigate } from "react-router-dom";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fff;
`;

const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;

  img {
    width: 150px;
    margin-right: 10px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Input = styled.input`
  padding: 12px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  outline: none;

  &::placeholder {
    color: #aaa;
  }
`;

const PasswordHint = styled.p`
  font-size: 12px;
  color: #888;
  margin: 5px 0 15px;
  display: flex;
  align-items: center;

  &::before {
    content: "✔";
    color: green;
    margin-right: 5px;
  }
`;

const Button = styled.button`
  padding: 15px;
  background-color: #68a0f4;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #4a82d9;
  }
`;

const LoginText = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #666;
  text-align: center;

  a {
    text-decoration: none;
    font-weight: bold;
    color: #68a0f4;
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalBox = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);

  p {
    font-size: 18px;
    margin-bottom: 20px;
  }

  button {
    padding: 10px 20px;
    background-color: #68a0f4;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;


/////////////////////////////
const SignupID = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const [modalMessage, setModalMessage] = useState(""); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:4000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id, password })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setModalMessage("회원가입 성공");
      } else {
        setModalMessage(`회원가입 실패: ${data.message}`);
      }
    } catch (error) {
      console.error("❌ 회원가입 요청 오류:", error);
      setModalMessage("회원가입 실패: 서버 오류");
    }
  
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    if (modalMessage === "회원가입 성공") {
      navigate("/"); // 성공 시 이동
    }
  };

  return (
    <Container>
      <HeaderLogo>
        <img src={LogoImage} alt="로고" /> {/* 이미지 소스 변경 */}
      </HeaderLogo>

      <p>빠르고 쉽게 계정을 만들어보세요!</p>

      {/* 회원가입 폼 */}
      <Form onSubmit={handleSubmit}>
        <label>아이디</label>
        <Input
          type="text"
          placeholder="아이디를 입력해주세요."
          value={id}
          onChange={(e) => setId(e.target.value)}
          autoComplete="off"
        />
        <label>비밀번호</label>
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
        />
        <PasswordHint>문자 + 숫자 조합 6자 이상</PasswordHint>
        <Button type="submit">간편하게 시작하기</Button>
      </Form>

      <LoginText>
        이미 계정이 있으신가요? <a href="/login">로그인하기</a>
      </LoginText>

      {isModalOpen && (
        <ModalBackdrop>
          <ModalBox>
            <p>{modalMessage}</p>
            <button onClick={handleModalClose}>확인</button>
          </ModalBox>
        </ModalBackdrop>
      )}



    </Container>
  );
};

export default SignupID;
