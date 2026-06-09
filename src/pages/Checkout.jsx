import { Link } from "react-router-dom";

const Checkout = () => {
    return (
        <div className="container" style={{ marginTop: "100px", marginBottom: "100px", textAlign: "center" }}>
            <div class="alert alert-success" role="alert">
                <h4 class="alert-heading">Thank you for your purchase!</h4>
                <p>Your order has been successfully processed. We appreciate your business and hope you enjoy your new items!</p>
                <hr />
                <p class="mb-0">If you have any questions about your order, please contact our support team.</p>
            </div>
            <p>
                Link to <Link to="/shop" className="text-blue-500 hover:underline">continue shopping</Link>.
            </p>
        </div>
    );
}

export default Checkout;