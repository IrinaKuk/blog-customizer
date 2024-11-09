import { useState } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { Separator } from '../separator';
import { Text } from '../text';
import { Select } from '../select';
import type { OptionType } from 'src/constants/articleProps';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';

interface ArticleParamsFormProps {
	onApply: (options: typeof defaultArticleState) => void;
}

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleArrowClick = () => {
		setIsOpen((prevState) => !prevState);
	};

	const initialOptions = {
		fontFamily: defaultArticleState.fontFamily,
		fontColor: defaultArticleState.fontColor,
		backgroundColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth,
		fontSize: defaultArticleState.fontSize,
	};

	const [selectedOptions, setSelectedOptions] = useState(initialOptions);

	const handleSelectChange = (field: string) => (option: OptionType) => {
		setSelectedOptions((prevState) => ({
			...prevState,
			[field]: option,
		}));
	};

	const handleReset = () => {
		setSelectedOptions(initialOptions);
		onApply(initialOptions);
	};

	const handleSubmit = () => {
		onApply(selectedOptions);
	};

	return (
		<>
			<ArrowButton onClick={handleArrowClick} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form}>
					<Text size={31} uppercase weight={800}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={selectedOptions.fontFamily}
						options={fontFamilyOptions}
						placeholder={defaultArticleState.fontFamily.value}
						onChange={handleSelectChange('fontFamily')}
					/>
					<Select
						title='Цвет шрифта'
						selected={selectedOptions.fontColor}
						options={fontColors}
						placeholder={defaultArticleState.fontColor.value}
						onChange={handleSelectChange('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={selectedOptions.backgroundColor}
						options={backgroundColors}
						placeholder={defaultArticleState.backgroundColor.value}
						onChange={handleSelectChange('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						selected={selectedOptions.contentWidth}
						options={contentWidthArr}
						placeholder={defaultArticleState.contentWidth.value}
						onChange={handleSelectChange('contentWidth')}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='font-size'
						options={fontSizeOptions}
						selected={selectedOptions.fontSize}
						onChange={handleSelectChange('fontSize')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						<Button title='Применить' type='button' onClick={handleSubmit} />
					</div>
				</form>
			</aside>
		</>
	);
};
