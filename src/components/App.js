
import React from "react";
import { BrowserRouter, Link, Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import './../styles/App.css';

const categories = {
  women: [
    { id: "dresses", name: "Dresses" },
    { id: "tops", name: "Tops" },
    { id: "jeans", name: "Jeans" },
    { id: "shoes", name: "Shoes" },
  ],
  men: [
    { id: "shirts", name: "Shirts" },
    { id: "trousers", name: "Trousers" },
    { id: "jackets", name: "Jackets" },
  ],
};

const CategoryPage = () => {
  const { category } = useParams();
  const { path, url } = useRouteMatch();
  const items = categories[category];

  if (!items) {
    return <p>Category not found.</p>;
  }

  return (
    <section>
      <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link to={`${url}/${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
      <Switch>
        <Route exact path={path}>
          <p>Select an item to see its details.</p>
        </Route>
        <Route path={`${path}/:itemId`}>
          <ItemDetails items={items} />
        </Route>
      </Switch>
    </section>
  );
};

const ItemDetails = ({ items }) => {
  const { itemId } = useParams();
  const item = items.find((entry) => entry.id === itemId);

  return item ? <h2>{item.name}</h2> : <p>Item not found.</p>;
};

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <header>
          <h1>Shop by category</h1>
          <nav aria-label="Categories">
            {Object.keys(categories).map((category) => (
              <Link key={category} to={`/${category}`}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Link>
            ))}
          </nav>
        </header>
        <main>
          <Switch>
            <Route exact path="/">
              <p>Select a category to browse its items.</p>
            </Route>
            <Route path="/:category">
              <CategoryPage />
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
