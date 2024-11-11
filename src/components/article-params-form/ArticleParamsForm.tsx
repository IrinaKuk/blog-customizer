import { useState, useRef, FormEvent } from 'react';
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
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

interface ArticleParamsFormProps {
	onApply: (options: typeof defaultArticleState) => void;
}

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const formRef = useRef<HTMLDivElement>(null);
	const handleArrowClick = () => {
		setIsOpen((prevState) => !prevState);
	};

	const [selectedOptions, setSelectedOptions] = useState(defaultArticleState);

	const handleSelectChange = (field: string) => (option: OptionType) => {
		setSelectedOptions((prevState) => ({
			...prevState,
			[field]: option,
		}));
	};

	const handleReset = () => {
		setSelectedOptions(defaultArticleState);
		onApply(defaultArticleState);
	};

	const handleSubmit = (event: FormEvent) => {
		onApply(selectedOptions);
		event?.preventDefault();
	};

	useOutsideClickClose({
		isOpen,
		rootRef: formRef,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
	});

	return (
		<div ref={formRef}>
			<ArrowButton onClick={handleArrowClick} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text size={31} uppercase weight={800}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={selectedOptions.fontFamilyOptions}
						options={fontFamilyOptions}
						placeholder={'выбор шрифта'}
						onChange={handleSelectChange('fontFamilyOptions')}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='font-size'
						options={fontSizeOptions}
						selected={selectedOptions.fontSizeOptions}
						onChange={handleSelectChange('fontSizeOptions')}
					/>
					<Select
						title='Цвет шрифта'
						selected={selectedOptions.fontColor}
						options={fontColors}
						placeholder={'выбор цвета шрифта'}
						onChange={handleSelectChange('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={selectedOptions.backgroundColor}
						options={backgroundColors}
						placeholder={'выбор цвета фона'}
						onChange={handleSelectChange('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						selected={selectedOptions.contentWidth}
						options={contentWidthArr}
						placeholder={'выбор ширины контента'}
						onChange={handleSelectChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
