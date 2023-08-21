import React, { useContext } from "react";
import { LoginContext } from "../context/ContextProvider";
import { ToastContainer, toast } from "react-toastify";

//components
import { Base_URL } from "../../Constants/data";

const Option = ({ deleteData, getdatabuy }) => {
  const { account, setAccount } = useContext(LoginContext);

  const removeData = async (req, res) => {
    const result = await fetch(`${Base_URL}/remove/${deleteData}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await result.json();
    console.log(data, "from options");

    if (result.status === 400 || !data) {
      console.log("error");
    } else {
      console.log("user Delete");
      setAccount(data);
      getdatabuy();
      toast.success("Item removed from Cart", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="add_remove_select">
      <select>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <p style={{ cursor: "pointer" }} onClick={() => removeData(deleteData)}>
        Delete
      </p>
      <span>|</span>
      <p className="forremovemedia">Save For Later</p>
      <span>|</span>
      <p className="forremovemedia">See More like this</p>
      <ToastContainer />
    </div>
  );
};

export default Option;
