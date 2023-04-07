// import { IJsonModel, Layout, Model, TabNode } from 'flexlayout-react';
import { useState, useEffect } from 'react';
import Card from '../card/Card';
import initialCards from './data';
import { Platform, Analytic } from '../../types';
import './CardLayout.css';

export type CardLayoutProps = {
	platformFilter?: Platform;
	typeFilters?: Analytic[];
};

const CardLayout = ({ platformFilter, typeFilters }: CardLayoutProps) => {
	const [filteredCards, setFilteredCards] = useState(initialCards);

	const filterCards = () => {
		const filteredCards = initialCards.filter((card) => {
			let ret = true;
			if (platformFilter && card.platform) {
				if (['all', 'home'].includes(platformFilter)) {
					ret = ret && true;
				} else {
					ret = ret && platformFilter.includes(card.platform);
				}
			}
			if (typeFilters && card.type) {
				if (typeFilters.includes('all')) {
					ret = ret && true;
				} else {
					ret = ret && typeFilters.includes(card.type);
				}
			}
			return ret;
		});
		setFilteredCards(filteredCards);
	};

	useEffect(() => {
		filterCards();
	}, [platformFilter, typeFilters]);

	return (
		<div className="cardGrid">
			{filteredCards.map((card) => (
				<div key={card.id}>
					<Card {...card} />
				</div>
			))}
		</div>
	);
};

export default CardLayout;