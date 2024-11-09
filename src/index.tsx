import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [dynamicStyles, setDynamicStyles] = useState<CSSProperties>({
		'--font-family': defaultArticleState.fontFamily.value,
		'--font-size': defaultArticleState.fontSize.value,
		'--font-color': defaultArticleState.fontColor.value,
		'--container-width': defaultArticleState.contentWidth.value,
		'--bg-color': defaultArticleState.backgroundColor.value,
	} as CSSProperties);

	const handleApplyStyles = (selectedOptions: typeof defaultArticleState) => {
		setDynamicStyles({
			'--font-family': selectedOptions.fontFamily.value,
			'--font-size': selectedOptions.fontSize.value,
			'--font-color': selectedOptions.fontColor.value,
			'--container-width': selectedOptions.contentWidth.value,
			'--bg-color': selectedOptions.backgroundColor.value,
		} as CSSProperties);
	};

	return (
		<div className={clsx(styles.main)} style={dynamicStyles}>
			<ArticleParamsForm onApply={handleApplyStyles} />
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
