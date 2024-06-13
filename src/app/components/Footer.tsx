import Link from "next/link";

const Footer = () => (
  <>
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>FOR PARENTS</h5>
            <ul className="list-unstyled">
              <li>
                <Link href="/parent-resources">
                  <p className="text-white">Parent Resources</p>
                </Link>
              </li>
              <li>
                <Link href="/how-it-works">
                  <p className="text-white">How It Works</p>
                </Link>
              </li>
              <li>
                <Link href="/testimonials">
                  <p className="text-white">Testimonials</p>
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use">
                  <p className="text-white">Terms of Use</p>
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy">
                  <p className="text-white">Privacy Policy</p>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>FOR PROVIDERS</h5>
            <ul className="list-unstyled">
              <li>
                <Link href="/provider-resources">
                  <p className="text-white">Provider Resources</p>
                </Link>
              </li>
              <li>
                <Link href="/how-it-works">
                  <p className="text-white">How It Works</p>
                </Link>
              </li>
              <li>
                <Link href="/testimonials">
                  <p className="text-white">Testimonials</p>
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions">
                  <p className="text-white">Terms and Conditions</p>
                </Link>
              </li>
              <li>
                <Link href="/list-your-program">
                  <p className="text-white">List Your Program</p>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>MORE</h5>
            <ul className="list-unstyled">
              <li>
                <Link href="/about-us">
                  <p className="text-white">About Us</p>
                </Link>
              </li>
              <li>
                <Link href="/press">
                  <p className="text-white">Press</p>
                </Link>
              </li>
              <li>
                <Link href="/jobs">
                  <p className="text-white">Jobs</p>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <p className="text-white">Contact Us</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-3">
          <a href="https://facebook.com" className="text-white me-3">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="https://twitter.com" className="text-white me-3">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="https://instagram.com" className="text-white">
            <i className="bi bi-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  </>
);

export default Footer;
