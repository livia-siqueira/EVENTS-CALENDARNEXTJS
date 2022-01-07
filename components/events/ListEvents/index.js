import { ItemEvent } from "../itemEvent";
import styles from "./ListEvent.module.css";

export const ListEvents = ({ items }) => {
  return (
    <ul className={styles.list}>
      {items.map((item) => {
        return <ItemEvent data={item} key={item.id} />;
      })}
    </ul>
  );
};
