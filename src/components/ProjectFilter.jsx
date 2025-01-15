import { useState } from "react";

const filters = ["all", "mine", "frontend", "backend", "marketing", "smm"];

function ProjectFilter({ changeFilter }) {
  const [currentFilter, setCurrentFilter] = useState("All");

  return (
    <div role="tablist" className="tabs tabs-boxed mb-8">
      {filters.map((filter) => {
        return (
          <a
            onClick={() => {
              changeFilter(filter);
              setCurrentFilter(filter);
            }}
            key={filter}
            role="tab"
            className={`tab ${currentFilter == filter ? "tab-active" : ""}`}
          >
            {filter}
          </a>
        );
      })}
    </div>
  );
}

export default ProjectFilter;
