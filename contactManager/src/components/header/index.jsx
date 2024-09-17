import styles from './header.module.css'
export function Header() {
    return (
      <header>
        <div className={styles.Sidebar}>
          <ul className={styles["sidebar-menu"]}>
            <li className={styles["menu-item"]}>
              <a href="#">Adicionar Contatos</a>
            </li>
            <li className={styles["menu-item"]}>
              <a href="#">Ver Lista</a>
            </li>
            <li className={styles["menu-item"]}>
              <a href="#">Editar Contatos</a>
            </li>
            <li className={styles["menu-item"]}>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
      </header>
    );
}