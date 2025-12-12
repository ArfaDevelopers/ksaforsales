import React from "react";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { LanguageProvider } from "./LanguageContext"; // Import LanguageProvider
import Home from "./components/home";
import "./assets/css/bootstrap-datetimepicker.min.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/feather.css";
import "./assets/css/owl.theme.default.min.css";
import "./assets/css/slick.css";
import "./assets/css/style.css";
import "./assets/css/style2.css";
import "./assets/css/quaries.css";
import Home2 from "./components/home2";
import Home3 from "./components/home3";
import Home4 from "./components/home4";
import Home5 from "./components/home5";
import Home6 from "./components/home6";
import Home7 from "./components/home7";
import Home8 from "./components/home8";
import Home9 from "./components/home9";
import Listing_Grid from "./components/Listings/ListingGrid";
import ServiceDetails from "./components/Listings/serviceDetails/serviceDetails";
import ListingMap from "./components/Listings/listingMap";
import GridSidebar from "./components/Listings/LisitingGridSidebar";
import ListSidebar from "./components/Listings/LisitingListSidebar";
import GridMap from "./components/Listings/GridMap";
import About from "./components/pages/about";
import Pricing from "./components/pages/about/pricing";
import Faq from "./components/pages/faq";
import Gallary from "./components/pages/gallary";
import Category from "./components/pages/category";
import HowItWork from "./components/pages/howitWork";
import TermsCondition from "./components/pages/termsCondition";
import Error404 from "./components/pages/404error";
import Error504 from "./components/pages/504error";
import Dashboard from "./components/userPages/Dashboard";
import Profile from "./components/userPages/profile";
import Bookmarks from "./components/userPages/bookmark";
import MyListe from "./components/userPages/mylisting";
import Message from "./components/userPages/mesage";
import Review from "./components/userPages/review";
import AddLisiting from "./components/userPages/AddLisiting";
import Listing from "./components/userPages/Listing";
import CommercialAdsListing from "./components/userPages/CommercialAdsListing";
import DetailAds from "./components/userPages/DetailAds";

import BlogList from "./components/blog/BlogList";
import BlogDetailsh from "./components/blog/BlogList/blogDatalish";
import BlogGrid from "./components/blog/BlogList/BlogGrid";
import BlogListSideBar from "./components/blog/BlogList/blogListSidebar";
import BlogGridSidebar from "./components/blog/BlogList/blogGridSidebar";
import Contract from "./components/contract";
import SignUp from "./components/signUp";
import Login from "./components/login";
import ForgotPassword from "./components/forgotPassword";
import config from "config";
import Dynamic_Routes from "./components/dyanmic_routes/index";
import HealthCare from "./components/admin/HealthCare/HealthCare";
import RealEstate from "./components/admin/RealEstate/RealEstate";
import Electronic from "./components/admin/Electronic/Electronic";
import GamesSport from "./components/admin/GamesSport/GamesSport";
import ComercialsAds from "./components/admin/ComercialsAds/ComercialsAds";
import AddBooks from "./components/admin/AddBooks/AddBooks";
import AddCars from "./components/admin/AddCars/AddCars";
import Search from "./pages/Search/Search";
import Cars from "./components/admin/Cars/Cars";
import Bikes from "./components/home/Bikes/Bikes";
import MAGAZINESCOMP from "./components/admin/MAGAZINESCOMP/MAGAZINESCOMP";
import Dynamic_Route from "./components/admin/dyanmic_route";
import CommercialAdscom from "./components/admin/CommercialAdscom/CommercialAdscom";
import CategoryDetail from "./components/admin/CategoryDetail/CategoryDetail";
import AboutUs from "./components/admin/AboutUs/AboutUs";
import TermsAndConditions from "./components/admin/TermsAndConditions/TermsAndConditions";
import PrivacyPolicy from "./components/admin/PrivacyPolicy/PrivacyPolicy";
import Copyrights from "./components/admin/Copyrights/Copyrights";
import Userinfo from "./components/admin/Userinfo/Userinfo";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./pages/NotFound/NotFound";

export const App = () => {
  return (
    <AuthProvider>
      <HashRouter basename={`${config.publicPath}`}>
        <LanguageProvider>
          {" "}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<NotFound />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/index-2"
              element={
                <ProtectedRoute>
                  <Home2 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/index-3"
              element={
                <ProtectedRoute>
                  <Home3 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/index-4"
              element={
                <ProtectedRoute>
                  <Home4 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/index-5"
              element={
                <ProtectedRoute>
                  <Home5 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/index-6"
              element={
                <ProtectedRoute>
                  <Home6 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/index-7"
              element={
                <ProtectedRoute>
                  <Home7 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/index-8"
              element={
                <ProtectedRoute>
                  <Home8 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/index-9"
              element={
                <ProtectedRoute>
                  <Home9 />
                </ProtectedRoute>
              }
            />

            <Route
              path="/HealthCareComp"
              element={
                <ProtectedRoute>
                  <Navigate to="/search?category=home-and-furniture" replace />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="/RealEstate"
              element={
                <ProtectedRoute>
                  <RealEstate />
                </ProtectedRoute>
              }
            /> */}
            <Route
              path="/Electronic"
              element={
                <ProtectedRoute>
                  <Electronic />
                </ProtectedRoute>
              }
            />
            <Route
              path="/GamesSport"
              element={
                <ProtectedRoute>
                  <GamesSport />
                </ProtectedRoute>
              }
            />
            <Route
              path="/CommercialAdscom"
              element={
                <ProtectedRoute>
                  <CommercialAdscom />
                </ProtectedRoute>
              }
            />
            <Route
              path="/TermsAndConditions"
              element={
                <ProtectedRoute>
                  <TermsAndConditions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/PrivacyPolicy"
              element={
                <ProtectedRoute>
                  <PrivacyPolicy />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Cars"
              element={
                <ProtectedRoute>
                  <Cars />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Bikes"
              element={
                <ProtectedRoute>
                  <Bikes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/MAGAZINESCOMP"
              element={
                <ProtectedRoute>
                  <MAGAZINESCOMP />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Dynamic_Route"
              element={
                <ProtectedRoute>
                  <Dynamic_Route />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ComercialsAds"
              element={
                <ProtectedRoute>
                  <ComercialsAds />
                </ProtectedRoute>
              }
            />
            <Route
              path="/AddBooks"
              element={
                <ProtectedRoute>
                  <AddBooks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/AddCars"
              element={
                <ProtectedRoute>
                  <AddCars />
                </ProtectedRoute>
              }
            />
            <Route
              path="/AutomotiveComp"
              element={
                <ProtectedRoute>
                  <Navigate to="/search?category=motors" replace />
                </ProtectedRoute>
              }
            />
            <Route
              path="/UserInfo"
              element={
                <ProtectedRoute>
                  <Userinfo />
                </ProtectedRoute>
              }
            />
            <Route
              path="/AboutUs"
              element={
                <ProtectedRoute>
                  <AboutUs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Copyrights"
              element={
                <ProtectedRoute>
                  <Copyrights />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={<Search />}
            />

            <Route
              path="/ElectronicComp"
              element={
                <ProtectedRoute>
                  <Navigate to="/search?category=electronics" replace />
                </ProtectedRoute>
              }
            />
            <Route
              path="/FashionStyle"
              element={
                <ProtectedRoute>
                  <Navigate to="/search?category=fashion-style" replace />
                </ProtectedRoute>
              }
            />
            <Route
              path="/HealthCare"
              element={
                <ProtectedRoute>
                  <HealthCare />
                </ProtectedRoute>
              }
            />
            <Route
              path="/JobBoard"
              element={
                <ProtectedRoute>
                  <Navigate to="/search?category=job-board" replace />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Education"
              element={
                <ProtectedRoute>
                  <Navigate to="/search?category=other" replace />
                </ProtectedRoute>
              }
            />
            <Route
              path="/RealEstateComp"
              element={
                <ProtectedRoute>
                  <Navigate to="/search?category=real-estate" replace />
                </ProtectedRoute>
              }
            />
            <Route
              path="/TravelComp"
              element={
                <ProtectedRoute>
                  <Navigate to="/search?category=services" replace />
                </ProtectedRoute>
              }
            />
            <Route
              path="/SportGamesComp"
              element={
                <ProtectedRoute>
                  <Navigate to="/search?category=sport-and-game" replace />
                </ProtectedRoute>
              }
            />
            <Route
              path="/PetAnimalsComp"
              element={
                <ProtectedRoute>
                  <Navigate to="/search?category=pet-and-animals" replace />
                </ProtectedRoute>
              }
            />
            <Route
              path="/listing-grid"
              element={
                <ProtectedRoute>
                  <Listing_Grid />
                </ProtectedRoute>
              }
            />
            <Route
              path="/service-details"
              element={
                <ProtectedRoute>
                  <ServiceDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/listingmap-list"
              element={
                <ProtectedRoute>
                  <ListingMap />
                </ProtectedRoute>
              }
            />
            <Route
              path="/listing-grid-sidebar"
              element={
                <ProtectedRoute>
                  <GridSidebar />
                </ProtectedRoute>
              }
            />
            <Route
              path="/listing-list-sidebar"
              element={
                <ProtectedRoute>
                  <ListSidebar />
                </ProtectedRoute>
              }
            />
            <Route
              path="/listingmap-grid"
              element={
                <ProtectedRoute>
                  <GridMap />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <About />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pricing"
              element={
                <ProtectedRoute>
                  <Pricing />
                </ProtectedRoute>
              }
            />
            <Route
              path="/faq"
              element={
                <ProtectedRoute>
                  <Faq />
                </ProtectedRoute>
              }
            />
            <Route
              path="/gallery"
              element={
                <ProtectedRoute>
                  <Gallary />
                </ProtectedRoute>
              }
            />
            <Route
              path="/categories"
              element={
                <ProtectedRoute>
                  <Category />
                </ProtectedRoute>
              }
            />
            <Route
              path="/howitworks"
              element={
                <ProtectedRoute>
                  <HowItWork />
                </ProtectedRoute>
              }
            />
            <Route
              path="/terms-condition"
              element={
                <ProtectedRoute>
                  <TermsCondition />
                </ProtectedRoute>
              }
            />
            <Route
              path="/error-404"
              element={
                <ProtectedRoute>
                  <Error404 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/error-500"
              element={
                <ProtectedRoute>
                  <Error504 />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookmarks"
              element={
                <ProtectedRoute>
                  <Bookmarks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-listing"
              element={
                <ProtectedRoute>
                  <MyListe />
                </ProtectedRoute>
              }
            />
            <Route
              path="/messages"
              element={
                <ProtectedRoute>
                  <Message />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reviews"
              element={
                <ProtectedRoute>
                  <Review />
                </ProtectedRoute>
              }
            />
            <Route
              path="/add-listing"
              element={
                <ProtectedRoute>
                  <AddLisiting />
                </ProtectedRoute>
              }
            />
            <Route
              path="/commercial-ads"
              element={
                <ProtectedRoute>
                  <CommercialAdsListing />
                </ProtectedRoute>
              }
            />
            <Route
              path="/detail-ads"
              element={
                <ProtectedRoute>
                  <DetailAds />
                </ProtectedRoute>
              }
            />

            <Route
              path="/listing"
              element={
                <ProtectedRoute>
                  <Listing />
                </ProtectedRoute>
              }
            />

            <Route
              path="/blog-list"
              element={
                <ProtectedRoute>
                  <BlogList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blog-details"
              element={
                <ProtectedRoute>
                  <BlogDetailsh />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blog-grid"
              element={
                <ProtectedRoute>
                  <BlogGrid />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blog-list-sidebar"
              element={
                <ProtectedRoute>
                  <BlogListSideBar />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blog-grid-sidebar"
              element={
                <ProtectedRoute>
                  <BlogGridSidebar />
                </ProtectedRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <ProtectedRoute>
                  <Contract />
                </ProtectedRoute>
              }
            />

            <Route
              path="/routes/:id"
              element={
                <ProtectedRoute>
                  <Dynamic_Routes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/car-details"
              element={
                <ProtectedRoute>
                  <Dynamic_Routes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/CategoryDetail/:id"
              element={
                <ProtectedRoute>
                  <CategoryDetail />
                </ProtectedRoute>
              }
            />
          </Routes>
        </LanguageProvider>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
// export const App = () => {
//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         minHeight: "100vh",
//         backgroundColor: "#f9fafb",
//         color: "#333",
//         fontFamily: "Arial, sans-serif",
//         textAlign: "center",
//         padding: "20px",
//       }}
//     >
//       <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
//         🚧 Scheduled Maintenance 🚧
//       </h1>
//       <p style={{ fontSize: "1.2rem", maxWidth: "600px" }}>
//         Our website is currently undergoing essential upgrades to improve your
//         experience. We’ll be back online shortly. Thank you for your patience
//         and understanding.
//       </p>
//     </div>
//   );
// };

// export default App;
