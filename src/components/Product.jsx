import React, {useEffect, useState} from 'react'
import clientConfig from "@/utils/client.config.js"
import Loader from "@/components/Loader.jsx";
import ProductDetails from "@/pages/ProductDetails.jsx";
import Select from 'react-select';
import { useCartStore } from "@/store/useCartStore";

const sizes = [
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" }
]

const colors = [
    { value: "Red", label: "Red" },
    { value: "Blue", label: "Blue" },
    { value: "White", label: "White" },
    { value: "Grey", label: "Grey" },
]

const Product = ({id}) => {

    const addToCart = useCartStore((state) => state.addToCart);

    const API_URL = clientConfig().API_URL;

    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = React.useState(1);
    const [productCount, setProductCount] = React.useState(1);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [cart, setCart] = useState([]);

    function fetchProduct(id) {
        setLoading(true);
        fetch(`${API_URL}/api/products/${id}`)
            .then(res => {
                return res.json()
            })
            .then(product => {
                setProduct(product)
                setTotalPrice(product.price)
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        fetchProduct(id)
    }, []);

    function increment() {
        setProductCount(prevCount => {
            const newCount = prevCount + 1;
            setTotalPrice(newCount * product.price);
            return newCount;
        });
    }

    function decrement() {
        setProductCount(prevCount => {
            if (prevCount > 1) {
                const newCount = prevCount - 1;
                setTotalPrice(newCount * product.price);
                return newCount;
            }

            return 1;
        });
    }

    function addToCart2() {
        setCart(prevCart => {
            product.size = selectedSize ? selectedSize.value : "S";
            product.color = selectedColor ? selectedColor.value : "Red";
            product.quantity = productCount;

            const newCart = [...prevCart, product];

            localStorage.setItem("cart", JSON.stringify(newCart));

            return newCart;
        });
    }

    return (
        <>
            {loading &&
                (<div className="flex justify-center mb-5">
                    <div role="status">
                        <svg aria-hidden="true"
                             className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                             viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"/>
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>)
            }

            {
                !loading &&
                (<section className="sec-product-detail bg0 p-t-65 p-b-60">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-lg-7 p-b-30">
                                <div className="p-l-25 p-r-30 p-lr-0-lg">
                                    <div className="wrap-slick3 flex-sb flex-w">
                                        <div className="wrap-slick3-dots"></div>
                                        <div className="wrap-slick3-arrows flex-sb-m flex-w"></div>

                                        <div className="slick3 gallery-lb">
                                            <div className="item-slick3" data-thumb="images/product-detail-01.jpg">
                                                <div className="wrap-pic-w pos-relative">
                                                    <img src="/frontend/images/product-detail-01.jpg" alt="IMG-PRODUCT"/>

                                                    <a className="flex-c-m size-108 how-pos1 bor0 fs-16 cl10 bg0 hov-btn3 trans-04"
                                                       href="/frontend/images/product-detail-01.jpg">
                                                        <i className="fa fa-expand"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 col-lg-5 p-b-30">
                                <div className="p-r-50 p-t-5 p-lr-0-lg">
                                    <h4 className="mtext-105 cl2 js-name-detail p-b-14">
                                        {product.name}
                                    </h4>

                                    <span className="mtext-106 cl2">
							${ totalPrice }
						</span>

                                    <p className="stext-102 cl3 p-t-23">
                                        Nulla eget sem vitae eros pharetra viverra. Nam vitae luctus ligula. Mauris
                                        consequat ornare feugiat.
                                    </p>

                                    <div className="p-t-33">
                                        <div className="flex-w flex-r-m p-b-10">
                                            <div className="size-203 flex-c-m respon6">
                                                Size
                                            </div>

                                            <div className="size-204 respon6-next">
                                                <div className="rs1-select2 bor8 bg0">
                                                    <Select
                                                        defaultValue={selectedSize}
                                                        onChange={setSelectedSize}
                                                        options={sizes}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex-w flex-r-m p-b-10">
                                            <div className="size-203 flex-c-m respon6">
                                                Color
                                            </div>

                                            <div className="size-204 respon6-next">
                                                <div className="rs1-select2 bor8 bg0">
                                                    <Select
                                                        defaultValue={selectedColor}
                                                        onChange={setSelectedColor}
                                                        options={colors}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex-w flex-r-m p-b-10">
                                            <div className="size-204 flex-w flex-m respon6-next">
                                                <div className="wrap-num-product flex-w m-r-20 m-tb-10">
                                                    <div
                                                        onClick={decrement}
                                                        className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
                                                        <i className="fs-16 zmdi zmdi-minus"></i>
                                                    </div>

                                                    <input className="mtext-104 cl3 txt-center num-product"
                                                           type="number"
                                                           name="num-product" value={productCount}/>

                                                    <div onClick={increment}
                                                        className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">
                                                        <i className="fs-16 zmdi zmdi-plus"></i>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={addToCart}
                                                    className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail">
                                                    Add to cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-w flex-m p-l-100 p-t-40 respon7">
                                        <div className="flex-m bor9 p-r-10 m-r-11">
                                            <a href="#"
                                               className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 js-addwish-detail tooltip100"
                                               data-tooltip="Add to Wishlist">
                                                <i className="zmdi zmdi-favorite"></i>
                                            </a>
                                        </div>

                                        <a href="#"
                                           className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                                           data-tooltip="Facebook">
                                            <i className="fa fa-facebook"></i>
                                        </a>

                                        <a href="#"
                                           className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                                           data-tooltip="Twitter">
                                            <i className="fa fa-twitter"></i>
                                        </a>

                                        <a href="#"
                                           className="fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100"
                                           data-tooltip="Google Plus">
                                            <i className="fa fa-google-plus"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bor10 m-t-50 p-t-43 p-b-40">
                            <div className="tab01">
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item p-b-10">
                                        <a className="nav-link active" data-toggle="tab" href="#description"
                                           role="tab">Description</a>
                                    </li>

                                    <li className="nav-item p-b-10">
                                        <a className="nav-link" data-toggle="tab" href="#information" role="tab">Additional
                                            information</a>
                                    </li>

                                    <li className="nav-item p-b-10">
                                        <a className="nav-link" data-toggle="tab" href="#reviews" role="tab">Reviews
                                            (1)</a>
                                    </li>
                                </ul>

                                <div className="tab-content p-t-43">
                                    <div className="tab-pane fade show active" id="description" role="tabpanel">
                                        <div className="how-pos2 p-lr-15-md">
                                            <p className="stext-102 cl6">
                                                Aenean sit amet gravida nisi. Nam fermentum est felis, quis feugiat nunc
                                                fringilla sit amet. Ut in blandit ipsum. Quisque luctus dui at ante
                                                aliquet,
                                                in hendrerit lectus interdum. Morbi elementum sapien rhoncus pretium
                                                maximus. Nulla lectus enim, cursus et elementum sed, sodales vitae eros.
                                                Ut
                                                ex quam, porta consequat interdum in, faucibus eu velit. Quisque rhoncus
                                                ex
                                                ac libero varius molestie. Aenean tempor sit amet orci nec iaculis. Cras
                                                sit
                                                amet nulla libero. Curabitur dignissim, nunc nec laoreet consequat,
                                                purus
                                                nunc porta lacus, vel efficitur tellus augue in ipsum. Cras in arcu sed
                                                metus rutrum iaculis. Nulla non tempor erat. Duis in egestas nunc.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade" id="information" role="tabpanel">
                                        <div className="row">
                                            <div className="col-sm-10 col-md-8 col-lg-6 m-lr-auto">
                                                <ul className="p-lr-28 p-lr-15-sm">
                                                    <li className="flex-w flex-t p-b-7">
											<span className="stext-102 cl3 size-205">
												Weight
											</span>

                                                        <span className="stext-102 cl6 size-206">
												0.79 kg
											</span>
                                                    </li>

                                                    <li className="flex-w flex-t p-b-7">
											<span className="stext-102 cl3 size-205">
												Dimensions
											</span>

                                                        <span className="stext-102 cl6 size-206">
												110 x 33 x 100 cm
											</span>
                                                    </li>

                                                    <li className="flex-w flex-t p-b-7">
											<span className="stext-102 cl3 size-205">
												Materials
											</span>

                                                        <span className="stext-102 cl6 size-206">
												60% cotton
											</span>
                                                    </li>

                                                    <li className="flex-w flex-t p-b-7">
											<span className="stext-102 cl3 size-205">
												Color
											</span>

                                                        <span className="stext-102 cl6 size-206">
												Black, Blue, Grey, Green, Red, White
											</span>
                                                    </li>

                                                    <li className="flex-w flex-t p-b-7">
											<span className="stext-102 cl3 size-205">
												Size
											</span>

                                                        <span className="stext-102 cl6 size-206">
												XL, L, M, S
											</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tab-pane fade" id="reviews" role="tabpanel">
                                        <div className="row">
                                            <div className="col-sm-10 col-md-8 col-lg-6 m-lr-auto">
                                                <div className="p-b-30 m-lr-15-sm">
                                                    <div className="flex-w flex-t p-b-68">
                                                        <div
                                                            className="wrap-pic-s size-109 bor0 of-hidden m-r-18 m-t-6">
                                                            <img src="images/avatar-01.jpg" alt="AVATAR"/>
                                                        </div>

                                                        <div className="size-207">
                                                            <div className="flex-w flex-sb-m p-b-17">
													<span className="mtext-107 cl2 p-r-20">
														Ariana Grande
													</span>

                                                                <span className="fs-18 cl11">
														<i className="zmdi zmdi-star"></i>
														<i className="zmdi zmdi-star"></i>
														<i className="zmdi zmdi-star"></i>
														<i className="zmdi zmdi-star"></i>
														<i className="zmdi zmdi-star-half"></i>
													</span>
                                                            </div>

                                                            <p className="stext-102 cl6">
                                                                Quod autem in homine praestantissimum atque optimum est,
                                                                id
                                                                deseruit. Apud ceteros autem philosophos
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <form className="w-full">
                                                        <h5 className="mtext-108 cl2 p-b-7">
                                                            Add a review
                                                        </h5>

                                                        <p className="stext-102 cl6">
                                                            Your email address will not be published. Required fields
                                                            are
                                                            marked *
                                                        </p>

                                                        <div className="flex-w flex-m p-t-50 p-b-23">
												<span className="stext-102 cl3 m-r-16">
													Your Rating
												</span>

                                                            <span className="wrap-rating fs-18 cl11 pointer">
													<i className="item-rating pointer zmdi zmdi-star-outline"></i>
													<i className="item-rating pointer zmdi zmdi-star-outline"></i>
													<i className="item-rating pointer zmdi zmdi-star-outline"></i>
													<i className="item-rating pointer zmdi zmdi-star-outline"></i>
													<i className="item-rating pointer zmdi zmdi-star-outline"></i>
													<input className="dis-none" type="number" name="rating"/>
												</span>
                                                        </div>

                                                        <div className="row p-b-25">
                                                            <div className="col-12 p-b-5">
                                                                <label className="stext-102 cl3" htmlFor="review">Your
                                                                    review</label>
                                                                <textarea
                                                                    className="size-110 bor8 stext-102 cl2 p-lr-20 p-tb-10"
                                                                    id="review" name="review"></textarea>
                                                            </div>

                                                            <div className="col-sm-6 p-b-5">
                                                                <label className="stext-102 cl3"
                                                                       htmlFor="name">Name</label>
                                                                <input className="size-111 bor8 stext-102 cl2 p-lr-20"
                                                                       id="name" type="text" name="name"/>
                                                            </div>

                                                            <div className="col-sm-6 p-b-5">
                                                                <label className="stext-102 cl3"
                                                                       htmlFor="email">Email</label>
                                                                <input className="size-111 bor8 stext-102 cl2 p-lr-20"
                                                                       id="email" type="text" name="email"/>
                                                            </div>
                                                        </div>

                                                        <button
                                                            className="flex-c-m stext-101 cl0 size-112 bg7 bor11 hov-btn3 p-lr-15 trans-04 m-b-10">
                                                            Submit
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg6 flex-c-m flex-w size-302 m-t-73 p-tb-15">
			<span className="stext-107 cl6 p-lr-25">
				SKU: JAK-01
			</span>

                        <span className="stext-107 cl6 p-lr-25">
				Categories: Jacket, Men
			</span>
                    </div>
                </section>)
            }

        </>
    );
}

export default Product;
