import "../styles/globals.css";
import "bulma/css/bulma.css";
import "highlight.js/styles/base16/tomorrow.css";
import "react-datepicker/dist/react-datepicker.css";
import "toastify-js/src/toastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="tile">
            <div className="tile is-vertical is-8">
              <div className="tile">
                <div>
                  <Component {...pageProps} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MyApp;
