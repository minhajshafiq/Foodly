import React, { useEffect, useState } from "react";
import {
  fetchMenuContent,
  updateMenuContent,
} from "../../components/githubAPI/githubAPI";
import "./adminProfile.scss";
import mainBanner from "../../assets/mainBanner.jpg";

interface MenuItem {
  title: string;
  description: string;
  price: number;
}

const AdminPage: React.FC = () => {
  const [menuEntries, setMenuEntries] = useState<MenuItem[]>([]);
  const [menuPlats, setMenuPlats] = useState<MenuItem[]>([]);
  const [menuDesserts, setMenuDesserts] = useState<MenuItem[]>([]);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const content = await fetchMenuContent();
    if (content) {
      const menuData = JSON.parse(content);
      if (menuData && menuData.menu) {
        setMenuEntries(menuData.menu.Entrées);
        setMenuPlats(menuData.menu.Plats);
        setMenuDesserts(menuData.menu.Desserts);
      }
    }
  };

  const handleUpdateMenu = async () => {
    const updatedMenu = {
      menu: {
        Entrées: menuEntries,
        Plats: menuPlats,
        Desserts: menuDesserts,
      },
    };
    await updateMenuContent(JSON.stringify(updatedMenu, null, 2));
    fetchMenu();
  };

  const addMenuItem = (section: string) => {
    switch (section) {
      case "Entrées":
        setMenuEntries([
          ...menuEntries,
          { title: "", description: "", price: 0 },
        ]);
        break;
      case "Plats":
        setMenuPlats([...menuPlats, { title: "", description: "", price: 0 }]);
        break;
      case "Desserts":
        setMenuDesserts([
          ...menuDesserts,
          { title: "", description: "", price: 0 },
        ]);
        break;
      default:
        break;
    }
  };

  const removeMenuItem = (section: string, index: number) => {
    switch (section) {
      case "Entrées":
        setMenuEntries(menuEntries.filter((_, i) => i !== index));
        break;
      case "Plats":
        setMenuPlats(menuPlats.filter((_, i) => i !== index));
        break;
      case "Desserts":
        setMenuDesserts(menuDesserts.filter((_, i) => i !== index));
        break;
      default:
        break;
    }
  };

  const updateMenuItem = (
    section: string,
    index: number,
    field: string,
    value: string | number,
  ) => {
    switch (section) {
      case "Entrées":
        const updatedEntries = [...menuEntries];
        updatedEntries[index] = { ...updatedEntries[index], [field]: value };
        setMenuEntries(updatedEntries);
        break;
      case "Plats":
        const updatedPlats = [...menuPlats];
        updatedPlats[index] = { ...updatedPlats[index], [field]: value };
        setMenuPlats(updatedPlats);
        break;
      case "Desserts":
        const updatedDesserts = [...menuDesserts];
        updatedDesserts[index] = { ...updatedDesserts[index], [field]: value };
        setMenuDesserts(updatedDesserts);
        break;
      default:
        break;
    }
  };

  return (
    <main id="admin">
      <section className="admin_mainBanner">
        <img src={mainBanner} alt="Main Banner" className="img" />
      </section>
      <h1 className="admin_title">Admin Page</h1>

      <section className="entries">
        <h2 className="entries_title">Entrées</h2>
        <div className="entries_array">
          {menuEntries.map((item, index) => (
            <div key={index} className="entries_array_container">
              <div className="entries_array_title">
                <input
                  className="input"
                  type="text"
                  placeholder="Titre"
                  value={item.title}
                  onChange={(e) =>
                    updateMenuItem("Entrées", index, "title", e.target.value)
                  }
                />
                <label>Nom du plat</label>
              </div>
              <div className="entries_array_description">
                <input
                  className="input"
                  type="text"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) =>
                    updateMenuItem(
                      "Entrées",
                      index,
                      "description",
                      e.target.value,
                    )
                  }
                />
                <label>Description</label>
              </div>
              <div className="entries_array_price">
                <input
                  className="input"
                  type="number"
                  placeholder="Prix"
                  value={item.price}
                  onChange={(e) =>
                    updateMenuItem(
                      "Entrées",
                      index,
                      "price",
                      parseFloat(e.target.value),
                    )
                  }
                />
                <label>Prix</label>
              </div>
              <button
                className="button_delete"
                onClick={() => removeMenuItem("Entrées", index)}
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
        <button className="button_add" onClick={() => addMenuItem("Entrées")}>
          Ajouter Entrée
        </button>
      </section>

      <section className="dishes">
        <h2 className="dishes_title">Plats</h2>
        <div className="dishes_array">
          {menuPlats.map((item, index) => (
            <div key={index} className="dishes_array_container">
              <div className="dishes_array_title">
                <input
                  className="input"
                  type="text"
                  placeholder="Titre"
                  value={item.title}
                  onChange={(e) =>
                    updateMenuItem("Plats", index, "title", e.target.value)
                  }
                />
                <label>Nom du plat</label>
              </div>
              <div className="dishes_array_description">
                <input
                  className="input"
                  type="text"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) =>
                    updateMenuItem(
                      "Plats",
                      index,
                      "description",
                      e.target.value,
                    )
                  }
                />
                <label>Description</label>
              </div>
              <div className="dishes_array_price">
                <input
                  className="input"
                  type="number"
                  placeholder="Prix"
                  value={item.price}
                  onChange={(e) =>
                    updateMenuItem(
                      "Plats",
                      index,
                      "price",
                      parseFloat(e.target.value),
                    )
                  }
                />
                <label>Prix</label>
              </div>
              <button
                className="button_delete"
                onClick={() => removeMenuItem("Plats", index)}
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
        <button className="button_add" onClick={() => addMenuItem("Plats")}>
          Ajouter Plat
        </button>
      </section>

      <section className="desserts">
        <h2 className="desserts_title">Desserts</h2>
        <div className="desserts_array">
          {menuDesserts.map((item, index) => (
            <div key={index} className="desserts_array_container">
              <div className="desserts_array_title">
                <input
                  className="input"
                  type="text"
                  placeholder="Titre"
                  value={item.title}
                  onChange={(e) =>
                    updateMenuItem("Desserts", index, "title", e.target.value)
                  }
                />
                <label>Nom du plat</label>
              </div>
              <div className="dishes_array_description">
                <input
                  className="input"
                  type="text"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) =>
                    updateMenuItem(
                      "Desserts",
                      index,
                      "description",
                      e.target.value,
                    )
                  }
                />
                <label>Description</label>
              </div>
              <div className="dishes_array_price">
                <input
                  className="input"
                  type="number"
                  placeholder="Prix"
                  value={item.price}
                  onChange={(e) =>
                    updateMenuItem(
                      "Desserts",
                      index,
                      "price",
                      parseFloat(e.target.value),
                    )
                  }
                />
                <label>Prix</label>
              </div>
              <button
                className="button_delete"
                onClick={() => removeMenuItem("Desserts", index)}
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
        <button className="button_add" onClick={() => addMenuItem("Desserts")}>
          Ajouter Dessert
        </button>
      </section>

      <br />
      <button className="button_update" onClick={handleUpdateMenu}>
        Mettre à jour le Menu
      </button>
    </main>
  );
};

export default AdminPage;
