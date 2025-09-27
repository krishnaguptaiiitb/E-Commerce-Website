import React from "react";

export default function StarRatingComponent({
  rating = 0,
  maxStars = 5,
  handleRatingChange,
  size = 24,
  readOnly = false,
}) {
  // Show filled stars up to rating, rest are empty
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {Array.from({ length: maxStars }).map((_, idx) => {
        const filled = idx < Math.round(rating);
        return (
          <span
            key={idx}
            style={{
              cursor: readOnly ? "default" : "pointer",
              fontSize: size,
              color: filled ? "#FFD700" : "#E5E7EB",
              transition: "color 0.2s",
            }}
            onClick={
              !readOnly && handleRatingChange
                ? () => handleRatingChange(idx + 1)
                : undefined
            }
            role={readOnly ? undefined : "button"}
            aria-label={readOnly ? undefined : `Rate ${idx + 1} stars`}
          >
            {filled ? "★" : "☆"}
          </span>
        );
      })}
    </div>
  );
}
