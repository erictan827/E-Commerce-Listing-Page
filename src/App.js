import React, { useState, useEffect } from "react";
import "./styles.css";

function ProductListing() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [searchInput, setSearchInput] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const [currentYear] = useState(new Date().getFullYear());
  const [isActive, setIsActive] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // -------------- Data fetching --------------

  useEffect(() => {
    fetch("http://localhost/api/products.php")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);

        const allCategories = data.flatMap((product) => product.category);
        const uniqueCategories = Array.from(new Set(allCategories));
        setCategories(uniqueCategories);
      });
  }, []);

  // -------------- Filtering and sorting --------------

  useEffect(() => {
    applyFilters();
  }, [filters, sortOrder, selectedCategories]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts]);

  const applyFilters = () => {
    let filteredData = [...products];
    if (filters.search) {
      filteredData = filteredData.filter((product) =>
        product.name.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
    if (selectedCategories.length > 0) {
      filteredData = filteredData.filter((product) => {
        const productCategories = product.category;
        return selectedCategories.some((category) =>
          productCategories.includes(category)
        );
      });
    }

    if (minPrice) {
      filteredData = filteredData.filter(
        (product) => product.price >= minPrice
      );
    }
    if (maxPrice) {
      filteredData = filteredData.filter(
        (product) => product.price <= maxPrice
      );
    }

    filteredData.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else if (sortOrder === "desc") {
        return b.name.localeCompare(a.name);
      } else if (sortOrder === "price-low-high") {
        return a.price - b.price;
      } else if (sortOrder === "price-high-low") {
        return b.price - a.price;
      } else if (sortOrder === "new-to-old") {
        return new Date(b.created_at) - new Date(a.created_at);
      }
    });

    setFilteredProducts(filteredData);
  };

  // -------------- Event handlers --------------

  const toggleFilters = (event) => {
    event.preventDefault();
    setShowFilters(!showFilters);
  };

  function toggleMenu() {
    setIsActive(!isActive);
  }

  const handleMinPriceChange = (event) => {
    setMinPrice(Number(event.target.value));
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(Number(event.target.value));
  };

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
    setFilters({ ...filters, search: event.target.value });
    applyFilters();
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    if (event.target.checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(
        selectedCategories.filter(
          (selectedCategory) => selectedCategory !== category
        )
      );
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  // Count the number of products for each category
  const countProductsForCategory = (category) => {
    return products.reduce((count, product) => {
      if (product.category.includes(category)) {
        return count + 1;
      }
      return count;
    }, 0);
  };

  // Create an array of page numbers for pagination
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredProducts.length / productsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  // Map through an array of page numbers and create a list item for each number
  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li
        key={number}
        id={number}
        onClick={handlePageClick}
        className={currentPage === number ? "active" : ""}
      >
        {number}
      </li>
    );
  });

  const indexOfLastProduct = currentPage * productsPerPage; // Calculate the index of the last product to be displayed on the current page
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage; // Calculate the index of the first product to be displayed on the current page
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  ); // Slice the filtered products array to get only the products to be displayed on the current page

  // Map through an array of products and truncate the name if it's longer than 20 characters
  const truncatedProducts = products.map((product) => {
    if (product.name.length > 20) {
      product.name = product.name.substring(0, 20) + "...";
    }
    return product;
  });

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <img src="./images/logo.png" alt="Logo" />
          <button className="navbar-toggler" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className={`navbar-menu ${isActive ? "active" : ""}`}>
          <a href="#">Home</a>
          <a href="#">Products</a>
        </div>
      </nav>
      <div className="banner-container">
        <img src={`./images/header-banner.png`}></img>
      </div>
      <form class="search-bar">
        <input
          type="text"
          placeholder="Search products"
          value={searchInput}
          onChange={handleSearchInput}
        />
      </form>

      <div className="sidebar-menu">
        <div className="sidebar-menu-header">
          <h2>Filters</h2>
          <button onClick={toggleFilters}>
            {" "}
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>
        {showFilters && (
          <div className="sidebar-menu-content">
            <div className="sidebar-menu-section">
              <h3>Category</h3>
              <ul>
                {categories.map((category, index) => {
                  const count = countProductsForCategory(category);
                  return (
                    <li key={index}>
                      <input
                        type="checkbox"
                        id={`category-${index}`}
                        onChange={handleCategoryChange}
                        value={category}
                        checked={selectedCategories.includes(category)}
                      />
                      <label htmlFor={`category-${index}`}>
                        <span>{category}</span>
                        <small>({count})</small>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="sidebar-menu-section">
              <h3>Price Range</h3>
              <div className="price-range">
                <input
                  type="number"
                  value={minPrice}
                  onChange={handleMinPriceChange}
                  placeholder="Min"
                />
                <input
                  type="number"
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                  placeholder="Max"
                />
              </div>
            </div>
            <div className="sidebar-menu-section">
              <h3>Sort Order</h3>
              <select
                name="sort-by"
                id="sort-by"
                value={sortOrder}
                onChange={handleSortOrderChange}
              >
                <option value="asc">Name (A-Z)</option>
                <option value="desc">Name (Z-A)</option>
                <option value="price-low-high">Price : Low to High</option>
                <option value="price-high-low">Price : High to Low</option>
                <option value="new-to-old">Newness</option>
              </select>
            </div>
            <div className="sidebar-menu-section">
              <button onClick={applyFilters}>Filter</button>
            </div>
          </div>
        )}
      </div>

      <section className="section products">
        <div className="products-layout container">
          <div className="col-1-of-4">
            <div>
              <div className="block-title">
                <h2>Category</h2>
              </div>
              <div className="block-content">
                {categories.map((category, index) => {
                  const count = countProductsForCategory(category);
                  return (
                    <li key={index}>
                      <input
                        type="checkbox"
                        id={`category-${index}`}
                        onChange={handleCategoryChange}
                        value={category}
                        checked={selectedCategories.includes(category)}
                      />
                      <label htmlFor={`category-${index}`}>
                        <span>{category}</span>
                        <small>({count})</small>
                      </label>
                    </li>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="filter-container">
                <div className="block-title">
                  <h2>Price range</h2>
                </div>
                <div className="filter-inputs">
                  <div>
                    <input
                      type="number"
                      value={minPrice}
                      onChange={handleMinPriceChange}
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={handleMaxPriceChange}
                      placeholder="Max"
                    />
                    <button onClick={applyFilters}>Filter</button>
                  </div>
                </div>
              </div>
              <div className="filter-container">
                <img
                  src={`./images/promotion-sample.png`}
                  className="filter-image"
                />
              </div>
            </div>
          </div>

          <div className="col-3-of-4">
            <form>
              <div className="searchField">
                <input
                  type="text"
                  id="searchField"
                  placeholder="Search products"
                  value={searchInput}
                  onChange={handleSearchInput}
                />
              </div>
              <div className="item">
                <label htmlFor="order-by">Order</label>
                <select
                  name="sort-by"
                  id="sort-by"
                  value={sortOrder}
                  onChange={handleSortOrderChange}
                >
                  <option value="asc">Name (A-Z)</option>
                  <option value="desc">Name (Z-A)</option>
                  <option value="price-low-high">Price : Low to High</option>
                  <option value="price-high-low">Price : High to Low</option>
                  <option value="new-to-old">Newness</option>
                </select>
              </div>
            </form>

            <div className="product-layout">
              {currentProducts.length ? (
                currentProducts.map((product) => (
                  <div className="product" key={product.id}>
                    <div className="img-container">
                      <img
                        src={`./images/${product.images}`}
                        alt={product.name}
                      />
                    </div>
                    <div className="bottom">
                      <a href="#">{product.name}</a>
                      <div className="price">
                        <span className="price-currency">$</span>
                        <span className="price-value">{product.price}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <img src="./images/search.png" alt="No results found" />
                  <p>Sorry, no products found.</p>
                </div>
              )}
            </div>
            <ul id="page-numbers" className="pagination">
              {" "}
              {renderPageNumbers}
            </ul>
          </div>
        </div>
      </section>
      <footer>
        <div class="container">
          <div class="row">
            <div class="col-12">
              <p>&copy; {currentYear} E-Commerce. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default ProductListing;
