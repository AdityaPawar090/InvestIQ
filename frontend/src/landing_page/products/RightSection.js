import React from "react";

function RightSection({
  imageURL,
  productName,
  productDescription,
  learnMore,
}) {
  return (
    <section className="container py-5">

      <div className="row align-items-center">

        {/* Content */}
        <div className="col-lg-6 order-2 order-lg-1">

          <span className="badge bg-primary px-3 py-2 mb-3">
            Feature
          </span>

          <h2 className="fw-bold mb-4">
            {productName}
          </h2>

          <p
            className="text-muted fs-5"
            style={{ lineHeight: "1.8" }}
          >
            {productDescription}
          </p>

          {learnMore && (
            <div className="mt-4">
              <a
                href={learnMore}
                className="btn btn-outline-primary rounded-pill px-4"
              >
                Learn More
              </a>
            </div>
          )}

        </div>

        {/* Image */}
        <div className="col-lg-6 text-center mb-4 mb-lg-0 order-1 order-lg-2">

          <img
            src={imageURL}
            alt={productName}
            className="img-fluid rounded-4 shadow"
            style={{ maxWidth: "90%" }}
          />

        </div>

      </div>

    </section>
  );
}

export default RightSection;