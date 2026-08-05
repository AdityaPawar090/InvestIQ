import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <section className="container py-5">

      <div className="row align-items-center">

        {/* Image */}
        <div className="col-lg-6 text-center mb-4 mb-lg-0">

          <img
            src={imageURL}
            alt={productName}
            className="img-fluid rounded-4 shadow"
            style={{ maxWidth: "90%" }}
          />

        </div>

        {/* Content */}
        <div className="col-lg-6">

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

          <div className="mt-4 d-flex flex-wrap gap-3">

            {tryDemo && (
              <a
                href={tryDemo}
                className="btn btn-primary rounded-pill px-4"
              >
                Try Demo
              </a>
            )}

            {learnMore && (
              <a
                href={learnMore}
                className="btn btn-outline-primary rounded-pill px-4"
              >
                Learn More
              </a>
            )}

          </div>

          {(googlePlay || appStore) && (
            <div className="mt-4 d-flex flex-wrap gap-3">

              {googlePlay && (
                <a href={googlePlay}>
                  <img
                    src="media/images/googlePlayBadge.svg"
                    alt="Google Play"
                    style={{ height: "50px" }}
                  />
                </a>
              )}

              {appStore && (
                <a href={appStore}>
                  <img
                    src="media/images/appStoreBadge.svg"
                    alt="App Store"
                    style={{ height: "50px" }}
                  />
                </a>
              )}

            </div>
          )}

        </div>

      </div>

    </section>
  );
}

export default LeftSection;