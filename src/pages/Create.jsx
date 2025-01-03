import { Form, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";
import FormTextarea from "../components/FormTextarea";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { useFirestore } from "../hooks/useFirestore";

const animatedComponent = makeAnimated();

export async function action({ request }) {
  const form = await request.formData();
  const name = form.get("name");
  const description = form.get("description");
  const dueTo = Timestamp.fromDate(new Date(form.get("dueTo")));
  return { name, description, dueTo };
}
const usersOptions = [
  { value: "user1", label: "User1" },
  { value: "user2", label: "User2" },
  { value: "user3", label: "User3" },
];
const projectTypes = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "marketing", label: "Marketing" },
  { value: "smm", label: "SMM" },
];
function Create() {
  const { addDocument } = useFirestore();
  const createActionData = useActionData();
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [projectType, setProjectType] = useState([]);

  const selectUser = (user) => {
    setAssignedUsers(user);
  };
  const selectProjectType = (type) => {
    setProjectType(type);
  };
  useEffect(() => {
    if (createActionData) {
      addDocument("projects", {
        ...createActionData,
        assignedUsers,
        projectType,
        createdAt: serverTimestamp(new Date()),
      });
    }
  }, [createActionData]);
  return (
    <div>
      <h2 className="text-3xl font-semibold">Create a new project</h2>
      <Form method="post" className="flex flex-col gap-7">
        <FormInput
          label="Project name"
          type="text"
          placeholder="Write project name here"
          name="name"
        />
        <FormTextarea label="Project description" name="description" />
        <FormInput label="Set due to" type="date" name="dueTo" />
        <label className="form-control w-full mb-2">
          <div className="label">
            <span className="label-text">Project type:</span>
          </div>
          <Select
            onChange={selectProjectType}
            options={projectTypes}
            isMulti
            components={animatedComponent}
          />
        </label>
        <label className="form-control w-full mb-2">
          <div className="label">
            <span className="label-text">Assign users:</span>
          </div>
          <Select
            onChange={selectUser}
            options={usersOptions}
            isMulti
            components={animatedComponent}
          />
        </label>
        <div className="flex justify-end">
          <button className="btn btn-neutral">Add Project</button>
        </div>
      </Form>
    </div>
  );
}

export default Create;
