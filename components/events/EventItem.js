import EventList from "./EventList";
import classes from "../../styles/event-list.module.css";

export default function EventItem(props) {
  const { Item } = props;

  return (
    <div>
      <ul className={classes.list}>
        {Item.map((event) => (
          <EventList
            key={event.id}
            id={event.id}
            title={event.title}
            image={event.image}
            date={event.date}
            location={event.location}
          />
        ))}
      </ul>
    </div>
  );
}
