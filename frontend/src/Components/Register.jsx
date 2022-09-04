import React, { useState } from "react";
import styled from "styled-components";
import { FiMail } from "react-icons/fi";
import { BsKey } from "react-icons/bs";
import firebase from "../firebase";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const onRegister = async (e) => {
    e.preventDefault();
    console.log(email, password, confirmPassword);
    const userDetail = {
      email: email,
      password: password,
    };
    if (!email && !password) return;
    if (password !== confirmPassword)
      console.log("Password and confirm password are not the same");
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        firebase
          .firestore()
          .collection("User")
          .doc(user.user.uid)
          .set(userDetail);
        localStorage.setItem(
          "Mentree_user",
          JSON.stringify({
            user: userDetail,
            isLoggedIn: true,
            uid: user.user.uid,
          })
        );
      });

    navigate("/login");
  };

  return (
    <RegisterContainer>
      <RegisterModal>
        <RegisterTop>
          <RegisterHead>Register</RegisterHead>
          <SeperatorLine></SeperatorLine>
        </RegisterTop>
        <RegisterFormContainer>
          <RegisterFormSection>
            <FiMail
              style={{
                position: "relative",
                top: "2rem",
                left: "-13rem",
                transform: "scale(1.2)",
              }}
            />
            <RegisterInput
              type="email"
              id="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </RegisterFormSection>
          <RegisterFormSection>
            <BsKey
              style={{
                position: "relative",
                top: "2rem",
                left: "-13rem",
                transform: "scale(1.5)",
              }}
            />
            <RegisterInput
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </RegisterFormSection>
          <RegisterFormSection>
            <BsKey
              style={{
                position: "relative",
                top: "2rem",
                left: "-13rem",
                transform: "scale(1.5)",
              }}
            />
            <RegisterInput
              type="password"
              id="Confirmpassword"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </RegisterFormSection>
        </RegisterFormContainer>
        <RegisterBtnContainer>
          <RegisterBtn onClick={onRegister}>Register</RegisterBtn>
          <NotMember>
            <span>
              already a member? <a href="/login">Sign in</a>
            </span>
          </NotMember>
        </RegisterBtnContainer>
      </RegisterModal>
    </RegisterContainer>
  );
}

export default Register;

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: linear-gradient(180deg, #cec7c7 0%, rgba(217, 217, 217, 0) 100%);
`;

const RegisterModal = styled.div`
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

const RegisterHead = styled.h2`
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
const RegisterTop = styled.div`
  flex: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const RegisterFormContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
  margin-top: 20px;
  flex: 1;
`;
const RegisterFormSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const RegisterInput = styled.input`
  width: 80%;
  height: 50px;
  padding: 20px;
  padding-left: 45px;
  border-radius: 5px;

  ::placeholder {
    font-family: "Gumela", sans-serif;
  }

  &:focus {
    outline: none;
  }
`;

const RegisterBtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
`;

const RegisterBtn = styled.button`
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

  &:hover {
    background: #cad5e2;
    color: black;
  }
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
