import EventItem from "@/components/events/EventItem";
import EventsSearch from "@/components/events/EventsSearch";
import { getAllEvents } from "@/helpers/api-util";
import { useRouter } from "next/router";

export default function EventsPage(props) {
  const { events } = props;
  const router = useRouter();

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

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },

    revalidate: 1800,
  };
}
