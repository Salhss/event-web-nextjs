import EventItem from "@/components/events/EventItem";
import { getAllEvents } from "@/dummy-data";

export default function EventsPage() {
  const events = getAllEvents();

  return (
    <div>
      <EventItem Item={events} />
    </div>
  );
}
