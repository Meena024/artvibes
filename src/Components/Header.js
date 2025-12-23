import head_classes from "../UI/CSS/Header.module.css";
import logo from "../Assets/Logo.png";

const Header = () => {
  return (
    <header className={head_classes.header}>
      <div className={head_classes.logoContainer}>
        <img
          src={logo}
          alt=""
          aria-hidden="true"
          className={head_classes.logo}
        />
        <h1 className={head_classes.title}>ArtVibe</h1>
      </div>

      <p className={head_classes.tagline}>Your space. Your vibe. Our art.</p>
    </header>
  );
};

export default Header;
