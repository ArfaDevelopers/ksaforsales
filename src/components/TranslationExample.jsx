import React from "react";
import { useTranslation } from "react-i18next";

/**
 * Example component showing how to use translations
 * Use this as a reference for adding translations to your components
 */
const TranslationExample = () => {
  const { t } = useTranslation();

  return (
    <div className="container mt-5">
      <h1>{t("search.placeholder")}</h1>
      <p>{t("search.searchByKeywords")}</p>

      {/* Example of category names */}
      <div className="categories">
        <h2>Categories (Translated):</h2>
        <ul>
          <li>{t("categories.motors")}</li>
          <li>{t("categories.electronics")}</li>
          <li>{t("categories.fashionStyle")}</li>
          <li>{t("categories.homeFurniture")}</li>
          <li>{t("categories.jobBoard")}</li>
          <li>{t("categories.realEstate")}</li>
          <li>{t("categories.services")}</li>
          <li>{t("categories.sportGame")}</li>
          <li>{t("categories.petAnimals")}</li>
        </ul>
      </div>

      {/* Example of search UI elements */}
      <div className="search-example mt-4">
        <input
          type="text"
          className="form-control mb-2"
          placeholder={t("search.searchByTitle")}
        />
        <button className="btn btn-primary">{t("search.search")}</button>
        <button className="btn btn-secondary ms-2">{t("search.clear")}</button>
      </div>

      {/* Example of common UI elements */}
      <div className="common-buttons mt-4">
        <button className="btn btn-success me-2">{t("common.save")}</button>
        <button className="btn btn-danger me-2">{t("common.delete")}</button>
        <button className="btn btn-info me-2">{t("common.edit")}</button>
        <button className="btn btn-warning">{t("common.cancel")}</button>
      </div>
    </div>
  );
};

export default TranslationExample;
