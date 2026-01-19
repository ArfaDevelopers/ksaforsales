import React from "react";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { LanguageProvider } from "./LanguageContext"; // Import LanguageProvider
import "./i18n/i18n"; // Import i18n configuration
import Home from "./components/home";
import "./assets/css/bootstrap-datetimepicker.min.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/feather.css";
import "./assets/css/owl.theme.default.min.css";
import "./assets/css/slick.css";
import "./assets/css/style.css";
import "./assets/css/style2.css";
import "./assets/css/quaries.css";
import "./assets/css/rtl.css";
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
import ManageCommercialAds from "./components/userPages/ManageCommercialAds";
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
              element={<Home />}
            />
            <Route
              path="/index-2"
              element={<Home2 />}
            />
            <Route
              path="/index-3"
              element={<Home3 />}
            />
            <Route
              path="/index-4"
              element={<Home4 />}
            />
            <Route
              path="/index-5"
              element={<Home5 />}
            />
            <Route
              path="/index-6"
              element={<Home6 />}
            />
            <Route
              path="/index-7"
              element={<Home7 />}
            />
            <Route
              path="/index-8"
              element={<Home8 />}
            />
            <Route
              path="/index-9"
              element={<Home9 />}
            />

            <Route
              path="/HealthCareComp"
              element={<Navigate to="/search?category=home-and-furniture" replace />}
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
              element={<Electronic />}
            />
            <Route
              path="/GamesSport"
              element={<GamesSport />}
            />
            <Route
              path="/CommercialAdscom"
              element={<CommercialAdscom />}
            />
            <Route
              path="/TermsAndConditions"
              element={<TermsAndConditions />}
            />
            <Route
              path="/PrivacyPolicy"
              element={<PrivacyPolicy />}
            />
            <Route
              path="/Cars"
              element={<Cars />}
            />
            <Route
              path="/Bikes"
              element={<Bikes />}
            />
            <Route
              path="/MAGAZINESCOMP"
              element={<MAGAZINESCOMP />}
            />
            <Route
              path="/Dynamic_Route"
              element={<Dynamic_Route />}
            />
            <Route
              path="/ComercialsAds"
              element={<ComercialsAds />}
            />
            <Route
              path="/AddBooks"
              element={<AddBooks />}
            />
            <Route
              path="/AddCars"
              element={<AddCars />}
            />
            <Route
              path="/AutomotiveComp"
              element={<Navigate to="/search?category=motors" replace />}
            />
            <Route
              path="/UserInfo"
              element={<Userinfo />}
            />
            <Route
              path="/AboutUs"
              element={<AboutUs />}
            />
            <Route
              path="/Copyrights"
              element={<Copyrights />}
            />
            <Route path="/search" element={<Search />} />

            <Route
              path="/ElectronicComp"
              element={<Navigate to="/search?category=electronics" replace />}
            />
            <Route
              path="/FashionStyle"
              element={<Navigate to="/search?category=fashion-style" replace />}
            />
            <Route
              path="/HealthCare"
              element={<HealthCare />}
            />
            <Route
              path="/JobBoard"
              element={<Navigate to="/search?category=job-board" replace />}
            />
            <Route
              path="/Education"
              element={<Navigate to="/search?category=other" replace />}
            />
            <Route
              path="/RealEstateComp"
              element={<Navigate to="/search?category=real-estate" replace />}
            />
            <Route
              path="/TravelComp"
              element={<Navigate to="/search?category=services" replace />}
            />
            <Route
              path="/SportGamesComp"
              element={<Navigate to="/search?category=sport-and-game" replace />}
            />
            <Route
              path="/PetAnimalsComp"
              element={<Navigate to="/search?category=pet-and-animals" replace />}
            />
            <Route
              path="/listing-grid"
              element={<Listing_Grid />}
            />
            <Route
              path="/service-details"
              element={<ServiceDetails />}
            />
            <Route
              path="/listingmap-list"
              element={<ListingMap />}
            />
            <Route
              path="/listing-grid-sidebar"
              element={<GridSidebar />}
            />
            <Route
              path="/listing-list-sidebar"
              element={<ListSidebar />}
            />
            <Route
              path="/listingmap-grid"
              element={<GridMap />}
            />
            <Route
              path="/about"
              element={<About />}
            />
            <Route
              path="/pricing"
              element={<Pricing />}
            />
            <Route
              path="/faq"
              element={<Faq />}
            />
            <Route
              path="/gallery"
              element={<Gallary />}
            />
            <Route
              path="/categories"
              element={<Category />}
            />
            <Route
              path="/howitworks"
              element={<HowItWork />}
            />
            <Route
              path="/terms-condition"
              element={<TermsCondition />}
            />
            <Route
              path="/error-404"
              element={<Error404 />}
            />
            <Route
              path="/error-500"
              element={<Error504 />}
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
              path="/manage-commercial-ads"
              element={
                <ProtectedRoute>
                  <ManageCommercialAds />
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
              element={<BlogList />}
            />
            <Route
              path="/blog-details"
              element={<BlogDetailsh />}
            />
            <Route
              path="/blog-grid"
              element={<BlogGrid />}
            />
            <Route
              path="/blog-list-sidebar"
              element={<BlogListSideBar />}
            />
            <Route
              path="/blog-grid-sidebar"
              element={<BlogGridSidebar />}
            />
            <Route
              path="/contact"
              element={<Contract />}
            />

            <Route
              path="/routes/:id"
              element={<Dynamic_Routes />}
            />
            <Route
              path="/car-details"
              element={<Dynamic_Routes />}
            />
            <Route
              path="/CategoryDetail/:id"
              element={<CategoryDetail />}
            />
          </Routes>
        </LanguageProvider>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
