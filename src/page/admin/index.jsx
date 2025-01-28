import React, { useState, useEffect } from "react";
import Map from "../../components/admin/Map";
import AxiosInstance from "../../../utils/AxiosInstance";
import { getUser, notifySuccess } from "../../../utils/helpers";
import {
  AccountCircle,
  ShoppingCart,
  Event,
  Download,
} from "@mui/icons-material";
const index = () => {
  const [userCount, setUserCount] = useState(0);
  const [spaceCount, setSpaceCount] = useState(0);
  const user = getUser();
  const fetchUserCount = async () => {
    try {
      await AxiosInstance.get("/users/count").then((response) => {
        if (response.status === 200) {
          setUserCount(response.data.count);
          console.log(response);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSpaceCount = async () => {
    try {
      await AxiosInstance.get("/spaces/count").then((response) => {
        if (response.status === 200) {
          setSpaceCount(response.data.count);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserCount();
    fetchSpaceCount();
  }, []);

  return (
    <div>
      <div>
        <div className="flex gap-4 mt-4">
          {/* Widget Cards */}
          <div className="flex-1 min-w-[200px] p-6 text-center bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
            <AccountCircle
              color="primary"
              className="text-5xl text-blue-500 mb-4"
            />
            <h6 className="text-xl font-semibold text-gray-600">Users</h6>
            <h4 className="text-3xl font-bold text-gray-900">{userCount}</h4>
          </div>

          <div className="flex-1 min-w-[200px] p-6 text-center bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
            <AccountCircle
              color="primary"
              className="text-5xl text-blue-500 mb-4"
            />
            <h6 className="text-xl font-semibold text-gray-600">Spaces</h6>
            <h4 className="text-3xl font-bold text-gray-900">{spaceCount}</h4>
          </div>

          <div className="flex-1 min-w-[200px] p-6 text-center bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
            <AccountCircle
              color="primary"
              className="text-5xl text-blue-500 mb-4"
            />
            <h6 className="text-xl font-semibold text-gray-600">Users</h6>
            <h4 className="text-3xl font-bold text-gray-900">{userCount}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
