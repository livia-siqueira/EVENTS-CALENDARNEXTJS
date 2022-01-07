import Link from "next/link";
import { Button } from "../../ui/Button";
import styles from "./ItemEvent.module.css";
import DateIcon from "../../icons/date-icon";
import ArrowRigth from "../../icons/arrow-right-icon";

export const ItemEvent = ({ data }) => {
  const { image, title, id, location, date } = data;
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formatAddress = location.replace(",", "\n");
  const exploreLink = `/events/${id}`;
  return (
    <li className={styles.item}>
      <img src={`/` + image} alt={title} />
      <div>
        <div className={styles.content}>
          <h2>{title}</h2>
          <div className={styles.date}>
            <DateIcon />
            <time>{humanReadableDate}</time>
          </div>
          <div className={styles.address}>
            <address>{formatAddress}</address>
          </div>
        </div>
        <div className={styles.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={styles.icon}>
              <ArrowRigth />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};
