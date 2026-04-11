import styles from "./styles.module.css";
import { useLanguage } from "../../context/LanguageContext";
import { useEffect, useState } from "react";
import type { Language } from "../../types/userLanguage";
import ReactCountryFlag from "react-country-flag";

export default function LanguageSelector({readOnly}: {readOnly?: boolean;}) {
  const { userLanguage, setUserLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  const languages = {
    en: { label: "English", country: "US" },
    pt: { label: "Português", country: "BR" },
    es: { label: "Español", country: "ES" },
  };

  const current = languages[userLanguage];

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved) setUserLanguage(saved as Language);
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", userLanguage);
  }, [userLanguage]);

  function handleSelect(lang: Language) {
    setUserLanguage(lang);
    setOpen(false);
  }

  return (
    <div className={styles.container}>
      <button className={styles.trigger} onClick={() => setOpen(!open)}>
        <ReactCountryFlag countryCode={current.country} svg />
        <span>{current.label}</span>
      </button>

      {open && !readOnly && (
        <div className={styles.dropdown}>
          {Object.entries(languages).map(([key, value]) => (
            <div
              key={key}
              className={styles.option}
              onClick={() => handleSelect(key as Language)}
            >
              <ReactCountryFlag countryCode={value.country} svg />
              <span>{value.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
