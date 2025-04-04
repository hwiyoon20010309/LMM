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
   animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalBox = styled.div`
  background: #fff;
  padding: 40px 30px;
  border-radius: 20px;
  width: 320px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  animation: popIn 0.3s ease;

  @keyframes popIn {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  p {
    font-size: 18px;
    color: #333;
    margin-bottom: 25px;
    font-weight: 500;
  }

  button {
    padding: 12px 24px;
    background: linear-gradient(135deg, #68a0f4, #4a82d9);
    color: white;
    border: none;
    border-radius: 30px;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: linear-gradient(135deg, #4a82d9, #346dc3);
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
    }
  }
`;


/////////////////////////////
const SignupID = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const [modalMessage, setModalMessage] = useState(""); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const [idError, setIdError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const isValidId = /^[a-zA-Z0-9]{1,8}$/.test(id);
    if (!isValidId) {
       setModalMessage("⚠️ 아이디는 영어와 숫자 조합만 가능하며,\n8자 이하로 입력해주세요.");
        setIsModalOpen(true);
    return;
    }

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
        setModalMessage("🎉 회원가입 성공\n메인페이지로 돌아갑니다");
      } else {
        setModalMessage(`⚠️ 회원가입 실패\n ${data.message}`);
      }
    } catch (error) {
      console.error("❌ 회원가입 요청 오류:", error);
      setModalMessage("⚠️ 회원가입 실패\n서버 오류");
    }
  
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    if (modalMessage === "🎉 회원가입 성공\n메인페이지로 돌아갑니다") {
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
          onChange={(e) => {
            const inputId = e.target.value;
            setId(inputId);
        
            // 아이디 유효성 검사: 영어+숫자, 8자 이하
            const isValid = /^[a-zA-Z0-9]{1,8}$/.test(inputId);
            if (!isValid && inputId !== "") {
              setIdError("영어와 숫자만 입력 가능하며 8자 이하로 입력해주세요.");
            } else {
              setIdError(""); // 에러 없으면 초기화
            }
          }}
          autoComplete="off"
        />

        { idError && (
          <p style={{ color: "red", fontSize: "13px", marginBottom: "10px" }}>
           {idError}
          </p>
        )}
        
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
            <p style={{ whiteSpace: "pre-line", fontSize: "18px" }}>
            {modalMessage}
            </p>
            <button onClick={handleModalClose}>확인</button>
          </ModalBox>
        </ModalBackdrop>
      )}



    </Container>
  );
};

export default SignupID;
