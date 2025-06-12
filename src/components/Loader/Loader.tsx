import { CircleLoader } from "react-spinners";
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.loaderWrapper}>
      <CircleLoader color="#0d6efd" size={80} />
    </div>
  );
}
