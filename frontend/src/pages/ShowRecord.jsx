import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowRecord = () => {
  const [record, setRecord] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/records/${id}`)
      .then((response) => {
        setRecord(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4 font-sans font-light">
      <BackButton />
      <h1 className="text-3xl my-4">Show Record</h1>
      {loading?(<Spinner/>):(
        <div className="felx flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id :</span>
            <span>{record._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title :</span>
            <span>{record.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Artist :</span>
            <span>{record.artist}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Released :</span>
            <span>{record.releaseYear}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Created At :</span>
            <span>{new Date(record.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Updated At :</span>
            <span>{new Date(record.updatedAt).toString()}</span>
          </div>

        </div>
      )}
    </div>
  );
};

export default ShowRecord;
