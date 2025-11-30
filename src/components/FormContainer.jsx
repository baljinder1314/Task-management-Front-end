import React from "react";

function FormContainer({ children }) {
  return (
    <div className="min-h-screen scroll-auto bg-gray-300 w-full fixed flex justify-center items-center">
      <div className=" rounded py-6 px-8 bg-white ">{children}</div>
    </div>
  );
}

export default FormContainer;
