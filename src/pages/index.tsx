import React from "react";
import { useAppContext } from "../contexts/AppContext";
import CareerCard from "../components/CareerCard";
import Layout from "../components/Layout";

export default function Home() {
  const { careers, setCurrentCareerId } = useAppContext();

  return (


        Welcome to CareerOS
        Choose a career expert to begin.



        {careers.map((career) => (
           setCurrentCareerId(career.id)}
          />
        ))}


  );
}
