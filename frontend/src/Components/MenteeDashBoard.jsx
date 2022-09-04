import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GiHamburgerMenu } from "react-icons/gi";
import platforms from "../data/platforms";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import firebase from "../firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";

Chart.register(CategoryScale);

function MenteeStats() {
  const data = [
    { name: "C", percentage: 67 },
    { name: "Python", percentage: 90 },
    { name: "Java", percentage: 75 },
  ];

  const state = {
    labels: ["C", "Python", "Java"],
    datasets: [
      {
        label: "Programming",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [67, 90, 75],
      },
    ],
  };

  return (
    <MenteeStatusContainer>
      <MenteeStatusBody>
        <MenteeStatusTable>
          <TableHead>
            <TableData>Programming</TableData>
            <TableData>Percentage</TableData>
          </TableHead>
          {data.map((val, key) => {
            return (
              <TableRow key={key}>
                <TableData>{val.name}</TableData>
                <TableData>{val.percentage}%</TableData>
              </TableRow>
            );
          })}
        </MenteeStatusTable>
        <ChartContainer>
          <Bar
            data={state}
            options={{
              title: {
                display: true,
                text: "Average Rainfall per month",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </ChartContainer>
      </MenteeStatusBody>
    </MenteeStatusContainer>
  );
}

function MenteeDashBoard() {
  const [platFormSelection, setPlatformSelection] = useState(false);
  const navigate = useNavigate();

  const onSelectPlatform = () => {
    setPlatformSelection((prev) => !prev);
  };

  const onLogout = async (e) => {
    try {
      firebase
        .auth()
        .signOut()
        .then(() => console.log("User signed out!"));
      window.localStorage.setItem(
        "Mentree_user",
        JSON.stringify({
          user: {},
          isLoggedIn: false,
          uid: null,
        })
      );
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
    navigate();
  };

  const getData = async () => {
    const data = await axios.post("http://127.0.0.1:5000/skillrack_scrapper", {
      username: "sit21it042@sairamit",
      password: "Rashmikamandanna41046",
    });
    console.log(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <MenteeDashBoardContainer>
      <MenteeHeader>
        <IconContainer>
          <GiHamburgerMenu fontSize={30} />
        </IconContainer>
        <MenuHeader>
          <MenuText>Student's Profile</MenuText>
        </MenuHeader>
        <LogoutBtn onClick={onLogout}>Log out</LogoutBtn>
      </MenteeHeader>
      <MenteeBody>
        <MenteePlatforms>
          {platforms.map((platform) => (
            <MenteePlatform key={platform.id} onClick={onSelectPlatform}>
              <PlatformImage
                src={platform.photoUrl}
                onClick={onSelectPlatform}
              />
              <PlatformName>{platform.name}</PlatformName>
            </MenteePlatform>
          ))}
        </MenteePlatforms>
        <hr style={{ marginTop: "2.5rem", borderTop: "3px dotted" }} />
        <MenteeStatus>{platFormSelection && <MenteeStats />}</MenteeStatus>
        <MenteeGraph></MenteeGraph>
      </MenteeBody>
    </MenteeDashBoardContainer>
  );
}

export default MenteeDashBoard;

const MenteeDashBoardContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(180deg, #cec7c7 0%, rgba(217, 217, 217, 0) 100%);
  display: flex;
  flex-direction: column;
`;

const MenuHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const MenteeHeader = styled.div`
  display: flex;
  width: 100%;
  height: 120px;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  margin-left: 30px;
  cursor: pointer;
`;

const MenuText = styled.p`
  font-size: 3rem;
  font-family: "Gumela", sans-serif;
`;
const LogoutBtn = styled.button`
  width: 150px;
  height: 50px;
  padding: 16px 32px;
  margin: 30px;
  cursor: pointer;
  border-radius: 10px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  font-size: 1rem;

  &:hover {
    background: #bf3325;
    color: #fff;
  }
`;

const MenteeBody = styled.div``;

const MenteePlatform = styled.div`
  width: 250px;
  height: 250px;
  background: #fff;
  margin-left: 30px;
  margin-top: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    scale: 1.1;
    transition: all 0.3s ease-in-out;
  }
`;

const PlatformImage = styled.img`
  width: 200px;
  height: 200px;
`;

const PlatformName = styled.p`
  font-size: 1.5rem;
  font-family: "Gumela", sans-serif;
`;

const MenteePlatforms = styled.div`
  display: flex;
`;

const MenteeStatusContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #fff;
  margin-top: 30px;
  padding: 20px;
`;

const MenteeStatus = styled.div`
  padding: 20px;
`;

const MenteeGraph = styled.div`
  position: relative;
  width: 600;
  height: 550;
`;

const MenteeStatusBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const MenteeStatusTable = styled.table``;

const TableRow = styled.tr``;

const TableData = styled.td`
  font-size: 1.5rem;
`;

const TableHead = styled.th`
  td {
    font-size: 25px;
  }
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 20px;
`;
