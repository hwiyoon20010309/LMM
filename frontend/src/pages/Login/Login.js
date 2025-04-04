import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginLogoImage from "../../assets/img/loginlogo.png"; // 이미지 변수명 변경

// 네비게이션 기능을 클래스형 컴포넌트에서 사용하도록 HOC 생성
function withRouter(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

// 전체 컨테이너
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #fff;
`;

// 로고 스타일
const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;

  img {
    width: 150px; /* 로고 크기 키움 */
    margin-right: 10px;
  }
`;

// 입력 폼 스타일
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

// 입력 필드 스타일
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

// 버튼 스타일
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

// 하단 회원가입 문구
const SignupText = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #666;

  a {
    text-decoration: none;
    font-weight: bold;
    color: #68a0f4;
  }
`;

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
  
    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: email, password }), // 백엔드에서 id 필드로 받으니까!
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("✅ 로그인 성공:", data);
        this.props.navigate("/mainpage"); // 로그인 성공 시 이동
      } else {
        alert(`❌ 로그인 실패: ${data.message}`);
      }
    } catch (error) {
      console.error("❌ 로그인 요청 오류:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };
  
  render() {
    return (
      <Container>
        {/* 로고 */}
        <HeaderLogo>
          <img src={LoginLogoImage} alt="로고" />
        </HeaderLogo>

        {/* 로그인 폼 */}
        <Form onSubmit={this.handleSubmit}>
          <label>아이디</label>
          <Input
            type="text"
            name="email"
            placeholder="아이디를 입력해주세요."
            value={this.state.email}
            onChange={this.handleChange}
            autoComplete="off"
          />
          <label>비밀번호</label>
          <Input
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요."
            value={this.state.password}
            onChange={this.handleChange}
            autoComplete="off"
          />
          <Button type="submit">시작하기</Button>
        </Form>

        {/* 회원가입 안내 */}
        <SignupText>
          계정이 없으신가요? <Link to="/signup">계정 만들기</Link>
        </SignupText>
      </Container>
    );
  }
}

export default withRouter(Login);
