import { useContext, useEffect, useRef } from "react";
import classes from "./newsletter-registration.module.css";
import { NotificationContext } from "../../store/index";

function NewsletterRegistration() {
  const inputEmail = useRef();
  const cx = useContext(NotificationContext);

  

  function registrationHandler(event) {
    event.preventDefault();
    const enteredEmail = inputEmail.current.value;

    cx.showNotification({
      title: "Signin up...",
      message: "Registering newsLetter",
      status: "pending",
    });

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        resp.json().then((data) => {
          console.log('erro');
        });
      })
      .then((data) => {
        cx.showNotification({
          title: "Success",
          message: "Successfully registered for newsletter",
          status: "success",
        });
      })
      .catch((error) => {
        cx.showNotification({
          title: "Error!",
          message: error.message || "Ocurred error",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={inputEmail}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
