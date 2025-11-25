import '../styles/FooterStyles.css';

function Footer() {
    return (
        <footer className="app-footer">
            <p>© {new Date().getFullYear()} PrimeTrade AI. All rights reserved.</p>
        </footer>
    );
}

export default Footer;