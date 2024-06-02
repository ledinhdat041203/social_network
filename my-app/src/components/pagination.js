import React from "react";

const Pagination = () => {
  return (
    <nav aria-label="Page navigation example" className="pagination-bar">
      <ul className="pagination justify-content-center">
        {/* {% if posts.has_previous %} */}
        <li className="page-item">
          <a
            className="page-link"
            href="?page={{ posts.previous_page_number | default:1}}"
            tabIndex="-1"
            aria-disabled="true"
          >
            Previous
          </a>
        </li>
        {/* {% else %}
    <li className="page-item disabled">
      <a className="page-link" href="" tabindex="-1" aria-disabled="true"
        >Previous</a
      >
    </li>
    {% endif %} */}
        {/* {% for each in posts.paginator.page_range %} {% if
    each == posts.number %} */}
        <li className="page-item active">
          <a className="page-link" href="?page={{each}}">
            {/* {{ each }} */}
          </a>
        </li>
        {/* {% else %}
    <li className="page-item">
      <a className="page-link" href="?page={{each}}">{{each}}</a>
    </li>
    {% endif %} {% endfor %}  */}
        {/* {% if posts.has_next %} */}
        <li className="page-item">
          <a className="page-link" href="?page={{ posts.next_page_number }}">
            Next
          </a>
        </li>
        {/* {% else %}
    <li className="page-item disabled">
      <a className="page-link" href="">Next</a>
    </li>
    {% endif %} */}
      </ul>
    </nav>
  );
};

export default Pagination;
