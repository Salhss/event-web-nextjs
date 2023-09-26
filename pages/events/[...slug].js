import EventItem from "@/components/events/EventItem";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/Button";
import ErrorAlert from "@/components/ui/error-alert";
import { getFilteredEvents } from "@/helpers/api-util";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function FilteredEvents(props) {
  // uncomment client-side render, comment server-side
  const { events, dates } = props;

  const [loadedEvents, setLoadedEvents] = useState(null);
  const router = useRouter();

  const filterData = router.query.slug;

  const { data, error } = useSWR(
    "https://nextjs-course-defdd-default-rtdb.firebaseio.com/events.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
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

  // const filteredEvents = getFilteredEvents({
  //   year: numYear,
  //   month: numMonth,
  // });

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
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

// /**
//  * Lebih bagus menggunakan server-side untuk filter atau slug, karena bisa saja tanpa filter ketat,
//  * akan banyak sekali data dan page yang harus di pre-generate, juga filter bisa saja setiap pagenya
//  * akan sering dibuka, sehingga lebih baik menggunakah server-side
//  */
// export async function getServerSideProps(contex) {
//   const { params } = contex;

//   const filterData = params.slug;

//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear < 2021 ||
//     numYear > 2022 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//       // notFound: true,
//       // redirect: {
//       //   destination: '/events'
//       // }
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       dates: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// }
