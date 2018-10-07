import React from 'react';

import Facebook from '@quanta/assets/images/facebook.png';
import Twitter from '@quanta/assets/images/twitter.png';
import Instagram from '@quanta/assets/images/instagram.png';
import Telegram from '@quanta/assets/images/telegram.png';
import classes from './Footer.scss';

const Footer = () => (
	<div className={classes.footer}>
		<div className={classes.socialLinks}>
			<img className={classes.item} src={Telegram} alt="telegram" />
			<img className={classes.item} src={Facebook} alt="facebook" />
			<img className={classes.item} src={Twitter} alt="twitter" />
			<img className={classes.item} src={Instagram} alt="instagram" />
			<img className={classes.item} src={Instagram} alt="instagram" />
		</div>
		<div className={classes.description}>
			QUANTA Foundation is non-profit organization from Singapore with offices in Santa Clara,
			CA
		</div>
	</div>
);

export default Footer;
