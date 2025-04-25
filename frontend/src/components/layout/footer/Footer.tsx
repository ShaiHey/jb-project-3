import './Footer.css';

function Footer(): JSX.Element {
    const currentYear = new Date().getFullYear();

    return (
        <footer className='Footer'>
            <div className='FooterCopyright'>
                <p>&copy; {currentYear} EasyVacay. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;