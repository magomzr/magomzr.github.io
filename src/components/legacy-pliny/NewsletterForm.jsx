import { useState } from "react";

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const API_KEY =
      "eo_317cff056cd4f0acb9ff8f247f09124e606627f6be5e27f970509542aa379a8f";
    const LIST_ID = "9296-11ef-bc16-c32a44f17edd";
    const API_URL = `https://emailoctopus.com/api/1.6/lists/${LIST_ID}/contacts`;

    const data = {
      email_address: email,
      api_key: API_KEY,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatusMessage("¡Te has suscrito con éxito al boletín!");
        setEmail(""); // Limpia el campo de email después de suscribirse
      } else {
        const errorData = await response.json();
        setStatusMessage(
          errorData.error || "Hubo un error al suscribirse a la lista."
        );
      }
    } catch (error) {
      setStatusMessage(error.message || "Ocurrió un error inesperado.");
    }
  };

  return (
    <div>
      <div className="pb-1 text-lg font-semibold text-gray-800 dark:text-gray-100">
        Subscribe to the newsletter
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row">
        <div>
          <label htmlFor="email-input">
            <span className="sr-only">Email address</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="focus:ring-primary-600 w-72 rounded-md px-4 focus:border-transparent focus:outline-none focus:ring-2 dark:bg-black"
              id="email-input"
              placeholder="Enter your email"
              required
              type="email"
              name="email"
            />
          </label>
        </div>
        <div className="mt-2 flex w-full rounded-md shadow-sm sm:mt-0 sm:ml-3">
          <button
            className="bg-primary-500 w-full rounded-md py-2 px-4 font-medium text-white sm:py-0 hover:bg-primary-700 dark:hover:bg-primary-400 focus:ring-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black"
            type="submit"
          >
            Sign up
          </button>
        </div>
      </form>
      {statusMessage && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {statusMessage}
        </p>
      )}
    </div>
  );
}

export default NewsletterForm;
