import { Simple } from "./components";
import { RhfYup } from "./components/Rhf-yup";
import styles from "./App.module.css";
function App() {
  return (
    <div>
      <div className={styles.header}>React Registraton form</div>
      <Simple />
      <RhfYup />
    </div>
  );
}

export default App;
