import React, { useCallback, useRef } from 'react';
import styles from './BlogSection.module.scss';
import { useInView } from 'react-intersection-observer';
import ShareButtons from '../../molecules/ShareButtons/ShareButtons';
import NavigationLinksListing from '../../molecules/NavigationLinksListing/NavigationLinksListing';
import BlogWidget from '../../molecules/BlogWidget/BlogWidget';
import { useTranslation } from 'next-i18next';
import Button from '../../atoms/Button/Button';
import useScrollDirection from '../../non-visual/custom-hooks/useScrollDirection';
import useViewPortSize from '../../non-visual/custom-hooks/useViewPortSize';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import parse, { domToReact } from 'html-react-parser';

const BlogSection = ({ navigation, blog, author, publishedDate, blogWidget, hasDemo }) => {
	const tabberRef = useRef(null);
	const { ref: refAnimation, inView } = useInView({
		threshold: 0,
	});
	const scrollDirection = useScrollDirection();
	const useViewPortSizes = useViewPortSize();

	const { height: tabberHeight, top: tabberTop } = tabberRef.current?.getBoundingClientRect() || {};

	const classAnimPlay = inView && styles['anim-play'];

	const { t } = useTranslation('common');
	const titleNavLeft = t('blogSection.inThisArticle');
	const titleAuthor = t('blogSection.authorTitle');
	const dateString = t('blogSection.date');
	const getDemoString = t('blogSection.getDemo');

	const getTabberTopOffset = useCallback(() => {
		const viewPortHeight = useViewPortSizes?.height;
		// 1. If Tabber fits in the viewport then stick to the top always
		if (
			!tabberHeight ||
			!viewPortHeight ||
			scrollDirection === 'scroll-up' ||
			viewPortHeight > tabberHeight + tabberTop
		)
			return 105;

		return viewPortHeight - tabberHeight;
	}, [scrollDirection, useViewPortSizes, tabberHeight, tabberTop]);

	const BlogContent = (content) => {
		if (!content) return null;
		const options = {
			replace: ({ name, children }) => {
				if (name === 'pre') {
					const codeElement = children.find((child) => child.name === 'code');
					if (codeElement) {
						const code = domToReact(codeElement.children);

						return (
							<SyntaxHighlighter language="auto" style={atomOneLight}>
								{code}
							</SyntaxHighlighter>
						);
					}
				}
			},
		};

		return <div>{parse(content, options)}</div>;
	};

	return (
		<div className={`${styles['blog-content']} ${styles.container}`} ref={refAnimation}>
			<div className={`${styles['tabber']}`} style={{ top: getTabberTopOffset() }} ref={tabberRef}>
				<div className={`${styles['anim-fade-in-up']} ${`anim-delay-2`} ${classAnimPlay}`}>
					{navigation && (
						<div className={`${styles['tabber__column']}`}>
							<span className={styles.h6}>{titleNavLeft}:</span>
							<NavigationLinksListing navigation={navigation} />
						</div>
					)}

					{blogWidget?.displayBlogWidget && (
						<div className={styles['blog-content__tabber-blog-widget-desktop']}>
							<BlogWidget {...blogWidget} />
						</div>
					)}

					<ShareButtons className={styles['blog-content__tabber-social-desktop']} />
					{author?.name && author?.position && (
						<div>
							<div className={styles['blog-content__tabber-author']}>
								<span>{titleAuthor}:</span>
								<h3>{author?.name}</h3>
								<h4>{author?.position}</h4>
							</div>
						</div>
					)}
					<div className={styles['blog-content__tabber-published-date']}>
						<span>{dateString}: </span>
						{publishedDate}
					</div>

					{hasDemo && (
						<Button
							className={styles['demo-button']}
							buttonText={getDemoString}
							buttonStyle={'PrimaryDefault'}
							action={() => {
								document.querySelector('.form-module').scrollIntoView();
							}}
						/>
					)}
				</div>
			</div>
			<div>
				<div
					className={`${styles['blog-content__blog']} ${styles['primary-bullet-style']} ${styles['wysiwyg']} ${
						styles['anim-fade-in-up']
					} ${`anim-delay-3`} ${classAnimPlay}`}
				>
					{BlogContent(blog)}
				</div>

				{blogWidget?.displayBlogWidget && (
					<div className={styles['blog-content__tabber-blog-widget-mobile']}>
						<BlogWidget {...blogWidget} />
					</div>
				)}

				<div className={styles['social-mobile']}>
					<ShareButtons className={styles['blog-content__tabber-socials-mobile']} />
				</div>
				{author?.name && author?.position && (
					<div className={styles['blog-content__tabber-author-mobile']}>
						<span>Author:</span>
						<h3>{author?.name}</h3>
						<h4>{author?.position}</h4>
					</div>
				)}
				<div className={styles['blog-content__tabber-published-date-mobile']}>
					<span>{dateString}: </span>
					{publishedDate}
				</div>
				{hasDemo && (
					<Button
						className={styles['demo-button-mobile']}
						buttonText={getDemoString}
						buttonStyle={'PrimaryDefault'}
						action={() => {
							document.querySelector('.form-module').scrollIntoView();
						}}
					/>
				)}
			</div>
		</div>
	);
};

export default BlogSection;
