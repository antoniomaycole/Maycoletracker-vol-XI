import React from "react";

type Industry = "Health care" | "Restaurant" | "Construction" | "Retail" | string;

interface Props {
  onSelectIndustry?: (industry: Industry) => void;
  onMore?: (industry: string) => void;
}

const IndustryBar: React.FC<Props> = ({ onSelectIndustry, onMore }) => {
  const industries: Industry[] = [
    "Health care",
    "Restaurant",
    "Construction",
    "Retail",
  ];

  const handleSelect = (name: string) => {
    onSelectIndustry?.(name);
  };

  return (
    <div className="industry-bar" aria-label="Industry quick actions" role="navigation">
      {industries.map((it) => (
        <button
          key={it}
          className="btn btn-primary"
          onClick={() => handleSelect(it)}
          aria-label={`Select ${it} industry`}
        >
          {it}
        </button>
      ))}
      <div className="dropdown" aria-label="More industries">
        <button className="btn btn-secondary" aria-label="More industries">More</button>
        <div className="dropdown-menu" role="menu" aria-label="Additional industries">
          {[
            "Healthcare Supply",
            "Education",
            "Manufacturing",
            "Hospitality",
            "Logistics",
            "Other",
          ].map((name) => (
            <div
              key={name}
              className="dropdown-item"
              role="menuitem"
              onClick={() => onMore?.(name)}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndustryBar;
