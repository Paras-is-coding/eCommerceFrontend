import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import productSvc from '../../cms/product/product.service';
import ProductSingleGrid from '../../../component/home/product/product-singlegrid.component';
import categorySvc from '../../cms/category/category.service';
import brandSvc from '../../cms/brand/brand.service';

const SearchResultPage = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  const [searchQuery, setSearchQuery] = useState(urlParams.get('query') || '');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filters, setFilters] = useState({
    category: urlParams.get('category') || '',
    brand: urlParams.get('brand') || '',
  });
  const [sortOption, setSortOption] = useState(urlParams.get('sort') || '');

  const navigate = useNavigate();
  const searchInputRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, categoriesResponse, brandResponse] = await Promise.all([
          productSvc.getProductForHome({
            search: searchQuery,
            category: filters.category,
            brand: filters.brand,
            sort: sortOption,
          }),
          categorySvc.getCategoryForHome(),
          brandSvc.getBrandForHome(),
        ]);
        setProducts(productsResponse.data.result);
        setCategories(categoriesResponse.data.result);
        setBrands(brandResponse.data.result);


      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchQuery, filters, sortOption]);

  useEffect(() => {
    searchInputRef.current.focus();
  }, []); 

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleFilterReset = () => {
    setFilters({ category: '', brand: '' });
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Redirect to the same page with updated filters and sorting option
    navigate(`/search?search=${searchQuery}&category=${filters.category}&brand=${filters.brand}&sort=${sortOption}`);
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={3}>
          {/* Filters section */}
          <Form onSubmit={handleSearchSubmit}>
            <Form.Group controlId="searchQuery">
              <Form.Control
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                ref={searchInputRef}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelectCategory">
              {/* Categories filter */}
              <Form.Label className='text-muted'>Categories :</Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category._id}>{category.title}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelectBrand">
              {/* Brands filter */}
              <Form.Label className='text-muted'>Brands :</Form.Label>
              <Form.Control
                as="select"
                name="brand"
                value={filters.brand}
                onChange={handleFilterChange}
              >
                <option value="">All Brands</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand._id}>{brand.title}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelectSort">
              {/* Sort options */}
              <Form.Label className='text-muted'>Sort By :</Form.Label>
              <Form.Control
                as="select"
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="">Default</option>
                <option value="afterDiscount,desc">Price: High to Low</option>
                <option value="afterDiscount,asc">Price: Low to High</option>
                <option value="createdAt,desc">New Arrivals</option>
              </Form.Control>
            </Form.Group>
            <Button variant="secondary" onClick={handleFilterReset} className="mr-2 mt-2">Reset Filters</Button>
            <Button type="submit" className="ml-2 mt-2 float-end">Search</Button>
          </Form>
        </Col>
        <Col md={9}>
          {/* Display products */}
          <Row className="mt-2">
            {products.map((item, ind) => (
              <ProductSingleGrid product={item} key={ind}/>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchResultPage;
