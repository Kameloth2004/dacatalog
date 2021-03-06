import './styles.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="admin-nav-container">
      <ul>
        <li>
          <NavLink to="/admin/products" className='admin-nav-item'>
            <p>Produto</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/categories"className='admin-nav-item'>
            <p>Categorias</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users"className='admin-nav-item'>
            <p>Usuários</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
