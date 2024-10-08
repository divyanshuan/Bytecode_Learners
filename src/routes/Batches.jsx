import React, { useEffect, useState } from "react";
import BatchesCard from "../components/BatchesCard";
import BatchesNavbar from "../components/BatchesNavbar";
import { sticky } from "../components/Navbar";
import "../styles/batches.css";
import axios from "../api/axios";
import { batches_with_members } from "../data/data";

const Batches = () => {
  // const [allBatches, setAllBatches] = useState([]); step 1 , to restore
  const [allBatches, setAllBatches] = useState(batches_with_members);
  const [yearsList, setYearsList] = useState([]);
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    sticky();
  }, []);

  useEffect(() => {
    const newYearsList = getYearsTillCurrentYear();
    setYearsList(newYearsList);
    if (newYearsList.length > 1) {
      setMenuData(allBatches.filter((mem) => mem.batch === newYearsList[0]));
    }
  }, [allBatches]);

  const getYearsTillCurrentYear = () => {
    const yearsList = new Set();
    allBatches.forEach((mem) => {
      yearsList.add(mem.batch);
    });
    yearsList.add("ALL");
    return Array.from(yearsList).sort();
  };

  const getAllActiveMember = async () => {
    const response = await axios.get("member/getactive");
    setAllBatches(response.data.data);
  };

  const filterItem = (category) => {
    if (category === "ALL") {
      setMenuData([...allBatches]);
      return;
    } else {
      const updatedList = [...allBatches].filter((curElem) => {
        return curElem.batch === category;
      });

      setMenuData(updatedList);
    }
  };

  return (
    <div className="batches">
      <BatchesNavbar filterItem={filterItem} menuList={yearsList} />
      <BatchesCard batchData={menuData} />
    </div>
  );
};

export default Batches;
