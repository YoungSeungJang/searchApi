import Api from 'Apis/searchapi';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import RecentSearch from './Components/RecentSearch/recentSearch';
import SearchList from './Components/SearchList/searchList';
import SearchResult from './Components/SearchResult/searchResult';

let arr = JSON.parse(localStorage.getItem('data'));

const HomePage = () => {
	const [content, setContent] = useState();
	const [result, setResult] = useState();
	const [correct, setCorrect] = useState();
	const [recentKeyword, setRecentKeyword] = useState();

	const [focusIdx, setFocusIdx] = useState(-1);

	const fetchContent = async content => {
		const res = await Api.SearchApi(content);
		setResult(res.data);
	};

	const onChangeContent = e => {
		setContent(e.target.value);
	};

	const onKeyPressArrow = e => {
		if (!content) return;
		if (!result) return;

		if (e.key === 'ArrowDown') {
			setFocusIdx(prev => (prev + 1) % result.length);
		}

		if (e.key === 'ArrowUp') {
			focusIdx === -1
				? setFocusIdx(result.length - 1)
				: setFocusIdx(prev => (prev - 1 + result.length) % result.length);
		}

		if (e.key === 'Enter') {
			if (!content || focusIdx === -1) return;

			const focusWord = result[focusIdx];
			setCorrect(focusWord);
			arr.unshift(focusWord);

			if (arr.length > 5) arr.pop();

			localStorage.setItem('data', JSON.stringify(arr));
			setRecentKeyword(arr);
		}
		if (e.key === 'Escape') {
			setFocusIdx(-1);
		}
	};

	const onClickSearchBtn = async () => {
		if (!content) return;

		try {
			const res = await Api.SearchApi(content);
			const findWord = res.data.find(item => item === content);
			if (findWord) {
				setCorrect(findWord);
			} else {
				setCorrect('일치하는 결과가 없습니다');
			}
		} catch (err) {
			setCorrect(err.response.data);
		}

		const RepeatIndex = arr?.findIndex(item => item === content);
		if (RepeatIndex === -1) {
			arr.unshift(content);
			if (arr.length > 5) arr.pop();
			localStorage.setItem('data', JSON.stringify(arr));
			setRecentKeyword(arr);
			console.log(arr);
		} else {
			arr.splice(RepeatIndex, 1);
			arr.unshift(content);
			localStorage.setItem('data', JSON.stringify(arr));
			setRecentKeyword(arr);
		}
	};

	// useEffect(() => {
	// 	// content가 있는데 조건을 만족시켜서 setResult([])을 하길래
	// 	// result배열을 복사해서 다시 넣어줌
	// 	if (!content) return setResult([]);
	// 	if (focusIdx > -1) return;
	// 	fetchContent(content);
	// }, [content]);
	/* 

	1. 마운트시 무조건 한번 실행
		// - 마운트시 꼭 실행해야하는 경우인가? 아니라면 early return
	2. 의존성배열이 변화되면 실행

	 */

	useEffect(() => {
		if (localStorage.data === undefined)
			return localStorage.setItem('data', JSON.stringify([]));
		setRecentKeyword(JSON.parse(localStorage.getItem('data')));
		// console.log('이펙트')
	}, []);

	useEffect(() => {
		if (focusIdx === -1) return;
		setContent(result[focusIdx]);
	}, [focusIdx]);

	return (
		<div>
			<S.Wrapper>
				<S.Input
					onChange={onChangeContent}
					onKeyDown={onKeyPressArrow}
					value={content}
				/>
				<button>X</button>
				<button onClick={onClickSearchBtn}>검색</button>
			</S.Wrapper>
			<RecentSearch recentKeyword={recentKeyword} />
			<SearchList result={result} focusIdx={focusIdx} />
			<SearchResult correct={correct} />
		</div>
	);
};

export default HomePage;

const Wrapper = styled.div`
	border: 1px solid red;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Input = styled.input`
	font-size: 2rem;
	margin: 25px;
`;

const S = {
	Wrapper,
	Input,
};
