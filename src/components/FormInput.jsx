function FormInput({ type, label, placeholder, name }) {
  return (
    <label className="form-control w-full mb-2">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className="input input-bordered w-full \"
        name={name}
      />
    </label>
  );
}

export default FormInput;
