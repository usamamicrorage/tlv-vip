import { Margin } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

let api_url = "https://dev.tlv-vip.com/ci/api/v1/";
function Countrieslist() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  const [countries, setCountries] = useState([]);
  const [loader, setLoader] = useState(false);
  const [faqs, SetFaqs] = useState([]);
  useEffect(() => {
    document.title = "Countries List";
    count();
    GetFaqs();
  }, []);

  const count = async () => {
    setLoader(true);
    await axios
      .get(api_url + "get_countries")
      .then((response) => {
        const arr = response?.data?.data?.map((item, index) => {
          console.log("");
          return Object.values(item);
        });
        setCountries(arr);
      })
      .catch((error) => {
        console.log("Error while fetching Countries", error);
      })
      .finally(() => setLoader(false));
  };

  const handleLogout = () => {
    dispatch({
      type: "clearUser",
    });
    navigate("/");
  };

  const columns = ["Country Code", "Country", "Dialing Code", "Action"];
  const options = {
    filterType: "checkbox",
    rowsPerPageOptions: [5, 10, 20, 30, 50, 100],
    rowsPerPage: 5,
  };

  const GetFaqs = () => {
    setLoader(true);
    axios
      .get(api_url + "get_faqs/rewards")
      .then((response) => {
        console.log("Faqs", response?.data?.data);
        SetFaqs(response?.data?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link
              to="/add-country"
              className="float-right mb-2 mt-2 btn btn-primary"
            >
              Add Country
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="float-left mb-1 mx-5 btn btn-danger"
            >
              Logout
            </button>
            {loader && <CircularProgress className="mt-2" size={30} />}
            <MUIDataTable
              title={"Countries List"}
              data={countries}
              columns={columns}
              options={options}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Countrieslist;
