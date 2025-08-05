import React from "react";
import { useAppContext } from "../contexts/AppContext";
import CareerCard from "../components/CareerCard";
import Layout from "../components/Layout";

export default function Home() {
  const { careers, setCurrentCareerId } = useAppContext();

  return (
    <Layout>
      <div style={{ padding: "2rem" }}>
        <h1>Welcome to CareerOS</h1>
        <p>Choose a career expert to begin.</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "2rem" }}>
          {careers.map((career) => (
            <CareerCard
              key={career.id}
              career={career}
              onClick={() => setCurrentCareerId(career.id)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
