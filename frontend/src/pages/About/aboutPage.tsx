import PageHeader from "../../components/PageHeader/pageHeader";
import styles from "./style.module.css";

export default function AboutPage() {
  return (
    <div className={styles.mainContainer}>
      <PageHeader/>
      <h1>About Page</h1>
    </div>
  );
}
