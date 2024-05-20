import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

let api_url = "https://dev.tlv-vip.com/ci/api/v1/";
const Addcountry = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    document.title = "Add Country";
  });

  const HandleSubmit = async () => {
    const country_data = new FormData();
    country_data.append("country_name", formData.name);
    country_data.append("dialing_code", formData.dialing_code);
    country_data.append("country_code", formData.country_code);
    await axios
      .post(api_url + "addcountry", country_data)
      .then((response) => {
        console.log("Response Whle Add Country", response);
        setFormData({});
        navigate("/countries");
      })
      .catch((error) => {
        console.log("Error while adding country", error);
      });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <Link to="/countries" className="float-right mt-2 btn btn-primary">
            Countries List
          </Link>
          <h1 className="text-left">Countries List</h1>
          <form>
            <div className="row">
              <div className="col-md-4">
                <label className="">Country Name:</label>
                <input
                  className="form-control"
                  type="text"
                  value={formData?.name || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-4">
                <label className="">Country Dialing Code:</label>
                <input
                  className="form-control"
                  type="text"
                  value={formData?.dialing_code || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dialing_code: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-4">
                <label className="">Country Code:</label>
                <input
                  className="form-control"
                  type="text"
                  value={formData?.country_code || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      country_code: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="mt-3 float-right">
              <button
                onClick={HandleSubmit}
                type="button"
                className="btn btn-primary"
              >
                Add Country
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addcountry;
