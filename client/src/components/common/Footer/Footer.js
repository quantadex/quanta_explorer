import React from 'react';

import Facebook from '@quanta/assets/images/facebook.svg';
import Twitter from '@quanta/assets/images/twitter.svg';
import LinkedIn from '@quanta/assets/images/linkedin.svg';
import Telegram from '@quanta/assets/images/telegram.svg';
import Medium from '@quanta/assets/images/medium.svg';
import classes from './Footer.scss';

const Footer = () => (
	<div className={classes.footer}>
		<div className={classes.socialLinks}>
			<a
				className={classes.item}
				href="https://t.me/quantaexchange"
				target="_blank"
				rel="noopener noreferrer"
			>
				<img src={Telegram} alt="telegram" />
			</a>
			<a
				className={classes.item}
				href="https://www.facebook.com/quantadexchange"
				target="_blank"
				rel="noopener noreferrer"
			>
				<img src={Facebook} alt="facebook" />
			</a>
			<a
				className={classes.item}
				href="https://twitter.com/QuantaDex"
				target="_blank"
				rel="noopener noreferrer"
			>
				<img src={Twitter} alt="twitter" />
			</a>
			<a
				className={classes.item}
				href="https://www.linkedin.com/company/quantadex/"
				target="_blank"
				rel="noopener noreferrer"
			>
				<img src={LinkedIn} alt="instagram" />
			</a>
			<a
				className={classes.item}
				href="https://medium.com/@quantadex"
				target="_blank"
				rel="noopener noreferrer"
			>
				<img src={Medium} alt="medium" />
			</a>
		</div>
		<div className={classes.description}>
			QUANTA Foundation is non-profit organization from Singapore with offices in Santa Clara,
			CA
		</div>
	</div>
);

export default Footer;
