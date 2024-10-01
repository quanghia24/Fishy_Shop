import "./App.scss";

import { useEffect } from "react";
import WebFont from "webfontloader";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

import Header from "./components/header";
import Footer from "./components/footer";
import HomeScreen from "./screen/home-screen";
import ProductScreen from "./screen/product-screen";
import CartScreen from "./screen/cart-screen";
import LoginScreen from "./screen/login-screen";
import RegisterScreen from "./screen/register-screen";
import ProfileScreen from "./screen/profile-screen";
import ShippingScreen from "./screen/shipping-screen";
import PaymentScreen from "./screen/payment-screen";
import PlaceOrderScreen from "./screen/placeorder-screen";
import OrderScreen from "./screen/order-screen";
import UserListScreen from "./screen/user-list-screen";
import UserEditScreen from "./screen/user-edit-screen";
import ProductListScreen from "./screen/product-list-screen";
import ProductEditScreen from "./screen/product-edit-screen";
import OrderListScreen from "./screen/order-list-screen";

const App = () => {
	useEffect(() => {
		WebFont.load({
			google: {
				families: [
					"Rubik Bubbles",
					"Roboto",
					"Righteous",
					"Lilita One",
					"Kavoon",
					"Shantell Sans",
					"Fugaz One",
					"Niramit",
				],
			},
		});
	}, []);
	return (
		<div className="App">
			<Header />
			<main>
				<Container>
					<Routes>
						<Route path="/" element={<HomeScreen />} />
						<Route
							path="/product/:id"
							element={<ProductScreen />}
						/>
						<Route path="/cart/:id?" element={<CartScreen />} />
						<Route path="/login" element={<LoginScreen />} />
						<Route path="/register" element={<RegisterScreen />} />
						<Route path="/profile" element={<ProfileScreen />} />
						<Route path="/shipping" element={<ShippingScreen />} />
						<Route path="/payment" element={<PaymentScreen />} />
						<Route
							path="/placeholder"
							element={<PlaceOrderScreen />}
						/>
						<Route path="/order/:id" element={<OrderScreen />} />

						<Route
							path="/admin/userlist"
							element={<UserListScreen />}
						/>
						<Route
							path="/admin/user/:id/edit"
							element={<UserEditScreen />}
						/>
						<Route
							path="/admin/productlist"
							element={<ProductListScreen />}
						/>
						<Route
							path="/admin/product/:id/edit"
							element={<ProductEditScreen />}
						/>
						<Route
							path="/admin/orderlist"
							element={<OrderListScreen />}
						/>
					</Routes>
				</Container>
			</main>
			<Footer />
		</div>
	);
};

export default App;
