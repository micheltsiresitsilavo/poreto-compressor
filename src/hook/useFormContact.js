import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useValidation from "./useValidation";

const useFormContact = () => {
  const contactValidation = useValidation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactValidation),
  });
  return { register, handleSubmit, errors, reset };
};

export default useFormContact;
