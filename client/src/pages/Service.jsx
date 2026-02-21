import { useAuth } from "../store/auth";

const Service = () => {
  const { services } = useAuth();

  return (
    <section className="section-services">
      <div className="container">
        <h1 className="main-heading">Services</h1>
      </div>

      {/* 3 cards per row */}
      <div className="container grid grid-three-cols">
        {services.map((curElem) => {
          const { _id, service, description, price, provider } = curElem;

          return (
            <div className="card" key={_id}>
              <div className="card-img">
                <img
                  src="/images/design.png"
                  alt="service"
                  width="200"
                />
              </div>

              <div className="card-details">
                <div className="grid grid-two-cols">
                  <p>{provider}</p>
                  <p>{price}</p>
                </div>

                <h2>{service}</h2>
                <p>{description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Service;
