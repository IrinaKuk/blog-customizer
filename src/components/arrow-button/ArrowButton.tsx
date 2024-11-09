import { useState } from 'react'; // Импортируем useState для состояния
import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

export const ArrowButton = ({ onClick }: { onClick?: OnClick }) => {
	const [isOpen, setIsOpen] = useState(false); // Состояние для отслеживания нажатия

	const handleClick = () => {
		// Переключаем состояние
		setIsOpen((prev) => !prev);

		// Если передан onClick, вызываем его
		if (onClick) {
			onClick();
		}
	};

	return (
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={`${styles.container} ${isOpen ? styles.container_open : ''}`} // Добавляем класс в зависимости от состояния
			onClick={handleClick} // При клике вызываем handleClick
		>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={`${styles.arrow} ${isOpen ? styles.arrow_open : ''}`}
			/>
		</div>
	);
};
