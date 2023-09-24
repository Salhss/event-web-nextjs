import classes from "../../styles/event-item.module.css";
import Button from "../ui/Button";
import ArrowRightIcon from "@/components/icons/arrow-right-icon";

export default function EventList(props) {
  const { title, image, date, location, id } = props;

  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedLocation = location.replace(", ", "\n");
  const exploreLink = `/events/${id}`;
  return (
    <li className={classes.item}>
      <img src={"/" + image} alt={title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <time>{humanReadableDate}</time>
          </div>
          <div className={classes.address}>
            <address>{formattedLocation}</address>
          </div>
        </div>
      </div>
      <div className={classes.actions}>
        <Button link={exploreLink}>
          <span>Explore Link</span>
          <span className={classes.icon}>
            <ArrowRightIcon />
          </span>
        </Button>
      </div>
    </li>
  );
}
