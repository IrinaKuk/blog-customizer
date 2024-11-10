import { CSSProperties, useState } from 'react';
import { Article } from '../article';
import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';
import { defaultArticleState } from 'src/constants/articleProps';
import { ArticleParamsForm } from '../article-params-form';

export const App = () => {
	const defaultStiles: CSSProperties = {
		'--font-family': defaultArticleState.fontFamilyOptions.value,
		'--font-size': defaultArticleState.fontSizeOptions.value,
		'--font-color': defaultArticleState.fontColor.value,
		'--container-width': defaultArticleState.contentWidth.value,
		'--bg-color': defaultArticleState.backgroundColor.value,
	} as CSSProperties;

	const [dynamicStyles, setDynamicStyles] = useState(defaultStiles);

	const handleApplyStyles = (selectedOptions: typeof defaultArticleState) => {
		setDynamicStyles({
			'--font-family': selectedOptions.fontFamilyOptions.value,
			'--font-size': selectedOptions.fontSizeOptions.value,
			'--font-color': selectedOptions.fontColor.value,
			'--container-width': selectedOptions.contentWidth.value,
			'--bg-color': selectedOptions.backgroundColor.value,
		} as CSSProperties);
	};

	return (
		<div className={styles.main} style={dynamicStyles}>
			<ArticleParamsForm onApply={handleApplyStyles} />
			<Article />
		</div>
	);
};
