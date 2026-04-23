import PageHeader from "../../components/PageHeader/pageHeader";
import styles from "./style.module.css";
import { useTranslation } from "../../hooks/useTranslation";
import { Sparkles } from "lucide-react";

export default function AboutPage() {
  const t = useTranslation();
  return (
    <div>
      <PageHeader />
      <div className={styles.mainContainer}>
        <div className={styles.header}>
        <div className={styles.headerTitle}>
        <p className={styles.resultTitle}>
          <Sparkles size={30} fill="#5F87EA" color="#5F87EA" />
          {t.about.title}
        </p>
        </div>
      </div>
      <div>
          <p>
            {t.about.text}
          </p>
        </div>
      </div>
    </div>
  );
}
