import './styles.css';

const Navbar = () => {
  return (
    <nav className="admin-nav-container">
      <ul>
        <li>
          <a href="link" className='admin-nav-item active'>
            <p>Produto</p>
          </a>
        </li>
        <li>
          <a href="link"className='admin-nav-item'>
            <p>Categorias</p>
          </a>
        </li>
        <li>
          <a href="link"className='admin-nav-item'>
            <p>Usuários</p>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;