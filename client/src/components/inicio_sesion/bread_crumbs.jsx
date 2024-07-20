import React from "react";
import { Link } from "react-router-dom";

function BreadCrumbs({ items }) {
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.link ? (
              <Link to={item.link} className="inline-flex gap-2 items-center dark:text-white">
                {item.icon && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="w-4 h-4 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={item.icon}
                    ></path>
                  </svg>
                )}
                {item.label}
              </Link>
            ) : (
              <span className="inline-flex gap-2 items-center">
                {item.icon && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="w-4 h-4 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={item.icon}
                    ></path>
                  </svg>
                )}
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BreadCrumbs;
