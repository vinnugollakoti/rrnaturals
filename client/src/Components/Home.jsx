import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import logo from "/public/logo.png";
import cart from "/public/cart-logo.png";
import defaultImage from "/public/image.png"; // Fallback image

const Home = () => {
    const [cartItems, setCartItems] = useState([]); // Store cart items as objects
    const [quantity, setQuantity] = useState(1);
    const [products, setProducts] = useState([]); // State to hold products
    const navigate = useNavigate(); // Initialize useNavigate
  
    // Fetch products from backend on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://rrnaturals.onrender.com/use/getproducts");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setProducts(data); // Set products from response
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        
        fetchProducts();
    }, []); // Empty dependency array means this runs once on mount
  
    const handleIncrement = () => {
        setQuantity((prev) => prev + 1);
    };
  
    const handleDecrement = () => {
        setQuantity((prev) => Math.max(1, prev - 1)); // Prevent quantity from going below 1
    };
  
    const handleOnChange = (event) => {
        const value = Math.max(1, Number(event.target.value)); // Prevent quantity from going below 1
        setQuantity(value);
    };
  
    const addToCart = (product) => {
        if (quantity > 0) {
            const newItem = {
                ...product,
                quantity: quantity,
            };
            setCartItems((prevItems) => [...prevItems, newItem]); // Add item to cart
            setQuantity(1); // Reset quantity to 1 after adding to cart
        }
    };
  
    const checkout = () => {
        const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        navigate("/checkout", { state: { items: cartItems, total: total } }); // Navigate to Checkout page
    };

    return (
        <div className="main-home">
            {/* nav bar */}
            <div className="nav-bar">
                <img src={logo} alt="" className="logo" />
                <div>
                    {cartItems.length > 0 && (
                        <div className="checkout-btn" onClick={checkout}>
                            <p className="line7">Checkout</p>
                            <img src={cart} alt="" className="cart-logo" />
                            <p className="line7">{cartItems.length}</p>
                        </div>
                    )}
                </div>
            </div>
            {/* home card */}
            <div className="home-card">
                <p className="line1">Hey Customer,</p>
                <p className="line2">
                    Discover our range of 100% natural and healthy products, carefully crafted to meet your daily needs. At our company, we are dedicated to providing you with the finest organic products for a healthier lifestyle.
                </p>
                <p className="line3">Organic Choices for a Healthy Tomorrow.</p>
                <p className="line4">~ G.S.V.Ramana</p>
                <p className="line5">Owner of rr naturals</p>
            </div>
            {/* products */}
            <div>
                <p className="line3-1">Our Products </p>
                <div className="product-list">
                    {products.map((product) => (
                        <div key={product._id} className="product-card">
                            <img src={product.imageLink || defaultImage} alt={product.title} className="image" /><br />
                            <p className="line6">{product.title}</p>
                            <p className="line6">${product.price.toFixed(2)}</p>
                            <div className="cart-options">
                            <div className="number-control">
                                    <div className="number-left" onClick={handleDecrement}></div>
                                    <input type="number" name="number" value={quantity} onChange={handleOnChange} className="number-quantity" />
                                    <div className="number-right" onClick={handleIncrement}></div>
                                </div>
                                <button className="cart-btn" onClick={() => addToCart(product)}>Add to cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <br /><br /><br /><br /><br /><br /><br />
        </div>
    );
};

export default Home;
