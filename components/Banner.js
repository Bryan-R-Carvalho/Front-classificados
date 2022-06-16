import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Banner() {
  return (
    <div className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <img
            className="object-fill h-96 sm:h-[20rem] md:h-[40rem] "
            //style={{ height: 510 }}
            loading="lazy"
            src="https://macae.rj.gov.br/midia/noticias/37782/1482319601.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            className="object-fill h-96 sm:h-[20rem] md:h-[40rem] "
            //style={{ height: 310 }}
            loading="lazy"
            src="https://wegg.com.br/wp-content/uploads/2021/12/Banner-Macae-pronto-para-morar.jpg"
            alt=""
          />
        </div>
        <div>
          <img
            className="object-fill h-96 sm:h-[20rem] md:h-[40rem] "
            //style={{ height: 310 }}
            loading="lazy"
            src="https://thumbs.dreamstime.com/b/flag-macae-brazil-cloudy-sky-background-sunset-panoramic-view-brazilian-travel-patriot-concept-copy-space-flag-236612268.jpg"
            alt=""
          />
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;
