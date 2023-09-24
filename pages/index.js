import { getFeaturedEvents } from "../dummy-data";
import EventItem from "@/components/events/EventItem";

export default function Home() {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <EventItem Item={featuredEvents} />
    </div>
  );
}
