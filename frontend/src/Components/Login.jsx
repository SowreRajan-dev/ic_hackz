import React from "react";
import styled from "styled-components";

function Login() {
  return (
    <LoginContainer>
      <LoginModal>
        <LoginTop>
          <LoginHead>Login</LoginHead>
          <SeperatorLine></SeperatorLine>
        </LoginTop>
        <LoginFormContainer>
          <LoginFormSection>
            <LoginInput type="email" id="email" placeholder="Email Address" />
          </LoginFormSection>
          <LoginFormSection>
            <LoginInput type="password" id="password" placeholder="Password" />
          </LoginFormSection>
        </LoginFormContainer>
        <LoginBtnContainer>
          <LoginBtn>Login</LoginBtn>
          <NotMember>
            <span>
              Not a member? <a href="/register">Sign up</a>
            </span>
          </NotMember>
        </LoginBtnContainer>
      </LoginModal>
    </LoginContainer>
  );
}
export default Login;
// Gumela
// Montree

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: linear-gradient(180deg, #cec7c7 0%, rgba(217, 217, 217, 0) 100%);
`;

const LoginModal = styled.div`
  width: 60%;
  height: 60%;
  background: #2c2b2b;
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 1024px) {
    width: 30%;
  }
`;

const LoginHead = styled.h2`
  color: #fff;
  font-family: "Gumela", sans-serif;
  text-align: center;
  margin-top: 30px;
  letter-spacing: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
`;

const SeperatorLine = styled.div`
  width: 60%;
  height: 1px;
  background: #fff;
  margin-top: 10px;
`;
const LoginTop = styled.div`
  flex: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const LoginFormContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
  margin-top: 20px;
  flex: 1;
`;
const LoginFormSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const LoginInput = styled.input`
  width: 80%;
  height: 50px;
  padding: 20px;
  border-radius: 5px;

  ::placeholder {
    font-family: "Gumela", sans-serif;
  }

  &:focus {
    outline: none;
  }
`;

const LoginBtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
`;

const LoginBtn = styled.button`
  width: 70%;
  padding: 16px 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #758283;
  font-family: "Gumela", sans-serif;
  border-radius: 5px;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 16px;
  letter-spacing: 4px;
`;

const NotMember = styled.div`
  margin-top: 20px;
  color: #fff;
  font-family: "Gumela", sans-serif;

  span {
    font-size: 1rem;
  }

  a {
    text-decoration: none;
    color: #fff;

    &:hover {
      color: #03c6c7;
    }
  }
`;
