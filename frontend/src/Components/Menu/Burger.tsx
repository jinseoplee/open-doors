import React, { useState } from 'react';
import { StyledBurger, Menus } from '../../styles/Menu/styles';
import RightNav from './RightNav';

const Burger = () => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<StyledBurger open={open} onClick={() => setOpen(!open)}>
				<Menus open={open} />
				<Menus open={open} />
				<Menus open={open} />
			</StyledBurger>
			<RightNav open={open} />
		</>
	);
};
export default Burger;
