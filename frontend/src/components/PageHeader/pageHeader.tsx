import styles from "./styles.module.css";
import { Atom } from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";
import LanguageSelector from "../LanguageSelector/languageSelector";
import { Link } from "react-router-dom";

type PageHeaderProps = {
  canChangeLanguage?: boolean;
};

export default function PageHeader({canChangeLanguage = true}: PageHeaderProps) {
  const t = useTranslation();

  return (
    <div className={styles.header}>
      <div className={styles.headerTitle}>
        <Atom size={35} color="#5E8BF4" />
        <p>
          <span>{t.input.title}</span>
        </p>
      </div>
      <div className={styles.headerLinks}>
        <Link to="/about">{t.input.about}</Link>
        <Link to="/contact">{t.input.contact}</Link>
        <LanguageSelector readOnly={!canChangeLanguage} />
      </div>
    </div>
  );
}
