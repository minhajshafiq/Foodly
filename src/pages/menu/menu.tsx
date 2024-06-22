import React, { useState, useEffect } from "react";
import ModalComponent from "../../components/modal/modal";
import "./menu.scss";
import heroBanner from "../../assets/heroBanner.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../components/auth/authContext";
import {
  fetchMenuContent,
  updateMenuContent,
} from "../../components/githubAPI/githubAPI";

type MenuCategory = {
  title: string;
  description: string;
  price: number;
};

type MenuData = {
  entrees: MenuCategory[];
  plats: MenuCategory[];
  desserts: MenuCategory[];
};

const Menu: React.FC = () => {
  const { isAuthenticated, currentUserId } = useAuth();
  const [menuData, setMenuData] = useState<MenuData>({
    entrees: [],
    plats: [],
    desserts: [],
  });
  const [cart, setCart] = useState<
    { title: string; price: number; quantity: number }[]
  >(() => {
    const storedCart = localStorage.getItem(`cart_${currentUserId}`);
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const menuContent = await fetchMenuContent();
        if (menuContent) {
          const parsedContent = JSON.parse(menuContent) as { menu: MenuData };
          setMenuData(parsedContent.menu);
        }
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchMenuData();
  }, []);

  const addToCart = (item: { title: string; price: number }) => {
    const existingIndex = cart.findIndex(
      (cartItem) => cartItem.title === item.title,
    );
    if (existingIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity++;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (index: number) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity === 1) {
      updatedCart.splice(index, 1);
    } else {
      updatedCart[index].quantity--;
    }
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const confirmOrder = () => {
    setCart([]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (currentUserId && isAuthenticated) {
      localStorage.setItem(`cart_${currentUserId}`, JSON.stringify(cart));
    }
  }, [cart, currentUserId, isAuthenticated]);

  return (
    <main className="menu">
      <img src={heroBanner} alt="" className="menu_logo" />
      <section className="menu_container">
        <h1 className="menu_header">Foodly Menu</h1>
        <div className="submenus">
          {Object.keys(menuData).map((category) => (
            <section className="submenu" key={category}>
              <h3 className="submenu__title">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h3>
              {menuData[category as keyof MenuData].map((item, index) => (
                <div
                  className="submenuItem appears"
                  id={`case-${index + 1}`}
                  key={index}
                >
                  <div className="submenuItem__container">
                    <h4 className="submenuItem__title">{item.title}</h4>
                    <p className="submenuItem__description">
                      {item.description}
                    </p>
                  </div>
                  <div className="submenuItem__price">{item.price}€</div>
                  {isAuthenticated && (
                    <div
                      className="submenuItem__confirmation"
                      onClick={() =>
                        addToCart({ title: item.title, price: item.price })
                      }
                    >
                      <div className="submenuItem__Slideicon">
                        <i className="submenuItem__icon">
                          <FontAwesomeIcon icon={faShoppingCart} />
                        </i>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </section>
          ))}
        </div>
        {isAuthenticated ? (
          <section className="cart">
            <h2 className="cart_title">Panier</h2>
            <ul className="cart_container">
              {cart.map((item, index) => (
                <li className="cart_titleItem" key={index}>
                  <div className="cart_itemTitle">{item.title}</div>
                  <div className="cart_quantity">
                    <div className="cart_ItemPrice">{item.price}€</div>
                    <button
                      className="quantity_button"
                      onClick={() => removeFromCart(index)}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <div className="cart_quantity_number">{item.quantity}</div>
                    <button
                      className="quantity_button"
                      onClick={() => addToCart(item)}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="cart_total">
              Total de votre panier: {calculateTotal()}€
            </div>
            {cart.length > 0 && (
              <>
                <button className="cart_button" onClick={confirmOrder}>
                  Confirmer le panier
                </button>
              </>
            )}
          </section>
        ) : (
          <div>
            <p className="cart_noAuthText">
              Connectez-vous pour passer commande.
            </p>
          </div>
        )}
        <ModalComponent
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Order Confirmation Modal"
        >
          <h2>Commande Confirmée</h2>
          <p>Votre commande a été confirmée !</p>
        </ModalComponent>
      </section>
    </main>
  );
};

export default Menu;
