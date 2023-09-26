import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventSummary from "@/components/event-detail/event-summary";
import Button from "@/components/ui/Button";
import { getEventById, getFeaturedEvents } from "@/helpers/api-util";
import { Fragment } from "react";

export default function EventDetail(props) {
  const event = props.selectedEvent;

  if (event === "not found") {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <div className="flex flex-col gap-5">
          <h1 className="font-bold text-3xl">Data Not Found</h1>
          <Button link={"/events"}>Go Back To Home</Button>
        </div>
      </div>
    );
  }
  if (!event) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(contex) {
  const eventId = contex.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      /*pakai atau not found jika data tidak ada, jika tidak akan ada runtime error karena fallback true (semua id page akan di render bahkan tanpa data)*/
      selectedEvent: event || "not found",
    },
    /* untuk menentukan waktu (in seconds) berapa lama page akan di re-generate (di deploy ulang)*/
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,

    /* 
    - pakai false (jika allevents) kalau tidak tau mana id yang akan diutamakan dan akan merender SEMUA DATA, namun akan ada masalah performance. 
    - pakai true (jika beberapa event) akan merender SEMUA ID, namun id yang tidak ada datanya akan tetap terproses juga
    - pakai 'blocking' jika ingin data baru terdownload seutuhnya lalu dikirim ke user. Namun akan memberikan loading yang cukup lama
    */
    fallback: true,
  };
}
