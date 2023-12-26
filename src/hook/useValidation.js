import * as z from "zod";

const useValidation = () => {
  const contactValidation = z.object({
    name: z.string().min(2, { message: "Your name is required" }),
    email: z.string().email().trim().toLowerCase(),
    phone: z.string(),
    message: z.string().min(2, { message: "Your message is required" }),
  });

  return contactValidation;
};
export default useValidation;
