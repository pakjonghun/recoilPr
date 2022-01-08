import _ from "lodash";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { makeTodo, todoState } from "../atoms";

type TypeTodo = { name: string };

const DashboardForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TypeTodo>({ mode: "onChange" });
  const setValue = useSetRecoilState(todoState);

  const onSubmit = handleSubmit((data) => {
    setValue((pre) => {
      const cur = _.cloneDeep(pre);
      cur[data.name] = [];
      return cur;
    });
  });

  return (
    <form
      className=" top-2 left-2 px-5 py-3 bg-blue-200 rounded-md"
      onSubmit={onSubmit}
    >
      {errors?.name?.message && (
        <p className="text-red-600">{errors.name.message}</p>
      )}
      <input
        className="px-3 py-2 mr-3"
        {...register("name", {
          required: { value: true, message: "insert plz" },
        })}
        type="text"
        placeholder="Dashboard"
      />

      <input
        className="p-2 bg-indigo-300  rounded-md"
        type="submit"
        value="입력"
      />
    </form>
  );
};

export default DashboardForm;
