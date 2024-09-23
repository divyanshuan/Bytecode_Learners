import { useEffect, useState } from "react";
import "../styles/gallery.css";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/modules/navigation/navigation.min.css";
import { preEvent_images } from "../data/data";

const Gallery = () => {
  const [image, setImage] = useState();
  const getImagesBySlides = (images, columns = 9) => {
    let result = [];
    for (let i = 0; i < images.length; i += columns) {
      result.push(images.slice(i, i + columns));
    }
    return result;
  };

  const gettingAllGalleryImage = () => {
    setImage(getImagesBySlides(preEvent_images));
  };

  // const getAllGalleryImages = async () => {
  //   const res = await axios.get("/gallery/get");

  //   const images = res?.data?.data;
  //   setImage(getImagesBySlides(images));
  // };
  useEffect(() => {
    // getAllGalleryImages();
    gettingAllGalleryImage();
  }, []);
  return (
    <div className="gallery" id="Gallery">
      <h1>Events Gallery</h1>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {image != null ? (
          image.map((evtimg, key) => {
            return (
              <SwiperSlide key={key}>
                <div className="images">
                  {evtimg.map((img, index) => {
                    return (
                      <div className="gallery-img-container" key={index}>
                        {/* <img
                          className="gallery-img"
                          src={`${serverUrl}/eventgallery/${img.image_path}`}
                          alt=""
                        /> */}
                        <img className="gallery-img" src={img.image} alt="" />
                      </div>
                    );
                  })}
                </div>
              </SwiperSlide>
            );
          })
        ) : (
          <></>
        )}
      </Swiper>
      <div className="light-box">.</div>
    </div>
  );
};

export default Gallery;
