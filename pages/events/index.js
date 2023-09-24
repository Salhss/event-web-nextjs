import EventItem from "@/components/events/EventItem";
import EventsSearch from "@/components/events/EventsSearch";
import { getAllEvents } from "@/dummy-data";
import { useRouter } from "next/router";

export default function EventsPage() {
  const router = useRouter();
  const events = getAllEvents();

  function findEventsHandler(year, month) {
    router.push(`/events/${year}/${month}`);
  }

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventItem Item={events} />
    </>
  );
}
