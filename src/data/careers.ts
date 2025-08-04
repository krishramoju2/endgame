export interface Career {
  id: string;
  icon: string;
  description: string;
  responses: string[];
}

export const CAREERS: Career[] = [
  {
    id: "resume-builder",
    icon: "📄",
    description: "Get help crafting an outstanding resume tailored to your field.",
    responses: [
      "Highlight measurable achievements using action verbs.",
      "Tailor your resume for each role using keywords from the job description.",
      "Keep it under 2 pages unless applying for academic/research roles.",
      "Include links to portfolio, GitHub, or personal site if relevant.",
      "Use a clean, modern layout with clear section headings."
    ]
  },
  {
    id: "upskilling-guide",
    icon: "📚",
    description: "Learn what skills to master in your domain and how to do it.",
    responses: [
      "Start with foundational courses on Coursera or edX in your field.",
      "Practice on real-world projects using Kaggle, GitHub, or open source.",
      "Learn both theory (books) and tools (frameworks, software) together.",
      "Join communities or Discord groups to stay current with trends.",
      "Follow learning paths on platforms like Roadmap.sh or freeCodeCamp."
    ]
  },
  {
    id: "internship-finder",
    icon: "🧑‍💼",
    description: "Explore top companies that offer internships in your field.",
    responses: [
      "Google STEP and Microsoft Explore are great for beginners.",
      "Check AngelList or YCombinator's job board for startup internships.",
      "Government labs like DRDO and ISRO offer research internships.",
      "Use LinkedIn filters with 'Intern' and 'Remote' to find flexible roles.",
      "GitHub issues tagged 'good first issue' help build credibility."
    ]
  },
  {
    id: "colleges-abroad-advisor",
    icon: "🌍",
    description: "Find top universities around the world for your field of study.",
    responses: [
      "For CS, look into Stanford, MIT, ETH Zurich, and National Univ. of Singapore.",
      "UK has great 1-year master's programs — check Imperial and UCL.",
      "Germany (like TU Munich) offers tuition-free programs in English.",
      "Canada's top choices include UBC, University of Toronto, and Waterloo.",
      "Use websites like MastersPortal, DAAD, or QS Rankings to filter options."
    ]
  }
];
