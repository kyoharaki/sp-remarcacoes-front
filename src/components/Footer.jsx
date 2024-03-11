import moment from 'moment';

function Footer() {
    return (
        <footer className="footer">
            <p>Copyright © 2024-{`${moment().format('YYYY')}`} Luan Haraki</p>
        </footer>
    );
};

export default Footer;