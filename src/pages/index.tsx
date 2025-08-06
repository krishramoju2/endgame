import React from "react";
import { useAppContext } from "../contexts/AppContext";
import CareerCard from "../components/CareerCard";
import Layout from "../components/Layout";

// Define TypeScript interfaces (remove if not using TS)
interface Career {
  id: string;
  icon?: React.ReactNode;
  description?: string;
}

export default function Home() {
  const { careers, setCurrentCareerId } = useAppContext();

  // Safeguard against undefined/empty careers
  if (!careers || careers.length === 0) {
    return (
      <Layout>
        <div style={{ padding: "2rem" }}>
          <h1>Welcome to CareerOS</h1>
          <p>No career options available at the moment.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ padding: "2rem" }}>
        <h1>Welcome to CareerOS</h1>
        <p>Choose a career expert to begin.</p>

        <div 
          style={{ 
            display: "flex", 
            flexWrap: "wrap", 
            gap: "1rem", 
            marginTop: "2rem" 
          }}
        >
          {careers.map((career) => {
            // Validate required fields
            if (!career.id) {
              console.error("Career missing ID:", career);
              return null;
            }

            return (
              <CareerCard
                key={career.id}
                career={career}
                onClick={() => setCurrentCareerId(career.id)}
              />
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
