import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Api from 'Apis/searchapi';
import useDebounce from 'Hooks/useDebounce';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import RecentSearch from './Components/RecentSearch/recentSearch';
import SearchList from './Components/SearchList/searchList';
import SearchResult from './Components/SearchResult/searchResult';
import Logo from 'Assets/img/logo.svg';

let arr = JSON.parse(localStorage.getItem('data'));

const HomePage = () => {
	const [content, setContent] = useState();
	const [result, setResult] = useState();
	const [correct, setCorrect] = useState();
	const [recentKeyword, setRecentKeyword] = useState();
	const [focusIdx, setFocusIdx] = useState(-1);

	const debounceValue = useDebounce(content);

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
			if (arr.find(item => item === content)) {
				const RepeatIndex = arr?.findIndex(item => item === content);
				arr.splice(RepeatIndex, 1);
				arr.unshift(content);
				localStorage.setItem('data', JSON.stringify(arr));
				setRecentKeyword(arr);
			} else {
				const focusWord = result[focusIdx];
				setCorrect(focusWord);
				arr.unshift(focusWord);

				if (arr.length > 5) arr.pop();

				localStorage.setItem('data', JSON.stringify(arr));
				setRecentKeyword(arr);
			}
		}

		if (e.key === 'Escape') {
			setFocusIdx(-1);
		}
	};

	const onClickSearchBtn = async () => {
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
		} else {
			arr.splice(RepeatIndex, 1);
			arr.unshift(content);
			localStorage.setItem('data', JSON.stringify(arr));
			setRecentKeyword(arr);
		}
	};

	const onClickXmark = () => {
		setContent('');
		setFocusIdx(-1);
	};

	useEffect(() => {
		// content가 있는데 조건을 만족시켜서 setResult([])을 하길래
		// result배열을 복사해서 다시 넣어줌
		// !!! 해결해서 다시지움
		if (!content) return setResult([]);

		if (focusIdx > -1) return;
		fetchContent(debounceValue);
	}, [debounceValue]);

	/* 

	1. 마운트시 무조건 한번 실행
		// - 마운트시 꼭 실행해야하는 경우인가? 아니라면 early return
	2. 의존성배열이 변화되면 실행

	 */

	useEffect(() => {
		if (localStorage.data === undefined)
			return localStorage.setItem('data', JSON.stringify([]));
		setRecentKeyword(JSON.parse(localStorage.getItem('data')));
	}, []);

	useEffect(() => {
		if (focusIdx === -1) return;
		setContent(result[focusIdx]);
	}, [focusIdx]);

	return (
		<S.Wrapper>
			<img src={Logo} />
			<RecentSearch recentKeyword={recentKeyword} />
			<S.SearchWrapper>
				<S.Input
					onChange={onChangeContent}
					onKeyDown={onKeyPressArrow}
					value={content}
				/>
				<div>
					<FontAwesomeIcon icon={faCircleXmark} onClick={onClickXmark} />
					<FontAwesomeIcon
						icon={faMagnifyingGlass}
						onClick={onClickSearchBtn}
					/>
				</div>
			</S.SearchWrapper>
			{content && (
				<S.ResultWrapper>
					<SearchList result={result} focusIdx={focusIdx} content={content} />
					<SearchResult correct={correct} />
				</S.ResultWrapper>
			)}
		</S.Wrapper>
	);
};

export default HomePage;

const Wrapper = styled.div`
	width: 600px;
	margin: 150px auto;
`;

const SearchWrapper = styled.div`
	width: 100%;
	height: 50px;
	position: relative;
	border: none;
	& > div {
		position: absolute;
		right: 10px;
		& > *:first-child {
			margin: 0 10px;
		}
	}
	display: flex;
	align-items: center;
	justify-content: center;
	outline: none;
`;

const Input = styled.input`
	font-size: 1.3rem;
	padding-left: 10px;
	padding-right: 60px;
	background-color: #eaeaea;
	width: 100%;
	height: 100%;
	border: none;
	border-radius: 20px;
	outline: none;
`;

const ResultWrapper = styled.div`
	background-color: #fff;
	padding: 10px;
	border: 2px solid;
	border-radius: 20px;
`;

const S = {
	Wrapper,
	SearchWrapper,
	Input,
	ResultWrapper,
};
