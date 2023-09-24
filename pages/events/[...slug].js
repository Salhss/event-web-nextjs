import EventItem from "@/components/events/EventItem";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/Button";
import ErrorAlert from "@/components/ui/error-alert";
import { getFilteredEvents } from "@/dummy-data";
import { useRouter } from "next/router";

export default function FilteredEvents() {
  const router = useRouter();

  const filterData = router.query.slug;

  if (!filterData) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <p className="text-5xl font-semibold">Loading...</p>
      </div>
    );
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear < 2021 ||
    numYear > 2022 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <ErrorAlert>
          <p>Invalid filter, please input correct date!</p>
        </ErrorAlert>
        <Button link="/events">Show All Events</Button>
      </div>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <ErrorAlert>
          <p>No event found for the chosen filter!</p>
        </ErrorAlert>
        <Button link="/events">Show All Events</Button>
      </div>
    );
  }

  const date = new Date(numYear, numMonth - 1);
  return (
    <>
      <ResultsTitle date={date} />
      <EventItem Item={filteredEvents} />
    </>
  );
}
