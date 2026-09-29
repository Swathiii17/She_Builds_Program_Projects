import React from "react";
const categories = [
  { label: "All", value: "All" },
  { label: "Action", value: "Action" },
  { label: "Comedy", value: "Comedy" },
  { label: "Drama", value: "Drama" },
  { label: "Horror", value: "Horror" },
  { label: "Sci-Fi", value: "SciFi" },
  { label: "Animation", value: "Animation" },
];

function CategoryFilter({ selected, onChange }) {
  return (
    <div className="category-row">
      {categories.map((category) => (
        <button
          key={category.value}
          className={selected === category.value ? "category active" : "category"}
          onClick={() => onChange(category.value)}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;