import  { useEffect, useState } from 'react';
import axios from 'axios';

const Owner = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ imageLink: '', title: '', price: '' });
  const [editProduct, setEditProduct] = useState({ id: '', imageLink: '', title: '', price: '' });

  // Base URL for your API
  const API_BASE_URL = 'https://rrnaturals.onrender.com/use'; // Adjust the API endpoint as necessary

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/getproducts`); 
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Handle adding a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/upload`, newProduct);
      setProducts([...products, { ...newProduct, _id: response.data._id }]); // Include new product ID
      setNewProduct({ imageLink: '', title: '', price: '' }); // Reset form
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  // Handle deleting a product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete/${id}`);
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Handle updating a product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/update/${editProduct.id}`, editProduct);
      setProducts(products.map(product => (product._id === editProduct.id ? editProduct : product)));
      setEditProduct({ id: '', imageLink: '', title: '', price: '' }); // Reset form
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editProduct.id) {
      setEditProduct({ ...editProduct, [name]: value });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleEditClick = (product) => {
    setEditProduct(product);
  };

  return (
    <div className="owner-container">
      <h1 className="owner-header">Manage Products</h1>

      {/* Add New Product Form */}
      <form className="product-form" onSubmit={handleAddProduct}>
        <h2>Add New Product</h2>
        <input
          type="text"
          name="imageLink"
          placeholder="Image Link"
          value={newProduct.imageLink}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newProduct.title}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Product</button>
      </form>

      {/* Edit Product Form */}
      {editProduct.id && (
        <form className="edit-form" onSubmit={handleUpdate}>
          <h2>Update Product</h2>
          <input
            type="text"
            name="imageLink"
            placeholder="Image Link"
            value={editProduct.imageLink}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={editProduct.title}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={editProduct.price}
            onChange={handleChange}
            required
          />
          <button type="submit">Update Product</button>
        </form>
      )}

      {/* Product List */}
      <h2>Product List</h2>
      <ul className="product-list">
        {products.map(product => (
          <li className="product-item" key={product._id}>
            <img src={product.imageLink} alt={product.title} />
            <strong>{product.title}</strong> - ${product.price}
            <button onClick={() => handleEditClick(product)}>Edit</button>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Owner;
