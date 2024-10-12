import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation for accessing state
import logo from "/public/logo.png"; // Ensure this path is correct

const Checkout = () => {
  const location = useLocation();
  const { items, total } = location.state || { items: [], total: 0 }; // Destructure state
  const navigate = useNavigate()

  const handleBuyNow = () => {
    const phoneNumber = "9440931198"; // Replace with the desired phone number
    const message = `Hello! I would like to purchase the following items:\n\n` +
      items.map(item => `${item.title} (Quantity: ${item.quantity})`).join('\n') +
      `\n\nTotal Price: $${total.toFixed(2)}`;
    
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank'); // Open the link in a new tab
  };

  const handleHome = () => {
    const confirmLeave = window.confirm("Going home will clear your entire cart. Do you want to proceed?");
    
    if (confirmLeave) {
        navigate("/");
    } else {
        return;
    }
}


  return (
    <div className="checkout-page">
      <div className="nav-bar-1">
        <center>
          <img src={logo} alt="Logo" className="logo" />
        </center>
        <div>
            <div className="checkout-btn" onClick={handleHome}>
            <p className="line7">Home</p>
            </div>
        </div>
      </div>
      <center>
        <p className='line3'>Your Cart</p>
      </center>
      {items.length > 0 ? (
        <div className='checkout-cards'>
          <div className="checkout-details">
            {items.map((item, index) => (
              <div key={index} className="checkout-item">
                <img src={item.imageLink} alt={item.title} className="checkout-image" />
                <div className="checkout-info">
                  <p className="checkout-item-name">{item.title}</p>
                  <p className="checkout-item-quantity">Quantity: {item.quantity}</p>
                  <p className="checkout-item-price">Price: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className='total-card'>
            <center>
              <h3 className='line6 total-price'>Sub total Price: ${total.toFixed(2)}</h3>
              <hr />
              <h3 className='line6 total-price'>Total Price: ${total.toFixed(2)}</h3>
              <button className='buy-btn line7' onClick={handleBuyNow}>Buy Now</button>
            </center>
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Checkout;
