import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import LogoImage from "../../assets/img/logo.png";
import BulgogiImg from "../../assets/img/bulgogi.png";
import BibimbabImg from "../../assets/img/bibimbab.png";
import KimchiImg from "../../assets/img/kimchi.png";

const Wrapper = styled.div`
  display: flex;
  font-family: Arial, sans-serif;
`;

const LeftSidebar = styled.div`
  width: 220px;
  padding: 20px;
  border-right: 1px solid #ddd;
  background-color: #fafafa;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
`;

const CheckboxGroup = styled.div`
  margin-bottom: 20px;
`;

const CheckboxLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
`;

const SelectButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #649eff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #4a82d9;
  }
`;

const RightContent = styled.div`
  flex: 1;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
`;

const HeaderLogo = styled.h1`
  font-size: 20px;
  font-weight: bold;

  img {
    width: 150px;
  }
`;

const BackButton = styled.button`
  background-color: #68a0f4;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #4a82d9;
  }
`;

const SurveyContainer = styled.div`
  margin-top: 20px;
`;

const SurveyItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 12px;
  margin-bottom: 15px;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const SurveyImage = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 10px;
  object-fit: cover;
  margin-right: 20px;
`;

const SurveyContent = styled.div`
  flex: 1;
`;

const ProgressText = styled.div`
  font-size: 14px;
  color: #555;
  margin: 5px 0;
`;

const ProgressBar = styled.progress`
  width: 100%;
  height: 16px;
  margin-bottom: 5px;
`;

const ContinueButton = styled.button`
  padding: 8px 12px;
  background-color: #649eff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  margin-left: auto;
  cursor: pointer;

  &:hover {
    background-color: #4a82d9;
  }
`;

const Survey = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { completedTitle } = location.state || {};

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [surveys, setSurveys] = useState([
    {
      title: "불고기",
      progress: 5,
      total: 20,
      image: BulgogiImg,
      category: "cuisine",
      caption:
        "Traditional Korean dish, Bulgogi is marinated thinly sliced beef that has been grilled or stir-fried. It is often served with rice and kimchi.",
    },
    {
      title: "비빔밥",
      progress: 10,
      total: 20,
      image: BibimbabImg,
      category: "cuisine",
      caption:
        "Bibimbap is a Korean mixed rice dish topped with various seasoned vegetables, meat, egg, and gochujang (chili pepper paste).",
    },
    {
      title: "김치",
      progress: 0,
      total: 20,
      image: KimchiImg,
      category: "cuisine",
      caption:
        "Kimchi is a traditional Korean side dish of fermented vegetables, typically cabbage and radish, seasoned with chili powder, garlic, and ginger.",
    },
  ]);

  useEffect(() => {
    if (completedTitle) {
      setSurveys((prev) =>
        prev.map((item) =>
          item.title === completedTitle
            ? { ...item, progress: Math.min(item.progress + 1, item.total) }
            : item
        )
      );
    }
  }, [completedTitle]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredSurveys =
    selectedCategories.length > 0
      ? surveys.filter((item) => selectedCategories.includes(item.category))
      : surveys;

  return (
    <Wrapper>
      <LeftSidebar>
        <SectionTitle>국가</SectionTitle>
        <CheckboxGroup>
          <CheckboxLabel>
            <input type="checkbox" /> 한국
          </CheckboxLabel>
          <CheckboxLabel>
            <input type="checkbox" /> 중국
          </CheckboxLabel>
          <CheckboxLabel>
            <input type="checkbox" /> 일본
          </CheckboxLabel>
        </CheckboxGroup>

        <SectionTitle>카테고리</SectionTitle>
        <CheckboxGroup>
          {["architecture", "clothes", "cuisine", "game", "tool"].map((cat) => (
            <CheckboxLabel key={cat}>
              <input
                type="checkbox"
                onChange={() => handleCategoryChange(cat)}
                checked={selectedCategories.includes(cat)}
              />{" "}
              {cat}
            </CheckboxLabel>
          ))}
        </CheckboxGroup>

        <SelectButton>SELECT</SelectButton>
      </LeftSidebar>

      <RightContent>
        <Header>
          <HeaderLogo>
            <img src={LogoImage} alt="로고" />
          </HeaderLogo>
          <BackButton onClick={() => window.history.back()}>
            뒤로가기
          </BackButton>
        </Header>

        <SurveyContainer>
          {filteredSurveys.map((item, index) => {
            const percent = Math.round((item.progress / item.total) * 100);
            return (
              <SurveyItem
                key={index}
                onClick={() =>
                  navigate(`/survey/${item.title}`, {
                    state: {
                      image: item.image,
                      caption: item.caption,
                    },
                  })
                }
              >
                <SurveyImage src={item.image} alt={item.title} />
                <SurveyContent>
                  <strong>{item.title}</strong>
                  <ProgressText>진행상황</ProgressText>
                  <ProgressBar value={item.progress} max={item.total} />
                  <ProgressText>
                    {percent}% ({item.progress} / {item.total})
                  </ProgressText>
                </SurveyContent>
                <ContinueButton>이어서 진행하기</ContinueButton>
              </SurveyItem>
            );
          })}
        </SurveyContainer>
      </RightContent>
    </Wrapper>
  );
};

export default Survey;
