import { Resend } from "resend";
import Email from "./Email2";
import useFormContact from "../../hook/useFormContact";
import clsx from "clsx";
const resend = new Resend("re_4NsSJUUk_DgR7Hh6dSGZNYFkM6UqyWqbG");
const Contact = () => {
  const { register, handleSubmit, errors, reset } = useFormContact();

  const handleSend = async (data) => {
    try {
      console.log("res");
      const res = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "micheltsilavodev@protonmail.com",
        subject: "Dear Woz",
      });
      console.log(res);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="py-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-warning"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M20 4H6c-1.103 0-2 .897-2 2v5h2V8l6.4 4.8a1.001 1.001 0 0 0 1.2 0L20 8v9h-8v2h8c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm-7 6.75L6.666 6h12.668L13 10.75z"></path>
            <path d="M2 12h7v2H2zm2 3h6v2H4zm3 3h4v2H7z"></path>
          </svg>
          <p className="text-2xl text-slate-100 font-semibold ">Dear Woz,</p>
        </div>
        <div className="grid grid-cols-1 ">
          <div className="rounded-lg bg-slate-100 p-8 shadow-lg lg:col-span-3 lg:p-12">
            <form onSubmit={handleSubmit(handleSend)} className="space-y-4">
              <div>
                <label className="sr-only" htmlFor="name">
                  Name
                </label>
                <input
                  //   className="w-full input input-warning rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Name"
                  type="text"
                  id="name"
                  className={clsx(
                    "w-full input rounded-lg input-bordered p-3 text-sm",
                    errors.name?.message && "input-error"
                  )}
                  {...register("name")}
                />
                <label className="label">
                  <span className="label-text-alt text-red-400">
                    {errors.name?.message}
                  </span>
                </label>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="sr-only" htmlFor="email">
                    Email
                  </label>
                  <input
                    // className="w-full rounded-lg border-gray-200 p-3 text-sm input input-warning"
                    placeholder="Email address"
                    type="email"
                    id="email"
                    className={clsx(
                      "w-full input rounded-lg input-bordered p-3 text-sm",
                      errors.name?.message && "input-error"
                    )}
                    {...register("email")}
                  />
                  <label className="label">
                    <span className="label-text-alt text-red-400">
                      {errors.email?.message}
                    </span>
                  </label>
                </div>

                <div>
                  <label className="sr-only" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    // className="w-full rounded-lg border-gray-200 p-3 text-sm input input-warning"
                    placeholder="Phone Number"
                    type="text"
                    id="phone"
                    className={clsx(
                      "w-full input rounded-lg input-bordered p-3 text-sm",
                      errors.phone?.message && "input-error"
                    )}
                    {...register("phone")}
                  />
                  <label className="label">
                    <span className="label-text-alt text-red-400">
                      {errors.phone?.message}
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="sr-only" htmlFor="message">
                  Message
                </label>

                <textarea
                  //   className="w-full rounded-lg border-gray-200 p-3 text-sm textarea textarea-warning"
                  placeholder="Message"
                  rows="8"
                  id="message"
                  className={clsx(
                    "w-full rounded-lg border-gray-200 p-3 text-sm textarea ",
                    errors.message?.message && "textarea-error"
                  )}
                  {...register("message")}
                ></textarea>
                <label className="label">
                  <span className="label-text-alt text-red-400">
                    {errors.message?.message}
                  </span>
                </label>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => handleSend()}
                  className="inline-block w-full rounded-lg px-5 py-3 font-medium text-white sm:w-auto btn btn-warning "
                >
                  Send to Woz
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
