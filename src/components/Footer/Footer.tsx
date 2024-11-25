import './Footer.css';

function Footer () {

    return (
        <footer className="footer">
            <section className='sectionLink'>
                <div className='articlelink'>
                    <h3>Mentions légales</h3>
                    <ul className='listLink'>
                        <li>Condition générales d'utilisation</li>
                        <li>Politique de confidentialité</li>
                    </ul>
                </div>
                <div className='articlelink'>
                    <h3>Nous connaitre</h3>
                    <ul className='listLink'>
                        <li>À propos de Pet Foster Connect</li>
                    </ul>
                </div>
                <div className='articlelink'>
                    <h3>Lien du site</h3>
                    <ul className='listLink'>
                        <li>Accuei</li>
                        <li>Liste des animaux</li>
                        <li>Contact</li>
                    </ul>
                </div>
            </section>
            <p className="copyrights">
                © 2024 Pet Foster Connect. Tous droits réservés.
            </p>
        </footer>
    );
}

export default Footer;