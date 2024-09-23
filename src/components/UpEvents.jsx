import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import serverUrl from "../api/serverurl";
import { upcoming } from "../data/data";
import { preEvent_images } from "../data/data";

const newPreEvent_images1 = preEvent_images.slice(0, 2);
const newPreEvent_images2 = preEvent_images.slice(2, 8);

export default function UpEvents() {
  const [eventDetails, setEventDetails] = useState();
  const [imageset1, setImageset1] = useState(null);
  const [imageset2, setImageset2] = useState(null);
  const getPreviousEventImage = () => {
    axios
      .get(`prevevent/get`)
      .then((res) => {
        const preveventimage = res?.data?.data;
        setImageset1(preveventimage.slice(0, 2));
        setImageset2(preveventimage.slice(2, 6));
      })
      .catch((error) => {});
  };

  const getLatestEvent = (id) => {
    axios
      .get(`event/getlatest`)
      .then((res) => {
        setEventDetails(res?.data?.data);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    // getLatestEvent();
    // getPreviousEventImage();
  }, []);

  return (
    <div className="up-events">
      <h1>Events</h1>
      <div className="both-events">
        <div className="up-events-content">
          <h2>UpComing Event</h2>
          <div className="event-img">
            <img
              // src={
              //   eventDetails
              //     ? `${serverUrl}/eventposters/${eventDetails.posterpath}`
              //     : null
              // }
              src={upcoming ? upcoming.src : null}
              alt="Event Poster"
            />
          </div>
          <div className="up-details">
            <p>
              <b>Topic: </b>
              {/* {eventDetails ? eventDetails.title : null} */}
              {upcoming ? upcoming.title : null}
            </p>
            <p>
              <b>Venue: </b>
              {/* {eventDetails ? eventDetails.venue : null} */}
              {upcoming ? upcoming.venue : null}
            </p>
            <p>
              <b>Details: </b>
              {/* {eventDetails ? eventDetails.description : null} */}
              {upcoming ? upcoming.description : null}
            </p>
          </div>
        </div>
        <div className="pre-events">
          <h2>Previous Events</h2>
          <div className="pre-event-imgs">
            {/* {imageset1 != null ? (
              imageset1.map((img, idx) => {
                return (
                  <img
                    key={idx}
                    src={`${serverUrl}/prevevent/${img.image_path}`}
                    alt={img}
                  />
                );
              })
            ) : (
              <p>loading...</p>
            )} */}

            {newPreEvent_images1 != null ? (
              newPreEvent_images1.map((img, index) => {
                return <img src={img.image} key={index} alt={img} />;
              })
            ) : (
              <p>loading.....</p>
            )}
            <div className="pre-img1">
              {/* {imageset2 != null ? (
                imageset2.map((img, idx) => {
                  return (
                    <img
                      key={idx}
                      src={`${serverUrl}/prevevent/${img.image_path}`}
                      alt={img}
                    />
                  );
                })
              ) : (
                <p>loading...</p>
              )} */}

              {newPreEvent_images2 != null ? (
                newPreEvent_images2.map((img, index) => {
                  return <img key={index} src={img.image} alt={img} />;
                })
              ) : (
                <p>loading......</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
