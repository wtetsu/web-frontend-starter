import Toastify from "toastify-js";

const info = (message: string) => {
  Toastify({
    text: message,
    duration: 10000,
    gravity: "bottom",
    backgroundColor: "#3298dc",
  }).showToast();
};

const warn = (message: string) => {
  Toastify({
    text: message,
    duration: 10000,
    gravity: "bottom",
    backgroundColor: "#ffdb4a",
  }).showToast();
};

const error = (message: string) => {
  Toastify({
    text: message,
    duration: 10000,
    gravity: "bottom",
    backgroundColor: "#f14668",
  }).showToast();
};

const message = { info, warn, error };

export { message, info, warn, error };
