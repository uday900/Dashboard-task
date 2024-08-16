import React from 'react';

function Footer() {
  return (
    <footer className="text-center bg-body-tertiary border-top " id='contact'>
      {/* Grid container */}
      <div className="container pt-4">
        {/* Section: Social media */}
        <section className="mb-4">
          {/* Facebook */}
          <a
            className="btn btn-link btn-floating btn-lg text-body m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-facebook-f"></i>
          </a>

          {/* Twitter */}
          <a
            className="btn btn-link btn-floating btn-lg text-body m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-twitter"></i>
          </a>

          {/* Google */}
          <a
            className="btn btn-link btn-floating btn-lg text-body m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-google"></i>
          </a>

          {/* Instagram */}
          <a
            className="btn btn-link btn-floating btn-lg text-body m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-instagram"></i>
          </a>

          {/* Linkedin */}
          <a
            className="btn btn-link btn-floating btn-lg text-body m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-linkedin"></i>
          </a>

          {/* Github */}
          <a
            className="btn btn-link btn-floating btn-lg text-body m-1"
            href="#!"
            role="button"
          >
            <i className="fab fa-github"></i>
          </a>
        </section>
        {/* Section: Social media */}
      </div>
      {/* Grid container */}

      {/* Copyright */}
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2024 Copyright:
        <a className="text-body" href="https://mdbootstrap.com/">Dashboard.in</a>
      </div>
      {/* Copyright */}
    </footer>
  );
}

export default Footer;
