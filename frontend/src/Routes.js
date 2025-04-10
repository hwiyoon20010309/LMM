import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import SignupID from "./pages/Signup/SignupID";  // 경로 수정

import SignupSNS from "./pages/Signup/SignupSNS";
import Main from "./pages/Main/Main";
import MainPage from "./pages/Main/MainPage";
import Survey from "./pages/Survey/Survey";
import MyPage from "./pages/MyPage/MyPage";  
import SurveyParticipation from "./pages/MyPage/SurveyParticipation";
import SurveyDetail from "./pages/Survey/SurveyDetail";
import SurveyStart from "./pages/Survey/SurveyStart";
import AdminPage from "./pages/MyPage/Admin/AdminPage";
import AdminListPage from "./pages/MyPage/Admin/AdminListPage"; 
import AdminDetailPage from "./pages/MyPage/Admin/AdminDetailPage"; 
import RankingWeeklyPage from "./pages/Ranking/RankingWeeklyPage";
import RankingMonthlyPage from "./pages/Ranking/RankingMonthlyPage";

class AppRoutes extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signupid" element={<SignupID />} />
          <Route path="/signupsns" element={<SignupSNS />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<MyPage />} /> 
          <Route path="/survey" element={<Survey />} />
          <Route path="/survey/:title" element={<SurveyDetail />} />
          <Route path="/survey/:title/start" element={<SurveyStart />} />
          <Route path="/mypage/survey-participation" element={<SurveyParticipation />} />
          <Route path="/mypage/survey-creation" element={<AdminPage />} />
          <Route path="/mypage/survey-creation-list" element={<AdminListPage />} />
          <Route path="/mypage/survey-creation-detail/:id" element={<AdminDetailPage />} />
          <Route path="/ranking/weekly" element={<RankingWeeklyPage />} />
          <Route path="/ranking/monthly" element={<RankingMonthlyPage />} />
        </Routes>
      </Router>
    );
  }
}

export default AppRoutes;
